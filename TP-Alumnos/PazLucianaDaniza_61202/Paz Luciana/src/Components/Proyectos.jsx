// src/Components/Proyectos.jsx
// Componente encargado de mostrar la lista de Proyectos.

// 1. Importamos el array 'proyectos' desde el archivo de datos unificado.
import { proyectos } from '../Data/EstudiosData';

const Proyectos = () => {
    return (
        // ¡IMPORTANTE! Este ID es el destino del enlace "#proyectos" en Main.jsx
        <section id="proyectos"> 
            <h2>💻 Proyectos Realizados</h2>
            
            <div className="lista-proyectos">
                {/* Usamos .map() para iterar sobre la lista de 'proyectos' */}
                {proyectos.map((proyecto) => (
                    <div key={proyecto.id} className="item-proyecto">
                        <h3>{proyecto.nombre}</h3>
                        <p><strong>Tecnologías:</strong> {proyecto.tecnologias}</p>
                        <p>{proyecto.descripcion}</p>
                        {/* Puedes añadir un botón para el link del repositorio si lo tienes */}
                    </div>
                ))}
            </div>
            
        </section>
    );
};

export default Proyectos;