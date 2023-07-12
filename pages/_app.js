import '../styles/globals.css';
import {UserContextProvider} from '../stores/LoginStore';
import Head from 'next/head';




function MyApp({ Component, pageProps }) {
 


 
  return (<>{/* <SocketContext.Provider  value={socket}> */}
  <UserContextProvider>
  <Head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Component {...pageProps}/>
   </UserContextProvider>{/* </SocketContext.Provider> */}
  </>)
}

export default MyApp
