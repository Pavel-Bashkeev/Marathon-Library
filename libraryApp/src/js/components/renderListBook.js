import { getBooks, getLabels, URL_API } from "./serverBook.js";
const bookList = document.querySelector('.book-list');
const bookContent = document.querySelector('.book-content');
const getStars = (count) => {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      stars.push(`<img src="./images/icons/star-fill.svg" alt="Рейтинг ${count} из 5" class="cart__rating-star" width="18"
      height="18">`)
    } else if (i < count) {
      stars.push(`<img src="./images/icons/star-fill.svg" alt="" class="cart__rating-star" width="18" height="18">`)
    } else {
      stars.push(`<img src="./images/icons/star-stroke.svg" alt="" class="cart__rating-star" width="18" height="18">`)
    }
  }

  return stars;
};

export const renederListBooks = async () => {
  // const books = await getBooks();
  // console.log('books: ', books);
  // const labels = await getLabels();
  // console.log('labels: ', labels);

  const [books, labels] = await Promise.all([getBooks(), getLabels()]);
  // console.log('books: ', books);
  // console.log('labels: ', labels);
  bookList.textContent = '';

  books.forEach(({ author, title, id, description, image, rating, label }) => {
    const item = document.createElement('li');
    item.classList.add('book-list__item');
    item.innerHTML = `
    <a href="./#/book?id=${id}" class="book-list__link" >
          <article class="cart">
            <div class="cart__preview">
              <img src="${URL_API}/${image}" alt="Обложка книги ${title}" width="100" height="148" class="cart__preview-img">
              <span class="cart__status">
              ${labels[label]}
              </span>
            </div>
            <div class="cart__content">
              <h3 class="cart__title">${title}</h3>
              <p class="cart__author">${author}</p>
              <p class="cart__descr">
              ${description.substring(0, 80)}...
              </p>
              <div class="cart__rating">
                ${getStars(rating).join('')}
              </div>
            </div>
          </article>
        </a>
    `;
    bookList.appendChild(item);
  });
}

export const renderBook = async (idBookPage) => {
  const books = await getBooks();
  bookContent.textContent = '';console.log();
  books.forEach(({ author, title, id, description, image, rating, label }) => {
    if(idBookPage === id) {
      bookContent.innerHTML = `
      <div class="book-content__shell">
      <img src="${URL_API}/${image}" alt="Обложка книги ${title}" width="300" height="430" class="book-content__image">
    </div>
    <div class="book-content__descr">
      <h3 class="book-content__title">
        ${title}
      </h3>
      <p class="book-content__author">
        ${author}
      </p>
      <div class="book-content__rating">
      ${getStars(rating).join('')} 
      </div>
      <p class="book-content__more">
        Описание
      </p>
      <p class="book-content__text">
      ${description.substring(0, 800)}...
      </p>
    </div>
    <div class="book-content__wrapper">
      <button class="book-content__btn btn-reset">
        хочу прочитать
      </button>
    </div>
      `;
    }

  })
 

    // bookContent.innerHTML = `
    //   <div class="book-content__shell">
    //   <img src="${URL_API}/${image}" alt="Обложка книги ${title}" width="300" height="430" class="book-content__image">
    // </div>
    // <div class="book-content__descr">
    //   <h3 class="book-content__title">
    //     ${title}
    //   </h3>
    //   <p class="book-content__author">
    //     ${author}
    //   </p>
    //   <div class="book-content__rating">
    //   ${getStars(rating).join('')} 
    //   </div>
    //   <p class="book-content__more">
    //     Описание
    //   </p>
    //   <p class="book-content__text">
    //   ${description.substring(0, 800)}...
    //   </p>
    // </div>
    // <div class="book-content__wrapper">
    //   <button class="book-content__btn btn-reset">
    //     хочу прочитать
    //   </button>
    // </div>
    //   `;
}