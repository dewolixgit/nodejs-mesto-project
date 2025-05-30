const ERROR_MESSAGES = {
  internalError: 'На сервере произошла ошибка',
  userNotFound: 'Пользователь не найден',
  userIdIsNotValid: 'Передан некорректный идентификатор пользователя',
  cardNotFound: 'Карточка не найдена',
  notFound: 'Запрашиваемый ресурс не найден',
  passwordOrEmailIncorrect: 'Неправильные почта или пароль',
  forbidden: 'Недостаточно прав для выполнения операции',
  userAlreadyExists: 'Пользователь с таким email уже существует',
  authRequired: 'Необходима авторизация',
  invalidToken: 'Недействительный токен',
};

export default ERROR_MESSAGES;
