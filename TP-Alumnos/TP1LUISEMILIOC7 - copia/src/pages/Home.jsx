import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { profile } from '../data/data'

const Home = () => {
  return (
    <div className="container">
      <section className="card">
        <Header
          name={profile.name}
          bio={profile.bio}
          photo={profile.photo}
          country={profile.country}
        />
        <Main />
        <Footer github={profile.github} linkedin={profile.linkedin} />
      </section>
    </div>
  )
}

export default Home
