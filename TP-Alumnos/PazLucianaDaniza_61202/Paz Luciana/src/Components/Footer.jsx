// src/components/Footer.jsx

const Footer = () => {
    const githubUrl = "https://github.com/LuPaz-GH";
    const repoUrl = "https://github.com/LuPaz-GH/TP_Comison_7_TUP"; 

    return (
        <footer className="portfolio-footer">
            <div className="footer-links">
                
                {/* Enlace a GitHub */}
                <a 
                    href={githubUrl} // ⬅️ Deja solo la variable sin comillas.
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Perfil de GitHub"
                >
                    GitHub
                </a>

                {/* Enlace al Repositorio del Proyecto */}
                <a 
                    href={repoUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Repositorio del TP en GitHub"
                >
                    Ver Repositorio
                </a>
            </div>
            
            <p className="footer-copyright">
                © {new Date().getFullYear()} Luciana Daniza Paz. Desarrollado con React y Vite.
            </p>
        </footer>
    );
};

export default Footer;