import Inicio from "./Inicio.jsx"
import Estudios from "./Estudios"
import SoftSkills from "./SoftSkills"
import Proyectos from "./Proyectos"
import Idiomas from "./Idiomas"



export default function Main() {


    return(
        <main className="Main-Principal">
            <Inicio id="inicio"/>
            <Estudios id="estudios"/>
            <SoftSkills id="softskills"/>
            <Proyectos id="proyectos"/>
            <Idiomas id="idiomas"/>
        </main>
    )
}