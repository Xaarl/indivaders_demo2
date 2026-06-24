import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export function GlobalNavbar() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      setMobileMenuOpen(false);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { label: "Strona Główna", hash: "" },
    { label: "Przykładowy Raport", hash: "#client-report/refractured" },
  ];

  const isActive = (hash) => {
    if (hash === "") {
      return currentHash === "" || currentHash === "#";
    }
    return currentHash.startsWith(hash);
  };

  return (
    <header className="global-navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          <strong>INDIEVADERS</strong>
          <span>STEAM POSITIONING</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar-links" aria-label="Main menu">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={link.hash ? link.hash : "#"}
              className={`navbar-link ${isActive(link.hash) ? "is-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <a href="#order-report" className="navbar-cta-button">
            Zamów raport
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav className="navbar-mobile-drawer" aria-label="Mobile menu">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={link.hash ? link.hash : "#"}
              className={`navbar-mobile-link ${isActive(link.hash) ? "is-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <a href="#order-report" className="navbar-mobile-cta">
            Zamów raport
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}

export default GlobalNavbar;
