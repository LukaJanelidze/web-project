import { Link } from "react-router-dom";
import "./ForFooter.css";

interface ForFooterProps {
  navigation: string;
  links: { name: string; path: string }[]; // Links now have a name and path
  id: number;
  chosenSection: number | null;
  setChosenSection: (id: number | null) => void;
  isMobile: boolean;
}

const ForFooter: React.FC<ForFooterProps> = ({ navigation, links, id, chosenSection, setChosenSection }) => {
  const toggleDropdown = (id: number) => {
    setChosenSection(chosenSection === id ? null : id);
  };

  // Scroll to top when clicking a link
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer-sections-container">
      <div className="footer-sections-title-section" onClick={() => toggleDropdown(id)}>
        <p className="footer-sections-text-sections">{navigation}</p>
        <span className={`arrow ${chosenSection === id ? "open" : ""}`}></span>
      </div>

      {chosenSection === id && (
        <div className="footer-dropdown">
          {links.map((link, index) => (
            <Link key={index} to={link.path} className="footer-link" onClick={handleClick}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForFooter;
