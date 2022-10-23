import Document, { Html, Head, Main, NextScript } from "next/document";


class MyDocument extends Document {
  render() {
    return (
      <Html lang="el">
        <Head>
{/* Global Site Tag (gtag.js) - Google Analytics */}
{/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-HBTTKZ3Y37`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HBTTKZ3Y37', {
              page_path: window.location.pathname,
            });
          `,
            }}
          /> */}


        <link rel="stylesheet" href="index.css"/>
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Love+Light&display=swap" rel="stylesheet"/>
    
    <link rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
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
