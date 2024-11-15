'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';


const useGanadores = (ganadores) => {
  const [sorteoGanadores, setSorteoGanadores] = useState([]);

  const fetchGanadores = async () => {
    const res = await axios.get(`/api/sorteos/getChw?chw=${ganadores}`);
    const data = await res.data.sorteos
    setSorteoGanadores(data || [])
  };

  useEffect(() => {
    fetchGanadores();
  }, []);
  
  return {
    useGanadores
  };
};

export default useGanadores;
