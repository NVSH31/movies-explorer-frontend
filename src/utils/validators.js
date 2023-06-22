const validName = (str) => {
  const res = str.match(/^[a-zA-Zа-яА-Я\-\s]*$/);
  return (res === null);
}

const validEmail = (str) => {
  const res = str.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  return (res === null);
}

export { validName, validEmail };
