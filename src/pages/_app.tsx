import Layout from '../components/Layout'
import { AuthProvider } from '../contexts/AuthContext'
import { ControllerProvider } from '../contexts/ControllerContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (    
    <AuthProvider>
      <ControllerProvider>
        <Layout>
          <Component {...pageProps} />   
        </Layout>
      </ControllerProvider>
    </AuthProvider>


    
  )  
  
}

export default MyApp

// Aqui fica o conteudo que fica em volta da aplicação inteira
// que não tem mudança, e que fica fixo em todas as paginas