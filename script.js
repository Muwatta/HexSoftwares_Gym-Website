// ==========================================
// DOM ELEMENTS
// ==========================================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const billingToggle = document.getElementById("billingToggle");

// ==========================================
// MOBILE NAVIGATION
// ==========================================
if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Animate hamburger
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
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
});

// ==========================================
// SCROLL EFFECTS
// ==========================================
window.addEventListener("scroll", () => {
  // Navbar background
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Back to top
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==========================================
// PRICING TOGGLE
// ==========================================
if (billingToggle) {
  billingToggle.addEventListener("change", () => {
    const isYearly = billingToggle.checked;
    const priceAmounts = document.querySelectorAll(".amount");
    const periods = document.querySelectorAll(".period");

    priceAmounts.forEach((amount) => {
      const monthly = amount.getAttribute("data-monthly");
      const yearly = amount.getAttribute("data-yearly");
      const targetValue = isYearly ? yearly : monthly;

      // Animate number change
      animateNumber(
        amount,
        parseInt(amount.textContent),
        parseInt(targetValue),
        300,
      );
    });

    // Update period text
    periods.forEach((period) => {
      period.textContent = isYearly ? "/year" : "/month";
    });
  });
}

// Number animation function
function animateNumber(element, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;

  const timer = setInterval(
    () => {
      current += increment;
      element.textContent = current;

      if (current === end) {
        clearInterval(timer);
      }
    },
    Math.max(stepTime, 10),
  );
}

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target"));
          animateNumber(stat, 0, target, 2000);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.querySelector(".stats-grid");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ==========================================
// TAB FUNCTIONALITY (Classes Page)
// ==========================================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active from all
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    // Add active to clicked
    btn.classList.add("active");
    const tabId = btn.getAttribute("data-tab");
    const tabPane = document.getElementById(tabId);
    if (tabPane) {
      tabPane.classList.add("active");
    }
  });
});

// ==========================================
// FILTER BUTTONS (Classes & Trainers & Blog)
// ==========================================
const filterBtns = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll("[data-category]");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    // Filter items
    filterItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
        item.style.animation = "fadeIn 0.5s ease";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Blog category filter
const catBtns = document.querySelectorAll(".cat-btn");
const blogCards = document.querySelectorAll(".blog-card");

catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    catBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    blogCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ==========================================
// ACCORDION (Contact Page)
// ==========================================
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    // Close others
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current
    item.classList.toggle("active");
  });
});

// ==========================================
// FORM SUBMISSIONS
// ==========================================
// Contact form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      firstName: document.getElementById("firstName")?.value,
      lastName: document.getElementById("lastName")?.value,
      email: document.getElementById("email")?.value,
      subject: document.getElementById("subject")?.value,
      message: document.getElementById("message")?.value,
    };

    // Show success message
    showNotification(
      "Thank you! Your message has been sent. We will contact you soon.",
    );
    contactForm.reset();
  });
}

// Newsletter form
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 20px 30px;
        border-radius: 15px;
        border: 1px solid rgba(0, 212, 255, 0.3);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  },
  { threshold: 0.1 },
);

// Observe elements for animation
document
  .querySelectorAll(
    ".service-card, .facility-card, .trainer-card, .pricing-card, .blog-card, .testimonial-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    scrollObserver.observe(el);
  });

// Add animate-in class style
const animateStyle = document.createElement("style");
animateStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animateStyle);

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// ==========================================
// BUTTON CLICK HANDLERS (Select Plan, Book Class, etc.)
// ==========================================
document
  .querySelectorAll(
    ".pricing-card button, .class-card .btn, .trainer-detailed-card .btn",
  )
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(
        ".pricing-card, .class-card, .trainer-detailed-card",
      );

      if (card.classList.contains("pricing-card")) {
        showNotification("Redirecting to membership signup...");
      } else if (card.classList.contains("class-card")) {
        showNotification("Class booking feature coming soon!");
      } else {
        showNotification("Trainer booking feature coming soon!");
      }
    });
  });
