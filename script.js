// Mobil menu, scroll shadow, reveal animations and form feedback.

const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const nav = document.getElementById("primary-navigation");

// Header gets a subtle shadow after scrolling.
window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
});

// Mobile menu open / close.
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Menuyu kapat" : "Menuyu ac");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Menuyu ac");
    });
  });
}

// Smooth fade-up reveal for sections.
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

// Forms do not send mail yet; show confirmation message instead.
const bindLeadForm = (formId, feedbackId) => {
  const formElement = document.getElementById(formId);
  const feedbackElement = document.getElementById(feedbackId);

  if (!formElement || !feedbackElement) return;

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    feedbackElement.textContent = "Talebiniz alinmistir. En kisa surede sizinle iletisime gececegiz.";
    formElement.reset();
  });
};

bindLeadForm("lead-form", "lead-form-feedback");
bindLeadForm("contact-form", "form-feedback");

// Service cards get real photos matched to each service.
const serviceImageMap = {
  "Sosyal Medya Yönetimi": "https://images.unsplash.com/photo-1777559542650-f2b84a66d30f?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Meta Reklamları": "https://images.unsplash.com/photo-1759215524649-78b47fc790e0?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Google Reklamları": "https://images.unsplash.com/photo-1706426629246-2a3c3e3e3ff2?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "İçerik Üretimi": "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Grafik Tasarım": "https://images.unsplash.com/photo-1560461396-ec0ef7bb29dd?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Marka Danışmanlığı": "https://images.unsplash.com/photo-1666698809123-44e998e93f23?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Kurumsal Kimlik": "https://images.unsplash.com/photo-1669486376611-3de5eb7da37b?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Web Site Tasarımı": "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Video Çekimi & Prodüksiyon": "https://images.unsplash.com/photo-1569620978580-980c2592fe9b?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Kurgu & Montaj": "https://images.unsplash.com/photo-1541506618330-7c369fc759b5?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Reels & Short Form İçerik": "https://images.unsplash.com/photo-1761122827167-159d1d272313?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "Drone & Sahne Çekimi": "https://images.unsplash.com/photo-1625838117196-c4a44a403bba?auto=format&fit=crop&fm=jpg&q=80&w=1600",
};

document.querySelectorAll(".service-card").forEach((card) => {
  const title = card.querySelector("h3")?.textContent?.trim();
  const imageUrl = title ? serviceImageMap[title] : null;
  if (!imageUrl) return;

  const media = document.createElement("div");
  media.className = "service-media";
  media.innerHTML = `
    <img class="service-image" src="${imageUrl}" alt="${title} icin gorsel" loading="lazy" decoding="async" />
  `;

  card.prepend(media);
});
