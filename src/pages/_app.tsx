import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (    
      <Component {...pageProps} />   
  )
  
  
}

export default MyApp

// Aqui fica o conteudo que fica em volta da aplicação inteira
// que não tem mudança, e que fica fixo em todas as paginas