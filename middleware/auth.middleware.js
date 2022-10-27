const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next(); //продолжение выполнения запроса
  }

  try {
    const token = req.headers.authorization.split(' ')[1] //Bearer TOKEN
    if(!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }
    const decoded = jwt.verify(token, config.get('jwtSecret')); //method can throw the error
    req.user = decoded;
    next(); //продолжение выполнения запроса

  } catch (e) {
    res.status(401).json({ message: 'Нет авторизации' });
  }

}