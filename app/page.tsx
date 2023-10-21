import Banner from './components/Banner/Banner';
import Carrusel from './components/Carrusel/Carrusel';
import Locales from './components/Locales/Locales';
import Comentarios from './components/Comentarios/Comentarios';
import Newsletter from './components/Newsletter/Newsletter';

export default function Home() {
  return (
    <main>
      <Banner />
      <Carrusel />
      <Locales />
      <Comentarios />
      <Newsletter />
    </main>
  )
}
