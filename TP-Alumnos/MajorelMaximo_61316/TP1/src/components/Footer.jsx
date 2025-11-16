import React from "react";
import "../styles/Footer/footer.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/maximajorel/",
      icon: <FaGithub />,
      username: "@maximajorel",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/maximo-majorel/",
      icon: <FaLinkedin />,
      username: "@maximo-majorel",
    },
  ];

  return (
    <>
      <footer className="footer-wrapper" id="contacto">
        <section className="footer-container">
          <div className="footer-content">
            <div className="footer-info">
              <h3 className="footer-title">Máximo Majorel</h3>
              <p className="footer-tagline">
                Full Stack Developer & Product Manager
              </p>
              <p className="footer-location">📍 Tucumán, Argentina</p>
            </div>
            <div className="footer-social">
              <h4 className="social-title">Conectemos</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <div className="icon-container">
                      {social.icon}
                      <div className="link-info">
                        <span className="link-name">{social.name}</span>
                        <span className="link-username">{social.username}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};
