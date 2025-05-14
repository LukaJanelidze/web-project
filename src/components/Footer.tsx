import ForFooter from "./ForFooter";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Footer.css";

export default function Footer() {
  const [chosenSection, setChosenSection] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Define footer navigation with valid paths
  const footerNavigation = [
    {
      name: "ნავიგაცია",
      id: 1,
      links: [
        { name: "მთავარი", path: "/" },
        { name: "ჩვენს შესახებ", path: "/about" },
        { name: "სერვისები", path: "/services" },
        { name: "კონტაქტი", path: "/contact" },
      ],
    },
  ];

  const instagramLink = "https://www.instagram.com/yourusername";
  const facebookLink = "https://www.facebook.com/yourusername";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer>
      
      <div className="footer-top">
        <div className="footer-top-box">
          <h1 className="footer-top-title">საბითუმო</h1>
          <hr className="footer-top-line" />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links-container">

          <div className="footer-items-container">
          <div className="footer-links-container-button">
            {footerNavigation.map((item) => (
              <Fragment key={item.id}>
                <ForFooter
                  navigation={item.name}
                  links={item.links}
                  id={item.id}
                  chosenSection={chosenSection}
                  setChosenSection={setChosenSection}
                  isMobile={isMobile}
                />
              </Fragment>
            ))}
          </div>

            <hr className="footer-sections-lines" />
          </div>

            <div className="footer-items-container">
              <div className="footer-links-container-button">
                <Link to="/" className="footer-links">რამე</Link>
              </div>
             <hr className="footer-sections-lines" />
            </div>

            <div className="footer-items-container">
              <div className="footer-links-container-button">
                <Link to="/" className="footer-links">რამე</Link>
              </div>
             <hr className="footer-sections-lines" />
            </div>

        </div>

        <div className="social-buttons">
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-button instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href={facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="social-button facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>

      </div>

    </footer>
  );
}
