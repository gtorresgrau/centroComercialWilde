/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from 'react'
import RedesSociales from '../../components/Socials/RedesSociales'
import Loading from '../../components/Loading/Loading'
import ShareIcon from '@mui/icons-material/Share';

export default function LocalPage({ params }) {
    const [imageLoaded, setImageLoaded] = useState(true);
    const [localData, setLocalData] = useState(null);
  
    const fetchLocal = async () => {
      const res = await fetch(`/api/locales/${params.local}`);
      if (!res.ok) {
        throw new Error('Error al cargar el local');
      }
      const data = await res.json();
      return data.localEncontrado;
    };
  
    useEffect(() => {
      const loadLocal = async () => {
        try {
          const data = await fetchLocal();
          setLocalData(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      loadLocal();
    }, [params.local]);
  
    if (!localData) {
      return <Loading />;
    }
  
    const { local, email, ubicacion, horarios, n_local, rubro, rubroSecundario, instagram, facebook, celular, fotoLocal, texto, linea, web } = localData;
  
    const sector = ubicacion === 'Afuera' ? 'en la galería externa' : 'en ' + ubicacion;
    const frase = rubroSecundario === 'No tengo' ? null : 'Además de ' + rubro + ' también posee ' + rubroSecundario + '.';
    const fraseUsuario = texto || null;

    const handleImageLoad = () => {
      setImageLoaded(false);
    };
  
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `Detalles del local: ${local}`,
            text: `Visita el local ${local}, ubicado en ${ubicacion}. ${texto ? texto + ' ' : ''}${rubroSecundario ? `Además de ${rubro}, también posee ${rubroSecundario}.` : ''}`,
            url: window.location.href,
          });
        } catch (error) {
          console.error('Error al compartir:', error);
        }
      } else {
        console.error('La API de compartir no está soportada en este navegador.');
      }
    };
  
    return (
      <div className="p-6 bg-white ">
        <h2 className="text-2xl font-semibold mb-4">{local.toUpperCase()}</h2>
        {imageLoaded && <Loading />}
        <div className="rounded-xl shadow-lg w-full max-w-lg">
          <img
            src={fotoLocal}
            alt={local}
            className="rounded-xl shadow-lg object-cover"
            style={{ maxHeight: "350px", width: "100%" }}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </div>
        <div className="mt-4 text-center">
          {fraseUsuario ? (
            <p className="text-gray-500">{fraseUsuario}</p>
          ) : (
            <p className="text-gray-500">
              El local {local} está ubicado {sector}, en el local número{" "}
              {n_local}. El horario de atención es de {horarios} hs. {frase}
            </p>
          )}
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-center mt-6 space-x-4">
            <button
              className="bg-slate-300 text-black font-medium w-8 h-8 rounded-lg transition-transform transform hover:scale-110"
              onClick={handleShare}
            >
              <ShareIcon />
            </button>
            <RedesSociales
              instagram={instagram}
              facebook={facebook}
              contact={celular}
              linea={linea}
              email={email}
            />
          </div>
        </div>
        <button
          onClick={() => {
            const referrer = document.referrer;
            const sameOrigin =
              referrer && new URL(referrer).origin === window.location.origin;

            if (sameOrigin && window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "/#locales";
            }
          }}
          className="flex mb-4 bg-blue-500 text-white font-medium px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Ir a locales
        </button>
      </div>
    );
}
