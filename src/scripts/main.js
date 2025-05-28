// Функции для модального окна
function openBookingModal() {
  document.getElementById("bookingModal").style.display = "block";
}

function closeBookingModal() {
  document.getElementById("bookingModal").style.display = "none";
}

// Закрытие модального окна при клике вне его области
window.onclick = function (event) {
  const modal = document.getElementById("bookingModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Плавная прокрутка по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Обработчик отправки формы записи
document
  .querySelector(".booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const bookingData = {};
    formData.forEach((value, key) => {
      bookingData[key] = value;
    });

    console.log("Данные записи:", bookingData);

    alert(
      "Спасибо за запись! Мы свяжемся с вами в ближайшее время для подтверждения.",
    );

    closeBookingModal();
    this.reset();
  });

// Анимация появления карточек услуг при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Применение анимации к карточкам услуг
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".service-card").forEach((card) => {
    observer.observe(card);
  });
});
