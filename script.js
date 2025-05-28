// ===== ОСНОВНЫЕ НАСТРОЙКИ =====

// Установка минимальной даты (сегодня) для поля выбора даты
document.getElementById("date").min = new Date().toISOString().split("T")[0];

// ===== ОПИСАНИЯ УСЛУГ =====

// Объект с подробными описаниями услуг
const serviceDescriptions = {
  lashes:
    "Наращивание ресниц различными техниками, ламинирование и окрашивание для выразительного взгляда",
  brows:
    "Коррекция формы бровей, окрашивание хной или краской, ламинирование для идеальных бровей",
  haircut:
    "Профессиональные мужские и женские стрижки, укладки и консультации по подбору стиля",
  manicure:
    "Классический и аппаратный маникюр, покрытие гель-лаком, дизайн ногтей",
  pedicure:
    "Комплексный уход за стопами, обработка ногтей, массаж и увлажнение кожи",
};

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С УСЛУГАМИ =====

// Функция для отображения описания выбранной услуги
function updateServiceDescription() {
  const serviceSelect = document.getElementById("service");
  const selectedService = serviceSelect.value;

  // Удаляем существующее описание
  const existingDesc = document.getElementById("serviceDescription");
  if (existingDesc) {
    existingDesc.remove();
  }

  // Добавляем новое описание если услуга выбрана
  if (selectedService && serviceDescriptions[selectedService]) {
    const descElement = document.createElement("div");
    descElement.id = "serviceDescription";
    descElement.style.cssText = `
            margin-top: 15px;
            padding: 20px;
            background: linear-gradient(135deg, var(--soft-pink) 0%, var(--white) 100%);
            border-radius: 10px;
            border-left: 4px solid var(--primary-pink);
            font-size: 1rem;
            color: var(--medium-gray);
            line-height: 1.6;
        `;
    descElement.textContent = serviceDescriptions[selectedService];
    serviceSelect.parentNode.appendChild(descElement);
  }
}

// ===== ФУНКЦИИ ДЛЯ ВАЛИДАЦИИ =====

// Функция проверки номера телефона
function validatePhone(phone) {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length === 11 && digitsOnly.startsWith("7");
}

// Функция показа/скрытия ошибки телефона
function showPhoneError(show) {
  const errorElement = document.getElementById("phoneError");
  errorElement.style.display = show ? "block" : "none";
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// Обработчик изменения выбора услуги
document
  .getElementById("service")
  .addEventListener("change", updateServiceDescription);

// ===== ФОРМАТИРОВАНИЕ НОМЕРА ТЕЛЕФОНА =====

// Обработчик ввода номера телефона с форматированием
document.getElementById("phone").addEventListener("input", function (e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, "");

  // Если поле очищено, начинаем с +7
  if (value === "") {
    input.value = "+7 ";
    return;
  }

  // Убираем первую цифру 7 если она есть
  if (value.startsWith("7")) {
    value = value.substring(1);
  }

  // Ограничиваем 10 цифрами после +7
  value = value.substring(0, 10);

  // Форматируем номер
  let formatted = "+7";
  if (value.length > 0) {
    formatted += " (" + value.substring(0, 3);
    if (value.length >= 3) {
      formatted += ") " + value.substring(3, 6);
      if (value.length >= 6) {
        formatted += "-" + value.substring(6, 8);
        if (value.length >= 8) {
          formatted += "-" + value.substring(8, 10);
        }
      }
    }
  }

  input.value = formatted;
});

// Обработчик нажатий клавиш для телефона
document.getElementById("phone").addEventListener("keydown", function (e) {
  const input = e.target;

  if (e.key === "Backspace") {
    const cursorPos = input.selectionStart;

    // Запрещаем удалять префикс +7
    if (cursorPos <= 3) {
      e.preventDefault();
      input.value = "+7 ";
      input.setSelectionRange(3, 3);
    }
  }
});

// Обработчик фокуса на поле телефона
document.getElementById("phone").addEventListener("focus", function (e) {
  const input = e.target;
  if (input.value === "" || input.value === "+7") {
    input.value = "+7 ";
    setTimeout(() => input.setSelectionRange(3, 3), 0);
  }
});

// ===== ОБРАБОТКА ОТПРАВКИ ФОРМЫ =====

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Получаем данные формы
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Проверка заполнения обязательных полей
  if (!data.name || !data.phone || !data.service || !data.date || !data.time) {
    alert("Пожалуйста, заполните все обязательные поля");
    return;
  }

  // Проверка номера телефона
  if (!validatePhone(data.phone)) {
    showPhoneError(true);
    document.getElementById("phone").focus();
    return;
  }

  // Скрываем ошибку если валидация прошла
  showPhoneError(false);

  // Симуляция отправки формы (в реальном проекте здесь был бы запрос на сервер)
  console.log("Заявка отправлена:", data);

  // Показываем сообщение об успехе
  document.getElementById("successMessage").style.display = "block";

  // Очищаем форму
  this.reset();

  // Удаляем описание услуги
  const existingDesc = document.getElementById("serviceDescription");
  if (existingDesc) {
    existingDesc.remove();
  }

  // Прокручиваем к сообщению об успехе
  document.getElementById("successMessage").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  // Скрываем сообщение об успехе через 5 секунд
  setTimeout(() => {
    document.getElementById("successMessage").style.display = "none";
  }, 5000);
});

// ===== ИНИЦИАЛИЗАЦИЯ =====

// Плавное появление страницы при загрузке
document.addEventListener("DOMContentLoaded", function () {
  console.log("Сайт салона красоты Softness загружен");
});
