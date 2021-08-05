import axios from "axios";

export const getData = (url) => {
    return axios.get(url);
};

export const postData = (url, data) => {
    return axios.post(url, data);
};
