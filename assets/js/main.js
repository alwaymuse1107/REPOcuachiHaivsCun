(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("langToggle");
    const labelVN = document.getElementById("label-vn");
    const labelEN = document.getElementById("label-en");

    // Set trạng thái toggle và nhãn ngôn ngữ theo URL khi tải trang
    if (window.location.href.includes("index-vn")) {
      toggle.checked = true;
      labelVN.classList.remove("inactive");
      labelEN.classList.add("inactive");
    } else {
      toggle.checked = false;
      labelEN.classList.remove("inactive");
      labelVN.classList.add("inactive");
    }

    // Cập nhật khi toggle thay đổi
    toggle.onchange = function () {
      const isVN = toggle.checked;

      // Sử dụng class để thay đổi nhãn mà không gây hiện cả hai
      if (isVN) {
        labelVN.classList.remove("inactive");
        labelEN.classList.add("inactive");
      } else {
        labelEN.classList.remove("inactive");
        labelVN.classList.add("inactive");
      }

      // Chuyển hướng trang sau một thời gian delay để tránh nhảy quá nhanh
      setTimeout(() => {
        if (isVN) {
          window.location.href = "index-vn.html"; // Chuyển sang trang tiếng Việt
        } else {
          window.location.href = "index-en.html"; // Chuyển sang trang tiếng Anh
        }
      }, 300); // Điều chỉnh thời gian delay nếu cần
    };
  });

  // Đảm bảo DOM đã load
  document.addEventListener("DOMContentLoaded", () => {
    const texts = gsap.utils.toArray(".value-text");
    const images = gsap.utils.toArray(".value-image");

    // Đặt mặc định ban đầu: ẩn và dịch sang trái
    gsap.set([...texts, ...images], {
      opacity: 0,
      x: -100,
      position: "absolute",
    });

    const tl = gsap.timeline({ repeat: -1 });

    texts.forEach((text, i) => {
      const image = images[i];
      tl.to([text, image], {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        [text, image],
        {
          opacity: 0,
          x: 100,
          duration: 0.8,
          ease: "power2.in",
        },
        "+=1.5"
      );
    });
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // ====== DANH SÁCH CÁC BẢN ĐỒ CẦN KHỞI TẠO ======
  const mapConfigs = [
    {
      id: "map-vn", // ID thẻ div HCM
      toggleId: "themeToggle", // ID toggle switch HCM
      coords: [10.731364, 106.724216],
      zoom: 20.25,
      popupText: "HCMC Office",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=10.731364,106.724216",
    },
    {
      id: "map-hn", // Nếu có bản đồ HN
      toggleId: "themeToggleHn",
      coords: [43.73057887069977, -79.28014110835474],
      zoom: 18,
      popupText: "SCARBOROUGH Office",
      mapLink: "https://maps.app.goo.gl/jGd5W396iJZsMpHo9",
    },
    // Thêm maps khác ở đây nếu muốn
  ];

  // ====== KHỞI TẠO TỪNG BẢN ĐỒ ======
  mapConfigs.forEach((config) => {
    const mapElement = document.getElementById(config.id);
    if (!mapElement) return;

    const map = L.map(config.id).setView(config.coords, config.zoom);

    const lightTile = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    const customIcon = L.divIcon({
      className: "custom-div-icon",
      html: '<i class="fa-solid fa-location-dot" style="font-size: 40px; color: #cc4448;"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

    // Thêm marker
    L.marker(config.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`<b>${config.popupText}</b>`)
      .on("click", () => window.open(config.mapLink, "_blank"));

    // Gắn toggle nếu có
    const toggle = document.getElementById(config.toggleId);
    if (toggle) {
      toggle.addEventListener("change", function () {
        if (this.checked) {
          map.removeLayer(lightTile);
          darkTile.addTo(map);
        } else {
          map.removeLayer(darkTile);
          lightTile.addTo(map);
        }
      });
    }
  });

  // ====== CUSTOM CURSOR ======
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  let lastX = 0,
    lastY = 0;
  document.addEventListener("mousemove", (e) => {
    lastX = e.pageX;
    lastY = e.pageY;
    requestAnimationFrame(() => {
      cursor.style.left = `${lastX}px`;
      cursor.style.top = `${lastY}px`;
    });
  });

  // ====== LOGO SLIDER (TỰ NHÂN ĐÔI) ======
  const track = document.getElementById("logoTrack");
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  // ====== SCROLL ĐẾN PHẦN LIÊN HỆ ======
  const scrollBtn = document.getElementById("scroll-down");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ====== HÀM SCROLL SERVICE ======
  window.scrollToService = function (id, el) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    const tabs = document.querySelectorAll(".services-nav .tab");
    tabs.forEach((tab) => tab.classList.remove("active"));
    el.classList.add("active");
  };

  // ====== ACCORDION SERVICE CARD ======
  window.toggleCard = function (btn) {
    const cardBody = btn.closest(".service-card").querySelector(".card-body");
    const icon = btn.querySelector("i");
    cardBody.classList.toggle("active");
    icon.classList.toggle("bi-chevron-down");
    icon.classList.toggle("bi-chevron-up");
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".analysis-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
});

var valuesSwiper = new Swiper("#values-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: "#values-next",
    prevEl: "#values-prev",
  },
  pagination: {
    el: "#values-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true, // Enable looping
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const contactBtn = document.querySelector(".btn-contact");
contactBtn.addEventListener("mouseleave", () => {
  contactBtn.classList.remove("hovering");
  void contactBtn.offsetWidth;
  contactBtn.classList.add("hovering");
});

const dropdown = document.getElementById("langDropdown");
const btn = document.getElementById("langBtn");
const radios = dropdown.querySelectorAll('input[type="radio"]');

radios.forEach((r) => {
  r.addEventListener("change", () => {
    const code = r.value.toUpperCase();
    // ✅ Dùng textContent, KHÔNG nối thêm HTML
    btn.innerHTML = `<i class="bi bi-globe"></i> ${code}`;
  });
});


const nodes = document.querySelectorAll(".node");
const center = document.getElementById("centerContent");
const orbit = document.querySelector(".orbit-container");

// ======= Position nodes on ellipse =======
const cx = orbit.offsetWidth / 2;
const cy = orbit.offsetHeight / 2;
const rx = 320;
const ry = 250;
const tilt = 15 * Math.PI / 180;
const total = nodes.length;

nodes.forEach((node, i) => {
  const angle = (i / total) * 2 * Math.PI;
  const x = cx + rx * Math.cos(angle) * Math.cos(tilt) - ry * Math.sin(angle) * Math.sin(tilt);
  const y = cy + rx * Math.cos(angle) * Math.sin(tilt) + ry * Math.sin(angle) * Math.cos(tilt);

  node.style.left = `${x - node.offsetWidth / 2}px`;
  node.style.top = `${y - node.offsetHeight / 2}px`;
});

// ======= Values data =======
const values = Array.from(nodes).map(node => ({
  title: node.dataset.title,
  desc: node.dataset.desc
}));

// ======= Center slideshow =======
let centerIndex = 0;
let centerSlideInterval = null;
let restartTimeout = null;
let hoverDelay = 2000; // thời gian pause khi hover

// ==== CẬP NHẬT CENTER ====
function updateCenter(index) {
  const { title, desc } = values[index];

  center.style.opacity = 0;
  setTimeout(() => {
    center.innerHTML = `<h4>${title}</h4><p>${desc}</p>`;
    center.style.opacity = 1;
  }, 200);
}

// ==== BẮT ĐẦU SLIDESHOW ====
function startCenterSlideshow() {
  // ⭐ LUÔN clear interval cũ trước khi tạo cái mới
  clearInterval(centerSlideInterval);

  centerSlideInterval = setInterval(() => {
    centerIndex = (centerIndex + 1) % values.length;
    updateCenter(centerIndex);
  }, 3500);
}

// ==== DỪNG SLIDESHOW ====
function stopCenterSlideshow() {
  clearInterval(centerSlideInterval);
  centerSlideInterval = null;
}

// ==== HOVER NODE ====
nodes.forEach((node, index) => {
  node.addEventListener("mouseenter", () => {

    stopCenterSlideshow();
    updateCenter(index);
    centerIndex = index;

    // ⭐ Clear timeout restart cũ để không bị queue nhiều cái
    if (restartTimeout) clearTimeout(restartTimeout);

    restartTimeout = setTimeout(() => {
      startCenterSlideshow();
      restartTimeout = null;
    }, hoverDelay);
  });
});

// ==== CLICK NODE ====
nodes.forEach((node, index) => {
  node.addEventListener("click", () => {
    updateCenter(index);
    centerIndex = index;
  });
});

// ==== DEFAULT ====
center.innerHTML = `<h4>OUR VALUES</h4>`;
setTimeout(startCenterSlideshow, 500);




document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".circle-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Xóa trạng thái active cũ
      buttons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Lấy section đích
      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        console.log("🔍 Cuộn tới:", targetId);
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        console.warn("⚠️ Không tìm thấy section có id:", targetId);
      }
    });
  });
});


 (function () {
        const filterToggle = document.getElementById('filterToggle');
        const floatingFilter = document.getElementById('floatingFilter');
        const links = document.querySelectorAll('.circle-filter .circle-btn');

        filterToggle?.addEventListener('click', () => {
          floatingFilter?.classList.toggle('open');
        });

        function setActive(el) {
          links.forEach(l => l.classList.remove('active'));
          el.classList.add('active');
        }

        links.forEach(link => {
          link.addEventListener('click', function (e) {
            const targetId = this.dataset.target;
            const targetEl = document.getElementById(targetId);

            // If target section exists on this page, smooth-scroll and prevent full navigation
            if (targetEl && location.pathname.endsWith('service-details.html')) {
              e.preventDefault();
              const header = document.querySelector('.header');
              const offset = header ? header.offsetHeight + 12 : 80;
              const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
              window.scrollTo({ top, behavior: 'smooth' });
              setActive(this);
              floatingFilter?.classList.remove('open');
              history.replaceState(null, '', `#${targetId}`);
            }
            // otherwise link will navigate to service-details.html#target (works from other pages)
          });
        });

        // On load, set active based on hash
        window.addEventListener('load', () => {
          const hash = location.hash.replace('#', '');
          if (hash) {
            const active = document.querySelector(`.circle-btn[data-target="${hash}"]`);
            if (active) setActive(active);
          }
        });
      })();
    

function recalcOrbit() {
  const container = document.querySelector(".orbit-container");

  const w = container.offsetWidth;
  const h = w;   // FIX: bắt buộc orbit luôn vuông để không bị méo trên iPhone

  const rx = w * 0.42;
  const ry = h * 0.36;
  const tilt = 15 * Math.PI / 180;

  const cx = w / 2;
  const cy = h / 2;

  nodes.forEach((node, i) => {
    const angle = (i / total) * Math.PI * 2;

    const x =
      cx +
      rx * Math.cos(angle) * Math.cos(tilt) -
      ry * Math.sin(angle) * Math.sin(tilt);

    const y =
      cy +
      rx * Math.cos(angle) * Math.sin(tilt) +
      ry * Math.sin(angle) * Math.cos(tilt);

    node.style.left = `${x - node.offsetWidth / 2}px`;
    node.style.top = `${y - node.offsetHeight / 2}px`;
  });
}
