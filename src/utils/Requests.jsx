const baseUrl = "https://jsonplaceholder.typicode.com";

const fetchRequest = (url) => {
  return fetch(`${baseUrl}${url}`).then((r) => {
    if (!r.ok) {
      throw new Error(`request failed with status ${r.status}`);
    }
    return r.json();
  });
};

export const getAlbums = () => {
  return fetchRequest(`/albums`);
};
export const getAlbum = (id) => {
  return fetchRequest(`/albums/${id}`);
};
export const getUserAlbums = (id) => {
  return fetchRequest(`/users/${id}/albums`);
};
export const getUsers = () => {
  return fetchRequest(`/users`);
};
export const getUser = (id) => {
  return fetchRequest(`/users/${id}`);
};
export const getAlbumPhotos = (id) => {
  return fetchRequest(`/albums/${id}/photos`);
};
