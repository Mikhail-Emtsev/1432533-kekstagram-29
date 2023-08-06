const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция генерации неповторяющихся ID:
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const debounce = (callback, timeoutDelay) => {
  //Используем замыкание, чтобы id таймаута приклеился к возвращаемой функции с setTimeout для его перезаписи
  let timeoutId;

  return (...rest) => {
    //Удаляем предыдущий таймаут, чтобы не копились
    clearTimeout(timeoutId);
    //Устанавливаем новый таймаут с вызовом колбэка
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Функция случайного перемешивания массива
const randomArraySort = (data) => {
  for (let i = 0; i < data.length - 1; i++) {
    const randomIndex = getRandomInteger(0, data.length - 1);
    const buffer = data[i];
    data[i] = data[randomIndex];
    data[randomIndex] = buffer;
  }
  return data;
};

// Функция-колбэк случайной сортировки фото
const sortRandom = (data, count) => randomArraySort(data).slice(0, count);

// Функция-колбэк сортировки фото по количеству комментариев по убыванию
const sortComments = (data) => data.sort((a, b) => b.comments.length - a.comments.length);

// Функция удаления элемента
const removeElement = (element) => {
  element.remove();
};


export {getRandomInteger, getRandomArrayElement, createIdGenerator, debounce, sortRandom, sortComments, removeElement};
