import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App(){
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}