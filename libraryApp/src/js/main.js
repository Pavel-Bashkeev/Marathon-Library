import Navigo from 'navigo';
import { animLogo } from './components/animLogo.js';
import { search } from './components/search.js';

document.addEventListener('DOMContentLoaded', () => {
  const library = document.querySelector('.library');
  const book = document.querySelector('.book');
  const addBook = document.querySelector('.book-added');
  const btnsBack = document.querySelectorAll('.header-btn--back');
  const btnsAddBook = document.querySelectorAll('.btn-add');

  // Anim logo
  animLogo();
  // Anim logo
  // search
  search();
  // search
  
  
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
  
})

function closeSection(...sections) {
  sections.forEach(section => {
    section.classList.add('hidden');
  })
}

