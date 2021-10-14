import { Video } from '../types';

const getLocalStorage = (): Video[] | [] => {
  let playlist = localStorage.getItem('playlist');
  if (playlist) {
    return JSON.parse(playlist);
  } else {
    return [];
  }
};

export default getLocalStorage;
