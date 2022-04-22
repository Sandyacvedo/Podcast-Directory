import axios from 'axios';
import cryptoJs from 'crypto-js';

const apiKey = "ZJAET9JKDLADD9YSR9FZ";
const apiSecret = "9Vj79B3H^$pBhkqGqYBtscUF5gF2n^S9996Y2$Zu";

const apiHeaderTime = Math.floor(Date.now() / 1000).toString();

const authString = apiKey + apiSecret + apiHeaderTime.toString();
const hash = cryptoJs.SHA1(authString);

const instance = axios.create({
    baseURL : 'https://api.podcastindex.org/api/1.0',
    timeout : 10000,
    headers : {
        "User-Agent": "podcastDirectory/1.0",
        "X-Auth-Key": apiKey,
        "X-Auth-Date": apiHeaderTime,
        'Authorization': hash.toString(),

    }
})

const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call  
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/login';
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

instance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

 export default instance
