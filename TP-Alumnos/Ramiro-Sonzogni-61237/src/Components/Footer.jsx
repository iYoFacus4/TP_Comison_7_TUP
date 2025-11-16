function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      padding: '40px 60px',
      borderTop: '1px solid #333',
      textAlign: 'center',
    }}>
      


      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '10px',
          color: '#fff'
        }}>
          Mis Redes 
        </h3>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <a 
          href="https://github.com/RamiroS43" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#333',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.1rem',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
           GitHub
        </a>

        <a 
          href="https://wa.me/5493811111111" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#25D366',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.1rem',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
           WhatsApp
        </a>
      </div>
    </footer>
  );
}

export default Footer;