import React from 'react'
import Logo from "../assets/github.png"
import { nombre } from './Header'

const Footer = () => {
  return (
    <div id="Footer">

        <a href="https://github.com/SilverShadow571" target="_blank" rel="noopener noreferrer">
        <img src= {Logo} alt="LogoGithub" id='imgLog'/>
        </a>


        <p><i>
            © 2025 - Desarrollado por {nombre}
        </i></p>

    </div>
  )
}

export default Footer