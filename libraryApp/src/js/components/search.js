export const search = () => {
  const formSearch = document.querySelector('.search__form');
  const openBtnSearch = document.querySelectorAll('.search-btn')

  const closeBtnSearch = document.querySelector('.search__form-btn--close')
  const searchBtn = document.querySelector('.search__form-btn--search');

  if(document.body.clientWidth > 1024) {
    formSearch.style.right = (document.body.clientWidth - 1060) / 2 + 'px';
    window.addEventListener('resize', () =>{
      formSearch.style.right = (document.body.clientWidth - 1060) / 2 + 'px';
    })
  }
  const closeFormSearch = ({target}) => {
    console.log(target);
    if(target.closest('.search__form, .search__form-icon--search, .search-btn')){
      return
    }
    hideElement(formSearch, 'search__form--active');
    document.removeEventListener('click', closeFormSearch);
  }

  closeBtnSearch.addEventListener('click', () => {
    hideElement(formSearch, 'search__form--active');
  });
  openBtnSearch.forEach(btn => {
    btn.addEventListener('click', () =>{
      showElement(formSearch, 'search__form--active');
      document.addEventListener('click', closeFormSearch, true);
    })
  })
}

function showElement (element, className) {
  element.classList.add(className);
}
function hideElement (element, className) {
  element.classList.remove(className);
}