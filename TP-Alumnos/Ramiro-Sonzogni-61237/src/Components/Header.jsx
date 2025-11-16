function Header() {
  return (
    <header style={{ 
      padding: '30px 60px', 
      width: '100vw',
      margin: '0',
      boxSizing: 'border-box',
      backgroundColor: '#1a1a1a',
      borderBottom: '1px solid #333',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        marginBottom: '20px'  
      }}>
        <img 
          src="/Foto-Ramiro.jpg" 
          alt="Ramiro Sonzogni" 
          style={{ 
            width: '120px', 
            height: '180px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 5%',
            border: '3px solid #444',
            boxShadow: '0 3px 10px rgba(0,0,0,0.4)'
          }} 
        />
        <div>
          <h1 style={{ 
            fontSize: '2rem', 
            margin: '0',
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            RAMIRO SONZOGNI
          </h1>
          <p style={{ 
            color: '#999', 
            marginTop: '5px', 
            fontSize: '1rem',
            fontWeight: '300'
          }}>
            Desarrollador Full Stack
          </p>
          <p style={{ 
            color: '#666', 
            marginTop: '3px', 
            fontSize: '0.9rem' 
          }}>
            📍 Tucumán, Argentina
          </p>
        </div>
      </div>

      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        borderTop: '1px solid #333',  
        paddingTop: '15px'  
      }}>
        <a href="#estudios" style={{
          color: '#999',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '8px 15px',
        }}>
          Estudios
        </a>
        <a href="#idiomas" style={{
          color: '#999',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '8px 15px',
        }}>
          Idiomas
        </a>
        <a href="#proyectos" style={{
          color: '#999',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '8px 15px',
        }}>
          Proyectos
        </a>
        <a href="#softSkills" style={{
          color: '#999',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '8px 15px',
        }}>
          SoftSkills
        </a>
        <a href="#experiencias" style={{
          color: '#999',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '8px 15px',
        }}>
          Experiencia
        </a>
        <a href="#certificados" style={{
          color: '#999',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '8px 15px',
        }}>
          Certificados
        </a>
      </nav>
    </header>
  );
}

export default Header;