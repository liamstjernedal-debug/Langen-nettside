/* Vik Regnskap — små, avhengighetsfrie skript */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Bildeplasser: vis plassholder til bildet finnes ---------- */
  document.querySelectorAll(".slot").forEach((slot) => {
    const img = slot.querySelector("img");
    slot.classList.add("is-empty");
    if (!img) return;
    const loaded = () => slot.classList.remove("is-empty");
    const failed = () => img.remove();
    if (img.complete) { img.naturalWidth ? loaded() : failed(); }
    else {
      img.addEventListener("load", loaded, { once: true });
      img.addEventListener("error", failed, { once: true });
    }
  });

  /* ---------- Header-skygge ved scroll ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobilmeny ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny");
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Avsløring ved scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el, i) => {
      // Lett forsinkelse for elementer i samme gruppe
      const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal")) : [];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 80, 400) + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Ledger-kort: månedsnavn og opptelling ---------- */
  const months = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const monthEl = document.getElementById("ledger-month");
  if (monthEl) monthEl.textContent = months[prev.getMonth()].replace(/^./, (c) => c.toUpperCase()) + " " + prev.getFullYear();

  const nf = new Intl.NumberFormat("nb-NO");
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = nf.format(target); return; }
    const dur = 1800;
    const start = performance.now() + 400;
    const step = (t) => {
      const p = Math.min(Math.max((t - start) / dur, 0), 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = nf.format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  /* ---------- Frister ---------- */
  // Generelle frister for de fleste AS/ENK. Juster gjerne.
  function deadlinesFor(year) {
    const d = (m, day) => new Date(year, m - 1, day);
    const list = [
      { date: d(1, 31), name: "Aksjonærregisteroppgaven" },
      { date: d(2, 10), name: "MVA-melding, 6. termin" },
      { date: d(4, 10), name: "MVA-melding, 1. termin" },
      { date: d(5, 31), name: "Skattemelding for AS" },
      { date: d(6, 10), name: "MVA-melding, 2. termin" },
      { date: d(7, 31), name: "Årsregnskap til Brønnøysund" },
      { date: d(8, 31), name: "MVA-melding, 3. termin" },
      { date: d(10, 10), name: "MVA-melding, 4. termin" },
      { date: d(12, 10), name: "MVA-melding, 5. termin" },
    ];
    for (let m = 1; m <= 12; m++) list.push({ date: d(m, 5), name: "A-melding" });
    return list;
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const upcoming = deadlinesFor(today.getFullYear())
    .concat(deadlinesFor(today.getFullYear() + 1))
    .filter((x) => x.date >= today)
    .sort((a, b) => a.date - b.date);

  const dayMs = 86400000;
  const daysLeft = (date) => Math.round((date - today) / dayMs);
  const short = new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "short" });
  const long = new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const next = upcoming[0];
  if (next) {
    document.getElementById("cd-name").textContent = next.name;
    const left = daysLeft(next.date);
    document.getElementById("cd-days").textContent = left;
    document.querySelector(".countdown__days small").textContent = left === 0 ? "i dag!" : left === 1 ? "dag igjen" : "dager igjen";
    document.getElementById("cd-date").textContent = long.format(next.date);
  }

  const listEl = document.getElementById("deadline-list");
  if (listEl) {
    listEl.innerHTML = upcoming.slice(0, 7).map((x) => {
      const left = daysLeft(x.date);
      const label = left === 0 ? "I dag" : left === 1 ? "1 dag" : left + " dager";
      return `<li><span class="d-date">${short.format(x.date).replace(".", "")}</span><span class="d-name">${x.name}</span><span class="d-left">${label}</span></li>`;
    }).join("");
  }

  /* ---------- Kontaktskjema (åpner e-postklient) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      ["f-name", "f-email"].forEach((id) => {
        const input = document.getElementById(id);
        const valid = input.value.trim() && input.checkValidity();
        input.closest(".field").classList.toggle("has-error", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { status.textContent = "Fyll inn navn og en gyldig e-postadresse."; return; }

      const data = new FormData(form);
      const needs = data.getAll("behov").join(", ") || "Ikke valgt";
      const body = [
        "Navn: " + data.get("navn"),
        "Bedrift: " + (data.get("bedrift") || "-"),
        "E-post: " + data.get("epost"),
        "Telefon: " + (data.get("telefon") || "-"),
        "Behov: " + needs,
        "",
        data.get("melding") || "",
      ].join("\n");
      const subject = "Forespørsel fra nettsiden – " + (data.get("bedrift") || data.get("navn"));
      window.location.href = "mailto:post@vikregnskap.no?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Takk! E-postprogrammet ditt åpnes nå med forespørselen ferdig utfylt.";
    });
  }

  /* ---------- År i footer ---------- */
  const y = document.getElementById("year");
  if (y) y.textContent = now.getFullYear();
})();
