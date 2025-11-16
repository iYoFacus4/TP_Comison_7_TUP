import React from 'react';

function Header() 
{
    const nombre = "Luciano Varela Merce";
    
    return (
        <header className = "header">

            <img src = "/miFoto.jpg" 
            alt = "Foto Personal"
            className = "foto-perfil" />
            <h1>{nombre}</h1>
            
        </header>
    );
}

export default Header;
