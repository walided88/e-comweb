import React from 'react';
import '../css/Footer.css'; // Import the CSS file for styling

const Footer = () => {
const imgs=[
    require('../images/github.png'),
    require('../images/f.png'),
    require('../images/insta.png'),
    require('../images/linkdin.png'),
     require('../images/x.png'),

]



    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <div className="footer-section">
                        <h3>About Us</h3>
                        <ul>
                            <li><a href="/about">Our Story</a></li>
                            <li><a href="/team">Our Team</a></li>
                            <li><a href="/careers">Careers</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/support">Support</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms-of-service">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-social">
                    <p className="footer-text">© 2024 Your Company. All rights reserved.</p>
                    <div className="social-media">
                        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={imgs[1]} alt="Facebook" />
                        </a>
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={imgs[4]} alt="Twitter" />
                        </a>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={imgs[3]} alt="LinkedIn" />
                        </a>
                        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={imgs[2]} alt="Instagram" />
                        </a>
                        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <img src={imgs[0]} alt="GitHub" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;