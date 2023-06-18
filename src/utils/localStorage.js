const getOne = (key) => {
  localStorage.getItem(key);
}

export const setOne = (key, value) => {
  localStorage.setItem(key, value);
}

export const removeOne = (key) => {
  localStorage.removeItem(key);
}

export const getSeveral = (...keys) => {
  for (let i = 0; i < keys.length; i++) {
    getOne(keys[i]);
  }
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
