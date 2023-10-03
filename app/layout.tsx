import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';
import ButtonWsp from './Components//Whatsapp/ButtonWsp';

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
        <ButtonWsp />
      </body>
    </html>
  )
}
