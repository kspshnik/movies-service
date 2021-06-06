/**
 * Объект с конфигурацией путей сервера
 *
 * @constant {object} mestoREST объект с конфигурационными данными API
 * @constant {string} serverURL путь к серверу проекта Mesto
 * @constant {string} userInfo  URI профиля пользователя
 * @constant {string} cardList URI массива карточек
 * @constant {string} card базовая часть URI карточки
 * @constant {string} avatar URI аватара пользователя
 */
const mestoREST = {
  server: 'https://api.mesto-react.website',
  userInfo: '/users/me',
  cardList: '/cards',
  card: '/cards',
  avatar: '/avatar',
  like: '/cards/likes',
  authServer: 'https://api.mesto-react.website',
  signin: '/signin',
  signup: '/signup',
  checkpoint: '/users/me',
};

/**
 * @constant {string} mestoToken  токен доступа к серверу
 */
const mestoToken = 'b8a4e802-7d64-4394-aed1-4a3ad213635d';

/**
 * Класс API реализует работу с бекендом.
 *
 * @property {string} API._token - аутентификационный токен
 * @property {string} API._serverURL адрес сервера
 * @property {string} API._userInfoEndpoint конечная точка профиля
 * @property {string} API._cardListEndpoint конечная точка получения карточек
 * @property {string} API._cardURL  путь к конечной точке карточки
 * @property {string} API._cardLikeURL путь к конечной точке отметки "нравится"
 * @property {string} API._avatarEndpoint конечная точка получения/смены аватара
 * @property {object} API._headers заголовки запроса
 */

class API {
  /**
   *
   * @param {object} urlConfig - конфигурационный объект настроек API
   * @param {string} urlConfig.serverURL путь к серверу проекта Mesto
   * @param {string} urlConfig.userInfo  URI профиля пользователя
   * @param {string} urlConfig.cardList URI массива карточек
   * @param {string} urlConfig.card базовая часть URI карточки
   * @param {string} urlConfig.avatar URI аватара пользователя
   * @param {string} token аутентификационный токен
   * @returns {API}
   */
  constructor(urlConfig) {
    this._jwt = null;
    this._serverURL = urlConfig.server;
    this._userInfoEndpoint = this._serverURL + urlConfig.userInfo;
    this._cardListEndpoint = this._serverURL + urlConfig.cardList;
    this._cardURL = urlConfig.card;
    this._cardLikeURL = urlConfig.like;
    this._avatarEndpoint = this._userInfoEndpoint + urlConfig.avatar;
    this._authServer = urlConfig.authServer;
    this._signupEndpoint = this._authServer + urlConfig.signup;
    this._signinEndpoint = this._authServer + urlConfig.signin;
    this._checkJWTEndpoint = this._authServer + urlConfig.checkpoint;
    this._authHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Приватный метод, создаёт заголовки для запроса
   *
   * @param {string} method  Метод отправки HTTP-запроса
   * @param {JSON} body      Тело запроса
   */
  _fetchOptions(method, body) {
    const reqHeaders = {
      Authorization: `Bearer ${this._jwt}`,
      'Content-Type': 'application/json',
    };
    if (!body) {
      return { method: `${method}`, headers: reqHeaders };
    }
    return { method: `${method}`, headers: reqHeaders, body };
  }

  /**
   * Приватный метод, создаёт заголовки для запросов авторизации и регистрации
   * @param {object} data           Объект с параметрами заголовков
   * @param {string}   data.method    Метод отправки HTTP-запроса
   * @param {string}   data.jwt       jwt-токен (при наличии)
   * @param {JSON}     data.body      Тело запроса
   */
  _authOptions(data) {
    const { method, jwt, body } = data;
    let header;

    if (jwt) {
      header = { ...this._authHeaders, Authorization: `Bearer ${jwt}` };
    } else {
      header = this._authHeaders;
    }
    if (!body) {
      return { method: `${method}`, headers: header };
    }
    return { method: `${method}`, headers: header, body };
  }

  /**
   * Приватный метод создания конечной точки запроса к конкретной карточке
   *
   * @param {string} cardID
   * returns {string}
   */
  _cardEndpoint(cardID) {
    return `${this._serverURL + this._cardURL}/${cardID}`;
  }

  /**
   * Приватный метод создания конечной точки запроса для постановки и снятия отметки "нравится"
   *
   * @param {string} cardID
   * returns {string}
   */
  _cardLikeEndpoint(cardID) {
    return `${this._serverURL + this._cardURL}/${cardID}/likes`;
  }

  async _goREST(endPoint, options) {
    const responsePromise = fetch(endPoint, options);

    const response = await responsePromise;
    return response.json();
  }

  setToken(token) {
    this._jwt = token;
  }

  testJWT(jwt) {
    const options = this._authOptions({ method: 'GET', jwt });
    return this._goREST(this._checkJWTEndpoint, options);
  }

  signup(email, password) {
    const options = this._authOptions({ method: 'POST', body: JSON.stringify({ email, password }) });
    return this._goREST(this._signupEndpoint, options);
  }

  signin(email, password) {
    const options = this._authOptions({ method: 'POST', body: JSON.stringify({ email, password }) });
    return this._goREST(this._signinEndpoint, options);
  }

  /**
   * Публичный метод получения данных профиля пользователя
   */
  getUser() {
    const endPoint = this._userInfoEndpoint;
    const options = this._fetchOptions('GET');
    return this._goREST(endPoint, options);
  }

  /**
   * Публичный метод отправки профиля пользователя на сервер
   *
   * @param {object} data  Объект с данными профиля пользователя
   * @param {string} data.userName имя пользователя
   * @param {string} data.userTitle описание пользователя
   * @returns {Promise}
   */
  setUser(data) {
    const endPoint = this._userInfoEndpoint;
    const options = this._fetchOptions(
      'PATCH',
      JSON.stringify(data),
    );
    return this._goREST(endPoint, options);
  }

  /**
   * Публичный метод отправки  аватара пользователя на сервер
   *
   * @param {object} data  Объект с данными профиля пользователя
   * @param {string} data.avatar ссылка на аватар пользователя
   * @returns {Promise}
   */
  setAvatar(data) {
    const { avatar } = data;
    const endPoint = this._avatarEndpoint;
    const options = this._fetchOptions('PATCH', JSON.stringify({ avatar }));
    return this._goREST(endPoint, options);
  }

  /**
   * Публичный метод отправки запроса на изменение отметки "нравится" на сервер
   *
   * @param {string} cardID  идентификатор карточки
   * @param {boolean} isLike ставим лайк или снимаем лайк?
   * @returns {Promise}
   */
  sendLikeToServer(cardID, isLike) {
    const endPoint = this._cardLikeEndpoint(cardID);
    return this._goREST(
      endPoint,
      isLike ? this._fetchOptions('PUT') : this._fetchOptions('DELETE'),
    );
  }

  /**
   * Публичный метод отправки запроса на удаление карточки на сервер
   *
   * @param {string} cardID идентификатор карточки
   * @returns {Promise}
   */
  deleteCard(cardID) {
    const endPoint = this._cardEndpoint(cardID);
    const options = this._fetchOptions('DELETE');
    return this._goREST(endPoint, options);
  }

  /**
   * @function Публичный метод отправки запроса на получение всех карточек
   * @returns {Promise} Промис с ответом сервера
   */
  getAllCards() {
    const endPoint = this._cardListEndpoint;
    const options = this._fetchOptions('GET');
    return this._goREST(endPoint, options);
  }

  /**
   * @function Публичный метод отправки новой карточки на сервер
   * @param {object} data  Объект с данными карточки
   * @param {string} data.name Название карточки
   * @param {string} data.link Адрес картинки
   * @returns {Promise} Промис с ответом сервера
   */
  setCard(data) {
    const endPoint = this._cardListEndpoint;
    const options = this._fetchOptions('POST', JSON.stringify(data));
    return this._goREST(endPoint, options);
  }
}

/**
 * Объект класса API - интерфейс проекта Mesto
 *
 * @constant {API}
 */
export const mestoAPI = new API(mestoREST, mestoToken);

export default mestoAPI;
