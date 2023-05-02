import { useState , useEffect } from "react";
import axios from 'axios';

const useFetch =() => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const axios = require("axios");

useEffect(() => {
const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://shazam.p.rapidapi.com/charts/track', {
        headers: {
          'x-rapidapi-host': 'shazam.p.rapidapi.com',
          // 'x-rapidapi-key': '4c281832ccmsh01bafa44beb87fap18e2c5jsn1b8f0b733086'
        }
      });
      const cutloss = await response.json();
      setData(cutloss.tracks);
      setIsLoading(false);
    } catch (error) {
        setError(error);
        alert('There is an error');
    }finally {
        setIsLoading(false);
    }
}
 fetchData();
}, []);

    const refetch = ()=>{
        setIsLoading(true);
        fetchData();
    }
    return {data, isLoading, error, refetch};
}
export default useFetch;


