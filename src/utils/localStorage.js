import { ALLOW_PAGES } from "./constants";

export const setOne = (key, value) => {
  localStorage.setItem(key, value);
}

export const removeOne = (key) => {
  localStorage.removeItem(key);
}


export const setSeveral = (...keys) => {
  for (let i = 0; i < keys.length; i++) {
    setOne(keys[i][0], keys[i][1]);
  }
}

export const removeSeveral = (...keys) => {
  for (let i = 0; i < keys.length; i++) {
    removeOne(keys[i]);
  }
}

export const updatePages = (newPage) => {
  let correctPage = ALLOW_PAGES.find(page => page === newPage);
  if (localStorage.getItem('page') && correctPage) {
    setOne('prevPage', localStorage.getItem('page'));
  }
  setOne('page', newPage);
}
