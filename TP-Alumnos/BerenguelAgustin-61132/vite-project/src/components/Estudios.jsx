import React from "react";
import '../Style/Estudios.css';

const Estudios = () => {
        return(
          <section id="estudios">
            <h1 className="titulo">Mis Estudios</h1>
          <div className="Tarjetas">
            <div className="tarjeta">
                <h1>Colegio Giouse Carducci</h1>
                <p>Me forme durante la mayoria de mi tiempo como estudiante desde jardin <br/>
                hasta 4°Año de la secundaria
                </p>
            </div>
            <div className="tarjeta">
                <h1>Colegio Tulio Garcia Fernandez</h1>
                <p>Estuve los ultimos dos años de secundaria. Colegio del cual pude <br/>
                egresarme a mis 17 años.</p>
            </div>
            <div className="tarjeta">
                <h1>T.U.P</h1>
                <p>Actualmente cursandola en la Universidad Tecnologica Nacional              
                Facultad Regional de Tucuman. Me quedan dos meses de carrera para obtener mi
                certificado</p>
            </div>
          </div>
          </section>
        )
    }

export default Estudios;