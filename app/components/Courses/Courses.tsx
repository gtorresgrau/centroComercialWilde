"use client"
import React, { useState } from 'react';
import local from '../../Constants/locales.json'
import s from '../../styles/locales.module.css'




const rubros = local.map((r) => r.rubro); //traigo todos los rubros del json
const uniqueRubros = Array.from(new Set(rubros)); // filtro todos los rubros y lo convierto en array
const Local = () => {
  const [filter, setFilter] = useState('Bazar'); 
  const [data, setData] = useState(
    local
    // Agrega más datos aquí
  );
 console.log ('local',local)
  const handleFilterChange = (rubro:any) => {
    setFilter(rubro);
  };

  const filteredData = data.filter((item:any) =>
   item.rubro === filter
  );

  return (
    <div>
      <div>
        {uniqueRubros.map((rubro)=> <button key={rubro}  onClick={() => handleFilterChange(`${rubro}`)}>{rubro}</button>)}
        
        {/* Agrega más botones según tus categorías */}
      </div>

        
      <ul>
        {filteredData.map((item:any) => 
        <React.Fragment key={item.email}>
           <ul className={s.cardWrapper}>
                <li className={s.card}>
                    <img className={s.img} src="https://media.istockphoto.com/id/1367357589/es/foto/cielo-rojo-en-forma-de-coraz%C3%B3n-al-atardecer-hermoso-paisaje-con-flores-me-encanta-el-fondo-con.jpg?s=612x612&w=0&k=20&c=A2u-PoF7LGHvwhjf3_CRziNxK-Zh8tiRFjl7i7M2Gv4=" alt="asdasd"/>
                    <h3>{item.celular}</h3>
                </li>
            </ul>
        </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Local;




