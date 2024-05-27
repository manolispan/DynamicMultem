import '../styles/globals.css';
import {UserContextProvider} from '../stores/LoginStore';
import Head from 'next/head';
import Navbar from '../components/layout/navbar';
import Footer from '../components/layout/footer';



function MyApp({ Component, pageProps }) {
 


 
  return (<>
  <UserContextProvider>
  <Head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  <Navbar/>
  <Component {...pageProps}/>
  <Footer/>
   </UserContextProvider>
  </>)
}

export default MyApp
