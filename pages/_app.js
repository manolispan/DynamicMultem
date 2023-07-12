import '../styles/globals.css';
import {UserContextProvider} from '../stores/LoginStore';
import Head from 'next/head';
import Navbar from '../components/layout/navbar';

// import {socket,SocketContext} from '../socketstore/socket';

/* import * as gtag from "../lib/ga";
import {useRouter} from 'next/router';
import { useEffect } from 'react';
 */



function MyApp({ Component, pageProps }) {
 


 
  return (<>{/* <SocketContext.Provider  value={socket}> */}
  <UserContextProvider>
  <Head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Navbar/>
  <Component {...pageProps}/>
   </UserContextProvider>{/* </SocketContext.Provider> */}
  </>)
}

export default MyApp
