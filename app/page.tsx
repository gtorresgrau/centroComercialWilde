import Banner from './components/Banner/Banner';
import Locales from './components/Locales/Locales';
import Comentarios from './components/Comentarios/Comentarios';
import Newsletter from './components/Newsletter/Newsletter';

export default function Home() {
  return (
    <main>
      <Banner />
      <Locales />
      <Comentarios />
      <Newsletter />
    </main>
  )
}
