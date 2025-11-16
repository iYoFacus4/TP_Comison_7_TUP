// src/Pages/Home.jsx
import React, { useState } from 'react';
import Header from '../Components/Header';
import Main from '../Components/Main';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import '../Styles/App.css';

const Home = () => {
    // Estado para controlar qué sección está activa (por defecto, 'bio')
    const [seccionActiva, setSeccionActiva] = useState('bio');
    // Estado para controlar la visibilidad del sub-menú (los tres botones)
    const [mostrarSubMenu, setMostrarSubMenu] = useState(false);

    // Función genérica para cambiar la sección activa
    const cambiarSeccion = (id) => {
        setSeccionActiva(id);
        
        // Oculta el sub-menú si estaba visible después de hacer clic
        if (mostrarSubMenu) {
            setMostrarSubMenu(false);
        }
        
        // Forzamos el scroll hacia el área de contenido principal (Main)
        // si la sección activa NO es 'bio' (para no arruinar la portada)
        if (id = 'bio') {
             const mainContent = document.querySelector('.main-content');
             if (mainContent) {
                 mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
        }
    };
    
    // Función para manejar el click en el botón del Header (muestra/oculta el sub-menú)
    const handleExplorarClick = () => {
        setMostrarSubMenu(prev => !prev);
    };

    // Función para manejar el click en los enlaces del sub-menú (Presentación, Estudios, Proyectos)
    const handleSubMenuClick = (e, targetId) => {
        e.preventDefault();
        // Cambia la sección activa y dispara el scroll
        cambiarSeccion(targetId); 
    };

    return (
        <div className="portfolio-container">
            {/* 1. Navbar usa cambiarSeccion */}
            <Navbar onCambiarSeccion={cambiarSeccion} /> 
            
            {/* 2. Header recibe las funciones de manejo de sub-menú */}
            <Header 
                mostrarSubMenu={mostrarSubMenu} 
                toggleSubMenu={handleExplorarClick} 
                onSubMenuClick={handleSubMenuClick} 
            />
            
            {/* 3. Main renderiza selectivamente la sección activa */}
            <Main seccionActiva={seccionActiva} /> 
            
            <Footer />
        </div>
    );
};

export default Home;