export const formAdd = () => {

  const form = document.querySelector('.form');
  const fieldsets = document.querySelectorAll('.form__field');
  const formBtnNext = document.querySelector('.form__btn--next');
  const formBtnBack = document.querySelectorAll('.form__btn--back');
  const btnBackPage = document.querySelector('.book-added__container .header-btn--back');

  let count = null;


  formBtnNext.addEventListener('click', ({ target }) => {
    count = parseInt(target.dataset.count);
    const fieldset = fieldsets[count];

    let valid = true;
    console.log('valid: ', valid);
    for (const element of fieldset.elements) {
      if (!element.checkValidity()) {
        element.classList.add('no-valid');
        valid = false;
        console.log('valid: ', valid);
      } else {
        element.classList.remove('no-valid');
      };
    };

    if (valid) {
      count += 1;
      target.dataset.count = count;

      if (count === fieldsets.length - 1) {

        formBtnNext.textContent = 'Добавить книгу';
      };
      if (count === fieldsets.length) {
        const data = true;
        if (data) {
          form.reset();
          count = 0;
          target.dataset.count = count;
          formBtnNext.textContent = 'Далее';
          window.location.hash = '#/';
        };

      };
      fieldset.classList.add('hidden');
      fieldsets[count].classList.remove('hidden');
    };
  });
  formBtnBack.forEach(item => {
    item.addEventListener('click', () => {

      const fieldset = fieldsets[formBtnNext.dataset.count];
      fieldset.classList.add('hidden');

      let countBack = parseInt(formBtnNext.dataset.count) - 1;
      formBtnNext.dataset.count = countBack;
      fieldsets[countBack].classList.remove('hidden');

      if (parseInt(formBtnNext.dataset.count) < 2) {
        formBtnNext.textContent = 'Далее';
      };
    });
  });
  btnBackPage.addEventListener('click', () => {
    form.reset();
  });
};