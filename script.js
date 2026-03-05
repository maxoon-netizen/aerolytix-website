(() => {
  // Mobile Menu (Dialog)
  const menuDialog = document.getElementById("menuDialog");
  const openMenuBtn = document.querySelector("[data-menu-open]");
  const closeMenuBtn = document.querySelector("[data-menu-close]");

  const openMenu = () => {
    if (!menuDialog) return;
    if (typeof menuDialog.showModal === "function") menuDialog.showModal();
    else menuDialog.setAttribute("open", "true");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeMenu = () => {
    if (!menuDialog) return;
    if (typeof menuDialog.close === "function") menuDialog.close();
    else menuDialog.removeAttribute("open");
    document.body.style.overflow = "";
  };

  openMenuBtn?.addEventListener("click", openMenu);
  closeMenuBtn?.addEventListener("click", closeMenu);

  // Close menu when clicking outside
  menuDialog?.addEventListener("click", (e) => {
    if (e.target === menuDialog) closeMenu();
  });

  // Close menu on link click
  menuDialog?.querySelectorAll("a[href^='#']")?.forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Smooth scroll logic for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      history.pushState(null, "", href);
    });
  });

  // Scroll to top
  document.querySelector("[data-scroll-top]")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Contact form -> mailto handler
  const leadForm = document.getElementById("leadForm");
  leadForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(leadForm);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const location = String(form.get("location") || "").trim();
    const message = String(form.get("message") || "").trim();

    const subject = encodeURIComponent(`Aerolytix inquiry — ${name || "New lead"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        location ? `Location: ${location}` : null,
        "",
        `Message:`,
        message,
        "",
        "Sent from: aerolytix.nl (static form)",
      ]
        .filter((val) => val !== null)
        .join("\n")
    );

    window.location.href = `mailto:info@aerolytix.nl?subject=${subject}&body=${body}`;
  });

  // Simple Accordion exclusive open (optional enhancement)
  const detailsItems = document.querySelectorAll('details[name="faq"]');
  detailsItems.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
      // Close all the others that are open
      detailsItems.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute("open");
        }
      });
    });
  });
})();
