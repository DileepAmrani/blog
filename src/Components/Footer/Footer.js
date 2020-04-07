import React from "react";
import { TiSocialFacebookCircular, TiSocialLinkedinCircular, TiSocialTwitter } from "react-icons/ti";
import "./Footer.css";
import Logo from "./../../Images/quill.png"
class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer-distributed">
          <div className="footer-left">
            <h3>
            <img src={Logo} width='100px' alt='Logo'/>
            </h3>

            <p className="footer-links">
              <a href="/" class="link-1">
                Home
              </a>

              <a href="/">Blog</a>

              <a href="/">About</a>

              <a href="/">Faq</a>

              <a href="/">Contact</a>
            </p>

            <p className="footer-company-name">Company Name © 2015</p>
          </div>

          <div className="footer-center">
            <div>
              <i className="fa fa-map-marker"></i>
              <p>
                <span>444 S. Cedros Ave</span> Solana Beach, California
              </p>
            </div>

            <div>
              <i className="fa fa-phone"></i>
              <p>+1.555.555.5555</p>
            </div>

            <div>
              <i className="fa fa-envelope"></i>
              <p>
                <a href="mailto:support@company.com">support@company.com</a>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-company-about">
              <span>About the company</span>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
              euismod convallis velit, eu auctor lacus vehicula sit amet.
            </p>

            <div className="footer-icons">
              <a href="/">
                <TiSocialFacebookCircular  size={35} />
              </a>
              <a href="/">
                <TiSocialTwitter  size={35} />
              </a>
              <a href="/">
                <TiSocialLinkedinCircular  size={35} />
              </a>
         
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
