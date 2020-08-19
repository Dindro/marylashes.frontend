// Валидация параметров
const getOptions = (value) => {

  // Default options
  const option = {
    name: "border",
    color: "white",
  };

  // Если ничего не передали
  if (!value) return option;

  // Если строка
  if (typeof value === 'string') {
    option.name = value;
    return option;
  }

  // Если объект то сливаем
  if (typeof value === 'object') {
    return Object.assign(option, value);
  }
};

export {
  getOptions,
};
