import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {
  return(
    <footer className="bg-body-tertiary footer fixed-bottom">
      <div className="container my-3 text-center">
        <a href="https://github.com/JWS93" className="px-3"><FontAwesomeIcon icon={faGithub} className="social-icon" /></a>
        <a href="https://www.linkedin.com/in/justin-scott-6690b42b6" className="px-3"><FontAwesomeIcon icon={faLinkedin} className="social-icon" /></a>
      </div>
    </footer>  
  )
}