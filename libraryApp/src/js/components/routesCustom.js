import Navigo from 'navigo';
import { renederListBooks } from './renderListBook.js';
import { renderBook } from './renderListBook.js';
import { uploadPriview } from './upload.js';
import { animLogo } from './animLogo.js';



const library = document.querySelector('.library');
const book = document.querySelector('.book');
const addBook = document.querySelector('.book-added');
const btnsBack = document.querySelectorAll('.header-btn--back');
const btnsAddBook = document.querySelectorAll('.btn-add');

export const router = new Navigo('/', {
  hash: true,
});
export const routes = () => {

  router.on({
    '/': () => {
      closeSection(library, book, addBook);
      library.classList.remove('hidden');
      animLogo();
      renederListBooks();
    },
    'book': ({params: {id}}, ) => {
      closeSection(library, book, addBook);
      book.classList.remove('hidden');
      renderBook(id);
    },
    'add-book': () => {
      closeSection(library, book, addBook);
      addBook.classList.remove('hidden');
      uploadPriview();
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