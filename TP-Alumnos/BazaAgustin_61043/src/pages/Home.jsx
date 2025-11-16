import '../styles/Home.css';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="home-container">
      <div className="liquid-grass-effect" />
      <div className="content-wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
