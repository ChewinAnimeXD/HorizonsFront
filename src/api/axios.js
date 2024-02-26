import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-horizons.vercel.app/api',
    withCredentials: true
})

export default instance

//http://localhost:4000/api

//https://backend-horizons.vercel.app/api