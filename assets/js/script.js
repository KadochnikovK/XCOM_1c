document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hero__hamburger");
  const wrapper = document.querySelector(".hero__content");
  const menu = document.querySelector(".hero__menu");
  const links = document.querySelectorAll(".header__link");

  const changeActiveMenu = () => {
    hamburger.classList.toggle("active");
    wrapper.classList.toggle("hero__content--hidden");
    menu.classList.toggle("hero__menu--active");
  };
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("header__menu--active")) {
        changeActiveMenu();
      }
    });
  });
  hamburger.addEventListener("click", changeActiveMenu);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("main-form");
  const formItems = form.querySelectorAll(".form__item");
  const privacyCheckbox = document.querySelector("#privacy-policy");
  const privacyError = document.querySelector(".form__item--checkbox .error-message");

  function clearErrors() {
    formItems.forEach((item) => {
      item.classList.remove("form__item--not-valid");
      const errorElement = item.querySelector(".error-message");
      if (errorElement) {
        errorElement.style.display = "none";
      }
    });
  }

  function addError(element, message) {
    const formItem = element.closest(".form__item");
    formItem.classList.add("form__item--not-valid");

    // const errorElement = formItem.querySelector(".error-message");
    // if (errorElement) {
    //     errorElement.textContent = message;
    //     errorElement.style.display = "block";
    // } else {
    //     const newErrorElement = document.createElement("div");
    //     newErrorElement.className = "error-message";
    //     newErrorElement.textContent = message;
    //     formItem.appendChild(newErrorElement);
    // }
  }

  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", handleInputFocus);
    input.addEventListener("blur", handleInputBlur);
  });

  function handleInputFocus(e) {
    const formItem = e.target.closest(".form__item");
    if (formItem) {
      formItem.classList.add("form__item--focused");

      // Находим лейбл и добавляем ему класс
      const label = formItem.querySelector("label");
      if (label) {
        label.classList.add("label--focused");
      }
    }
  }

  function handleInputBlur(e) {
    const formItem = e.target.closest(".form__item");
    if (formItem) {
      formItem.classList.remove("form__item--focused");

      // Находим лейбл и убираем класс
      const label = formItem.querySelector("label");
      if (label) {
        label.classList.remove("label--focused");
      }
    }
  }

  function validateField(field) {
    const value = field.value.trim();
    const name = field.name;

    if (field.type === "checkbox") {
      if (!field.checked) {
        addError(field, "Необходимо ваше согласие");
        return false;
      }
      return true;
    }

    if (!value) {
      addError(field, "Это поле обязательно для заполнения");
      return false;
    }

    switch (name) {
      // case "taxId":
      //     if (!/^\d{10,12}$/.test(value)) {
      //         addError(field, "ИНН должен содержать 10 или 12 цифр");
      //         return false;
      //     }
      //     break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          addError(field, "Введите корректный email");
          return false;
        }
        break;
      case "phone":
        if (!/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(value)) {
          addError(field, "Введите корректный номер телефона");
          return false;
        }
        break;
    }

    return true;
  }

  function showModal(title, text, buttonText) {
    const modal = document.querySelector(".modal");
    const modalWindow = modal.querySelector(".modal__window");
    const modalHeadline = modal.querySelector(".modal__headline");
    const modalText = modal.querySelector(".modal__text");
    const modalButton = modal.querySelector(".modal__button");
    const modalClose = modal.querySelector(".modal__close");

    modalHeadline.textContent = title;
    modalText.textContent = text;
    modalButton.textContent = buttonText;

    modal.style.display = "flex";

    modalWindow.classList.add("animate__fadeInUp");
    modal.classList.add("animate__fadeIn");

    function closeModal() {
      modalWindow.classList.remove("animate__fadeInUp");
      modalWindow.classList.add("animate__fadeOutDown");
      modal.classList.remove("animate__fadeIn");
      modal.classList.add("animate__fadeOut");

      setTimeout(() => {
        modal.style.display = "none";
        modalWindow.classList.remove("animate__fadeOutDown");
        modal.classList.remove("animate__fadeOut");

        modalHeadline.textContent = "";
        modalText.textContent = "";
        modalButton.textContent = "";
      }, 500);
    }

    modalButton.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;
    const fields = form.querySelectorAll("input:not([type=submit]), textarea");

    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!privacyCheckbox.checked) {
      addError(privacyCheckbox, "Необходимо ваше согласие");
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name: form.elements.name.value.trim(),
        surname: form.elements.surname.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim(),
        company: form.elements.company.value.trim(),
        job: form.elements.job.value.trim(),
        // taxId: form.elements.taxId.value.trim(),
        privacyPolicy: form.elements["privacy-policy"].checked,
      };

      console.log("Данные формы:", formData);
      showModal("Регистрация прошла успешно", "Мы свяжемся с вами в ближайшее время", "Хорошо");
    }
  });

  privacyCheckbox.addEventListener("change", function () {
    if (this.checked) {
      this.closest(".form__item").classList.remove("form__item--not-valid");
      if (privacyError) privacyError.style.display = "none";
    }
  });

  form.addEventListener("input", function (e) {
    if (e.target.tagName === "INPUT") {
      const formItem = e.target.closest(".form__item");
      formItem.classList.remove("form__item--not-valid");
      const errorElement = formItem.querySelector(".error-message");
      if (errorElement) {
        errorElement.style.display = "none";
      }
    }
  });
});

document.addEventListener(
  "wheel",
  function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  },
  { passive: false }
);

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey === true || e.metaKey === true) && (e.key === "=" || e.key === "+" || e.key === "-" || e.keyCode === 187 || e.keyCode === 189)) {
    e.preventDefault();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && (e.key === "0" || e.keyCode === 48)) {
    e.preventDefault();
  }
});
