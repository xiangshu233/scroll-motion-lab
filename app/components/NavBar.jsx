// imports libraries(components)
import { navLinks } from "../constants";

// creates and exports NavBar component
const NavBar = () => {
  return (
    <header>
      <nav>
        {/* Logo image */}
        <img src="/logo.svg" alt="Apple Logo" />
        {/* Navigation links items */}
        <ul>
          {navLinks.map(({ label }) => (
            <li key={label}>
              <a href={label}>{label}</a>
            </li>
          ))}
        </ul>
        {/* Search button icon */}
        <div className="flex-center gap-3">
          <button>
            <img src="/search.svg" alt="Search" />
          </button>
          {/* Cart button icon */}
          <button>
            <img src="/cart.svg" alt="Cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
