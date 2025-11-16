import React from "react";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import "../styles/Home/home.css";
const Home = () => {
  return (
    <>
      <main className="home-container">
        <Header />
        <Main />
        <Footer />
      </main>
    </>
  );
};

export default Home;
