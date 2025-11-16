function Header() {
  return (
    <header style={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '5vh 32vw', 
      backgroundColor: '#1a1a1a', 
      color: '#ffffff', 
      borderBottom: '1px solid #333', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)', 
      flexWrap: 'wrap', 
    }}>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        <img
          src="/Foto-agustin.jpg" 
          alt="Agustin Fortunato Monrroy"
          style={{
            width: '10vw', 
            height: '15vh',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #007bff', 
            boxShadow: '0 0 10px rgba(0,123,255,0.5)', 
          }}
        />
        <div>
          <h1 style={{
            fontSize: '2.2rem', 
            margin: '0',
            fontWeight: '700',
            letterSpacing: '1px',
            color: '#e0e0e0', 
          }}>
            AGUSTIN FORTUNATO MONRROY
          </h1>
          <p style={{
            color: '#999',
            marginTop: '5px',
            fontSize: '1.1rem',
            fontWeight: '300',
          }}>
            Desarrollador Web
          </p>
        </div>
      </div>
      
      <nav>
        <p style={{
          color: '#007bff', 
          fontSize: '1rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span role="img" aria-label="location">📍</span> 
          Tucumán, Argentina
        </p>
      </nav>
    </header>
  );
}
export default Header