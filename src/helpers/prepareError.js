const prepareError = (
  errorName = 'Ошибка',
  errorMessage = 'Что-то пошло не так :-(',
) => {
  const e = new Error(errorMessage);
  e.name = errorName;
  return e;
};

export default prepareError;
