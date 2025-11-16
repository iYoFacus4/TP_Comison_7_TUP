import React from 'react'
import foto from '../assets/foto.jpeg'

export const nombre = "Nahuel Osores"

const Header = () => {
  return (
    
    <div id="Header">
        <img src={foto} alt="foto personal" id="imgPersonal"/>
        <h1>{nombre}</h1>
    </div>
  )
}

export default Header