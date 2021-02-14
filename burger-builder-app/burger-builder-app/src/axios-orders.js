import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilderreact-854d6-default-rtdb.firebaseio.com/'
});

export default instance;