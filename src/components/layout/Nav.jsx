const navLinks = [
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const Nav = () => {
  return (
    <nav className="portfolio-nav">
      <span className="nav-logo">SN.</span>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`}>{link.title}</a>
          </li>
        ))}
      </ul>
      <a className="nav-cta" href="mailto:sananafari2003@gmail.com">
        Hire me
      </a>
    </nav>
  );
};

export default Nav;