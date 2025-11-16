function Footer() {
  return (
    <footer style={{
      padding: '25px 50px', 
      backgroundColor: '#1a1a1a', 
      color: '#999', 
      textAlign: 'center', 
      borderTop: '1px solid #333', 
      marginTop: 'auto', 
    }}>
      
      
      <div style={{
        marginBottom: '15px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px', 
      }}>
        <a 
          href="https://www.linkedin.com/in/agustin-monrroy-22337538b" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{
            color: '#007bff', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
          LinkedIn
        </a>
        
        <a 
          href="https://github.com/Agustin-Monrroy" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#007bff', 
            textDecoration: 'none', 
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
          GitHub
        </a>

       
      </div>
      
     
      <p style={{
        margin: '0', 
        fontSize: '0.9rem'
      }}>
        © {new Date().getFullYear()} Agustin Fortunato Monrroy. Todos los derechos reservados.
      </p>

    </footer>
  );
}

export default Footer;