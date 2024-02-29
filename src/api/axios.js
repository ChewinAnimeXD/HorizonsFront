import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backend-horizons.vercel.app/api',
    withCredentials: true
})

export default instance

//https://backend-horizons.vercel.app/api

//http://localhost:4000/api