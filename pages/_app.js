import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="container flex-1 py-10">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
