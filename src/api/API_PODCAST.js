import axios from 'axios';
// import { SHA1 } from 'crypto-js';
const instance = axios.create({
    baseURL : process.env.REACT_APP_BASEUR,
    timeout : 10000,
    headers : {
        "User-Agent": "podcastDirectory/1.0",
        "X-Auth-Key": process.env.REACT_APP_INDEX_KEY || "",
        "X-Auth-Date": String(Date.UTC),
//         Authorization: SHA1(
//             process.env.REACT_APP_INDEX_KEY, process.env.REACT_APP_INDEX_SECRET, String(Date.UTC)
//         )
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
