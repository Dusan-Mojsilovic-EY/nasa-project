import axios from 'axios';

export const dataGet = (url) => {
    return axios.get(url);
}

export const dataPost = (url, data) => {
    return axios.post(url, data);
}
