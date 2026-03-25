// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const spans = hamburger.querySelectorAll("span");
    if (navLinks.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Close mobile menu on link click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Tab Functionality (Services Page)
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    const tabPane = document.getElementById(tabId);
    if (tabPane) tabPane.classList.add("active");
  });
});

// Pricing Toggle (Membership Page)
const billingToggle = document.getElementById("billingToggle");
const priceAmounts = document.querySelectorAll(".amount");
const pricePeriods = document.querySelectorAll(".period");

if (billingToggle) {
  billingToggle.addEventListener("change", () => {
    const isYearly = billingToggle.checked;

    priceAmounts.forEach((amount) => {
      const monthly = amount.getAttribute("data-monthly");
      const yearly = amount.getAttribute("data-yearly");
      amount.textContent = isYearly ? yearly : monthly;
    });

    if (pricePeriods.length > 0) {
      pricePeriods.forEach((period) => {
        period.textContent = isYearly ? "/year" : "/month";
      });
    }
  });
}

// Animated Counters
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Observe elements for counter animation
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll("[data-target]");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        animateValue(counter, 0, target, 2000);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".stats-container, .hero-stats")
  .forEach((section) => {
    observer.observe(section);
  });

// Gallery Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "flex";
        item.style.animation = "fadeIn 0.5s ease";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Form Submissions
const handleFormSubmit = (form, message) => {
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(message);
      form.reset();
    });
  }
};

handleFormSubmit(
  document.getElementById("contactForm"),
  "Thank you! We will contact you soon.",
);
handleFormSubmit(
  document.getElementById("newsletterForm"),
  "Thank you for subscribing!",
);

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll animations
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll(
    ".feature-box, .facility-card, .trainer-card, .blog-card, .testimonial-card, .pricing-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    scrollObserver.observe(el);
  });
