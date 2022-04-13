import Navigo from 'navigo';
export const routes = () => {
  const library = document.querySelector('.library');
  const book = document.querySelector('.book');
  const addBook = document.querySelector('.book-added');
  const btnsBack = document.querySelectorAll('.header-btn--back');
  const btnsAddBook = document.querySelectorAll('.btn-add');
  const router = new Navigo('/', {
    hash: true
  })
  router.on({
    '/': () => {
      closeSection(library, book, addBook);
      library.classList.remove('hidden');

    },
    'book': () => {

      closeSection(library, book, addBook);
      book.classList.remove('hidden');
    },
    'add-book': () => {
      closeSection(library, book, addBook);
      addBook.classList.remove('hidden');
    }
  }).resolve()

  btnsBack.forEach(btn => {
    btn.addEventListener('click', () => {
      router.navigate('/')
    })
  })
  btnsAddBook.forEach(btn => {
    btn.addEventListener('click', () => {
      router.navigate('add-book')
    })
  })

}
function closeSection(...sections) {
  sections.forEach(section => {
    section.classList.add('hidden');
  })
}