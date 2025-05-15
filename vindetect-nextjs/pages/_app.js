import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', 'G-33YH30VN04', { page_path: url })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-33YH30VN04"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: \`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-33YH30VN04');
        \`,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
