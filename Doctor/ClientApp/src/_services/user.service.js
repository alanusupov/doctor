
import { authHeader } from '../_helpers/auth-header';
import {  handleResponse } from '../_helpers/handle-response';
import { url } from '../url/url';

export const userService = {
    getAll
};

 function getAll() {
    const requestOptions =  { method: 'GET', headers: authHeader() };
    return fetch(`${url}/api/login`, requestOptions).then(handleResponse);
}