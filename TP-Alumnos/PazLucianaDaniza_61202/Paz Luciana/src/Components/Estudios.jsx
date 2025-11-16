// src/Components/Estudios.jsx
// Componente encargado de mostrar la lista de Estudios o Cursos.

// Importamos el array 'estudios' desde el archivo de datos unificado.
import { estudios } from '../Data/EstudiosData'; 

const Estudios = () => {
    return (
        <section id="estudios">
            <h2>🎓 Formación Académica</h2>
            <div className="lista-estudios">
                {/* Usamos .map() para generar la lista dinámicamente */}
                {estudios.map((item) => ( // ⬅️ CORRECCIÓN CLAVE: usamos 'item' como variable de iteración
                    <div key={item.id} className="item-estudio">
                        {/* Aseguramos que las variables internas (item.titulo) coincidan con el Data. */}
                        <h3>{item.titulo}</h3>
                        <p>Institución: {item.institucion}</p>
                        <small>Período: {item.periodo}</small>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Estudios;