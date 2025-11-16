import "../styles/Header.css"


export default function Header() {
    return (
        <header className="Header-Principal">
            <h1 className="h1-Nombre">Lucas</h1>

            <nav className="Header-Nav">
                <ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#estudios">Educación</a></li>
                    <li><a href="#softskills">Habilidades</a></li>
                    <li><a href="#proyectos">Proyectos</a></li>
                    <li><a href="#idiomas">Idiomas</a></li>
                </ul>
            </nav>
        </header>
    )
}