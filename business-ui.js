(() => {
  const burger = document.getElementById("burger");
  const navigation = document.getElementById("navLinks");
  if (burger && navigation) {
    const setMenu = (open) => {
      navigation.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    };
    burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("in"));
  }

  const questions = document.querySelectorAll(".faq__q");
  questions.forEach((question) => {
    question.setAttribute("aria-expanded", "false");
    question.addEventListener("click", () => {
      const item = question.closest(".faq__item");
      const shouldOpen = !item.classList.contains("open");
      questions.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        other.closest(".faq__item").classList.remove("open");
        other.nextElementSibling.style.maxHeight = "";
      });
      if (shouldOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        question.nextElementSibling.style.maxHeight = `${question.nextElementSibling.scrollHeight}px`;
      }
    });
  });
})();
