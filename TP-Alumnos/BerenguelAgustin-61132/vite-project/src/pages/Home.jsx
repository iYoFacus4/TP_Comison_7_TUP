import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Estudios from '../components/Estudios';
import Proyectos from '../components/Proyectos';
import Softskills from '../components/Softskills';
import Certificados from '../components/Certificados';
import Idiomas from '../components/Idiomas';
import Experiencia  from '../components/Experiencia';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header/>
      <Main/>
      <Estudios/>
      <Proyectos/>
      <Softskills/>
      <Experiencia/>
      <Certificados/>
      <Idiomas/>
      <Footer/>
    </>
  );
};
export default Home;