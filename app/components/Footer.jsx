// imports libraries(components)
import { footerLinks } from "../constants/index.js";

// creates and exports Footer component
const Footer = () => {
  return (
    <footer>
      <div className="info">
        {/* info section */}
        <p>
          More ways to shop: Find an Apple Store or other retailer near you. Or
          call 000800 040 1966.
        </p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>

      <hr />

      <div className="links">
        {/* copyright section */}
        <p>Copyright © 2024 Apple Inc. All rights reserved.</p>
        {/* footer links section */}
        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
