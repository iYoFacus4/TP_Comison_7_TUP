import "../styles/Inicio.css"


export default function Inicio({id}) {



    return(
        <section id={id} className="seccion-inicio  animate-on-load">

                    <div className="contenedor-texto">
                        
                   <h1 className="h1-inicio">Hola, soy <span className="nombre-color">Lucas</span> German Dávalos </h1>

                   <h2 className="h2-inicio">Desarrollador Back-End</h2>

                    <p className="p-inicio">
                        Soy una persona proactiva, con gran capacidad de aprendizaje, adaptación y trabajo en equipo.
                        Me apasiona la tecnología y disfruto desarrollar soluciones prácticas. Actualmente estudio
                        programación, lo que me permite aplicar mis conocimientos en proyectos reales.
                    </p>
                    </div>

                    <div className="contenedor-imagen">
                        <img src="https://avatars.githubusercontent.com/u/109121122?v=4" alt="Foto de Lucas German Dávalos" className="foto-lucas"/>
                    </div>
        </section>

    )
}