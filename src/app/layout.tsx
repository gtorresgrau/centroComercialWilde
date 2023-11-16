import './globals.css';
import Navbar from '../components/Navbar/index';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';
import "aos/dist/aos.css";

export const metadata = {
  title: 'Centro Comercial Wilde',
  description: 'Paseo de Compras Multimarca',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
        <Footer />
        <ButtonWsp text='ADMINISTRACION' contact={`1138498249`}/>
      </body>
    </html>
  )
}