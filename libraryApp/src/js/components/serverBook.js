// export const URL_API = 'https://pavel-bashkeev.github.io/Marathon-Library/libraryApp/backend';
export const URL_API = 'https://enigmatic-dawn-73119.herokuapp.com/'

export const getBooks = async () => {
  const response = await fetch(`${URL_API}api/books/`)
  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

export const getLabels = async () => {
  const response = await fetch(`${URL_API}api/labels/`);

  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.statusText);
}