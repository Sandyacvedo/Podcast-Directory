import React, { useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import API from '../api/API_PODCAST';
import axios from 'axios';
import cryptoJs from 'crypto-js';
import qs from 'qs';

const handleSubmit = (e) => {
    e.preventDefault();

    // const apiKey = "ZJAET9JKDLADD9YSR9FZ";
    // const apiSecret = "9Vj79B3H^$pBhkqGqYBtscUF5gF2n^S9996Y2$Zu";

    // const apiHeaderTime = Math.floor(Date.now() / 1000);

    // const authString = apiKey + apiSecret + apiHeaderTime.toString()
    // const hash = cryptoJs.SHA1(authString);
    
    // // console.log('has -->\n\n', hash.toString());
    
    // const config = {
    //     headers: {
    //         "User-Agent": "podcastDirectory/1.0",
    //         "X-Auth-Key": apiKey,
    //         "X-Auth-Date": apiHeaderTime,
    //         Authorization: hash.toString(),
    //     },
    // };

    // console.log('headers --> \n\n\n', headers);
    API.get('/search/byterm?q=bastiat')
        .then(res => {
            console.log('response -->', res.data);
        })
        .catch(err => {
            console.log('error -->', err);
        })
        
}

const Home = () => {
  return (
    <Container>
        <Typography>Podcast Directory</Typography>
        <form onSubmit={handleSubmit}>
            <Button type='submit' variant='outlined'>Buscar</Button>
        </form>
       
    </Container>
  )
}

export default Home