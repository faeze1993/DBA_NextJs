import '../styles/dashboard.css'
import '../styles/globals.css'
import '../styles/mediastyle.css'
import '../styles/tinyprism/prism.css'
import Script from 'next/script'
import { ThemeProvider } from "react-bootstrap"
import { Provider } from "react-redux";
import { store } from "../store";
import { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
// @ts-ignore
import { ThroughProvider } from "react-through"
export default function App({ Component, pageProps }) {

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    import('bootstrap/dist/css/bootstrap.rtl.min.css')
    import('bootstrap/dist/js/bootstrap.min.js')

  }, []);



  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <MainLayout>{page}</MainLayout>;
    };


  return (
    <>
      <Script src="/assets/js/jquery.min.js"></Script>
      <Script src="/assets/tinymce/tinymce.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></Script>
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
        integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
        crossorigin="anonymous"></Script>

      {domLoaded &&
        <Provider store={store}>
          <ThemeProvider dir="rtl">
            <ThroughProvider>
              {renderWithLayout(<Component {...pageProps} />)}
            </ThroughProvider>
          </ThemeProvider>
        </Provider>}
    </>
  )

}
