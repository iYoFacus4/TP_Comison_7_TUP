import Header from "../components/Header"
import Main from "../components/main" 
import Footer from "../components/footer"

const HomePage = () => {
  return (
    
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh' 
    }}>
      
      <Header/>
      
      
      <main style={{
        flex: 1 
      }}>
        <Main/> 
      </main>
      
      <Footer/>
      
    </div>
  )
}

export default HomePage