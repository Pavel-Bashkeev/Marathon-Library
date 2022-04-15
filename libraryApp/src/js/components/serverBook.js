export const URL_API = 'http://localhost:3024';

export const getBooks = async (id) => {
  const response = await fetch(`${URL_API}/api/books/${id ? id : ''}`)
  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.statusText);
}

export const getLabels = async () => {
  const response = await fetch(`${URL_API}/api/label`);

  if (response.ok) {
    return await response.json();
  }
  throw new Error(response.statusText);
}