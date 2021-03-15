import Layout from '../components/Layout'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (    
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />   
      </Layout>

    </AuthProvider>


    
  )  
  
}

export default MyApp

// Aqui fica o conteudo que fica em volta da aplicação inteira
// que não tem mudança, e que fica fixo em todas as paginas