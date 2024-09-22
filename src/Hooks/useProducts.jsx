'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';


const useProducts = (chw) => {
  const [userSorteo, setUserSorteo] = useState([]);

  const fetchSorteos = async () => {
    const res = await axios.get(`/api/sorteos/getChw?chw=${chw}`);
    const data = await res.data.sorteos
    setUserSorteo(data || [])
  };

  useEffect(() => {
    fetchSorteos();
  }, []);
  
  return {
    userSorteo
  };
};

export default useProducts;
