import React from 'react'

const Header = ({ name, bio, photo, country, age, legajo }) => (
  <header className="header">
    <img className="pfp" src={photo} alt={`Foto de ${name}`} />
    <div>
      <h1>{name}</h1>
      <p className="bio">{bio} · {country}</p>
      <p className="bio">Legajo: {legajo} · Edad: {age}</p>
    </div>
  </header>
)

export default Header
