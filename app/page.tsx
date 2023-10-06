import Banner from './components/Banner/Banner';
import Companies from './components/Companies/Companies';
import Locales from './components/Locales/Locales';
import Students from './components/Students/Students';
import Newsletter from './components/Newsletter/Newsletter';

export default function Home() {
  return (
    <main>
      <Banner />
      <Companies />
      <Locales />
      <Students />
      <Newsletter />
    </main>
  )
}
