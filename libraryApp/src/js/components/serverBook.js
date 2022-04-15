export const URL_API = 'https://pavel-bashkeev.github.io/Marathon-Library/libraryApp/backend';

export const getBooks = async () => {
  const response = await fetch(`https://pavel-bashkeev.github.io/Marathon-Library/libraryApp/backend/db.json`)
  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

export const getLabels = async () => {
  const response = await fetch(`https://pavel-bashkeev.github.io/Marathon-Library/libraryApp/backend/db_label.json`);

  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.statusText);
}