import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

// Mi información académica
const dataEstudios = [
  { 
    id: 1, 
    titulo: "Estudios Primarios", 
    institucion: "Escuela Primaria Bartolomé Mitre", 
    anio: "2002 - 2008",
    descripcion: ""
  },
  { 
    id: 2, 
    titulo: "Estudios Secundarios", 
    institucion: "Instituto Gral José de San Martín F-49", 
    anio: "2009 - 2014",
    descripcion: ""
  },
  { 
    id: 3, 
    titulo: "Técnico en Comunicación Social", 
    institucion: "Instituto San Miguel", 
    anio: "2016 - 2019",
    descripcion: ""
  },
  { 
    id: 4, 
    titulo: "Tecnicatura Universitaria en Programación", 
    institucion: "Universidad Tecnológica Nacional - Facultad Regional Tucumán", 
    anio: "2024 - Actual",
    descripcion: ""
  },
];

// Certificados que tengo
const dataCertificados = [
  {
    id: 1,
    nombre: "Desarrollo Full Stack",
    emisor: "Rolling Code",
    fecha: "2020",
    url: "#"
  },
  {
    id: 2,
    nombre: "Inglés Express - Nivel 1, 2, 3 y 4",
    emisor: "Inglés Express",
    fecha: "2020 - 2022",
    url: "#"
  },
];

// Idiomas que hablo
const dataIdiomas = [
  {
    id: 1,
    nombre: "Español",
    nivel: 100,
    nivelTexto: "Nativo"
  },
  {
    id: 2,
    nombre: "Inglés",
    nivel: 60,
    nivelTexto: "Intermedio"
  },
];

function Home() {
  // Esta es la página principal que contiene todo el portfolio
  return (
    <div className="portfolio-wrapper">
      <Header />
      
      {/* Le paso todos mis datos al componente Main */}
      <Main 
        nombre="Nicolás"
        apellido="Moya"
        dataEstudios={dataEstudios} 
        dataCertificados={dataCertificados}
        dataIdiomas={dataIdiomas}
      />
      <Footer />
    </div>
  );
}
export default Home;