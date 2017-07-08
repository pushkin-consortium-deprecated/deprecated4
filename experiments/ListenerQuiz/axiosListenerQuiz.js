import Axios from 'axios';

const axiosListenerQuiz = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api/ListenerQuiz' : '//localhost/api/ListenerQuiz',
});

module.exports = axiosListenerQuiz;
