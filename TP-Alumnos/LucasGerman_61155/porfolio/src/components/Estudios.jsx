import "../styles/Estudios.css"


export default function Estudios({id}) {


    const misEstudios = [
        {
            id: 1,
            institucion: "Universidad Tecnológica Nacional - Facultad Regional Tucumán",
            ensenio: {
                titulo1: "Técnicatura Universitaria en Programación (2024 - Actualidad) ",
                titulo2: "Curso de Diseño Gráfico con CorelDraw (2021)",
            }
        },
        {
            id: 2,
            institucion: "Instituto San Miguel",
            ensenio: {
                titulo1: "Bachiller en Ciencias Naturales (2014 - 2019)",
                titulo2: "Curso de Microsoft Office - Nivel Avanzado (2017)",
            }
        },
        {
            id: 3,
            institucion: "Aticana - Academia de Idiomas",
            ensenio: {
                titulo1: "Curso de Inglés - Nivel alcanzado B1+ (2022 - 2024)",
                titulo2: "Curso de ingles avanzado (2025 - Actualidad)",
            }
        }
    ]








    return(
        <section id={id} className="seccion-educacion">
            <h2 className="h2-educacion">Mi Educacion</h2>

            <div className="div-educacion">
                {misEstudios.map( (estudio) => (
                    <article className="article-educacion">
                        <h3>{estudio.institucion}</h3>

                        <ul>
                            <li>{estudio.ensenio.titulo1}</li>
                            <li>{estudio.ensenio.titulo2}</li>
                        </ul>
                    </article>))}
            </div>
        </section>
    )
}