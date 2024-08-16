/* eslint-disable @next/next/no-img-element */"use client";
import { useEffect, useState } from 'react';
import RedesSociales from '../../components/Socials/RedesSociales';
import Loading from '../../components/Loading/Loading';
import ShareIcon from '@mui/icons-material/Share';
import PageCardSkeleton from '../../components/CardSkeleton/PageCardSkeleton'; // Import the skeleton

export default function LocalPage({ params }) {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [localData, setLocalData] = useState(null);

  const fetchLocal = async () => {
    try {
      const res = await fetch(`/api/locales/${params.n_local}`);
      console.log('res:', res);
      
      if (!res.ok) {
        throw new Error('Error al cargar el local');
      }
      const data = await res.json();
      return data.localEncontrado;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadLocal = async () => {
      try {
        const data = await fetchLocal();
        setLocalData(data);
      } catch (error) {
        console.error('Error al cargar local:', error);
      }
    };
    loadLocal();
  }, [params.n_local]);

  if (!localData) {
    return <PageCardSkeleton />; // Use skeleton while loading
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
      // Provide fallback or alternative sharing options here
    }
  };

  return (
    <section className='w-full items-center text-center m-h-[450px]' style={{ textAlign: '-webkit-center' }}>
      <div className="p-6 bg-white mb-64 max-w-3xl items-center text-center self-center">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/2">
            {imageLoaded && <Loading />}
            <div className="rounded-xl shadow-lg w-full">
              <img
                src={fotoLocal}
                alt={local}
                className="rounded-xl shadow-lg object-cover"
                style={{ maxHeight: "350px", width: "100%" }}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <h1 className="text-2xl font-semibold mb-4">{local.toUpperCase()}</h1>
            <div className="text-center md:text-left">
              {fraseUsuario ? (
                <p className="text-gray-500 mb-4">{fraseUsuario}</p>
              ) : (
                <p className="text-gray-500 mb-4">
                  El local {local} está ubicado {sector}, en el local número {n_local}. El horario de atención es de {horarios} hs. {frase}
                </p>
              )}
            </div>
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
                web={web}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
