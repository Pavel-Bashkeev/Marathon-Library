import Navigo from 'navigo';
import { animLogo } from './components/animLogo.js';

if(document.readyState === 'loading'){
  console.log('loading');
}
if(document.readyState === 'complete'){
  console.log('complete');
}
if(document.readyState === 'interactive'){
  console.log('interactive');
}
console.log(document.readyState)
document.addEventListener('DOMContentLoaded', () => {
  const library = document.querySelector('.library');
  const book = document.querySelector('.book');
  const addBook = document.querySelector('.book-added');
  const btnsBack = document.querySelectorAll('.header-btn--back');
  const btnsAddBook = document.querySelectorAll('.btn-add');

  // Anim logo
  animLogo()
  // Anim logo
  
  


  const router = new Navigo('/', {
    hash: false
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