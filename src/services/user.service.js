import { config } from '../config';
import axios from 'axios'
import { post } from 'axios';

export const userService = {
    GetData
};

function GetData(url) {
    return axios.get(`${config.apiUrl}${url}`)
        .then(res => res.data)
        .then(a => {
            return a;
        });
}






