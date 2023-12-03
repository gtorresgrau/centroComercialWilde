import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        <title>Centro Comercial Wilde</title>
        <meta name='description' content='Paseo de Compras Multimarca' />
        <link rel="preload" href='/favicon.ico' as="image"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;