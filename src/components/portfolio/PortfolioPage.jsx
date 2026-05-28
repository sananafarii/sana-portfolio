import { Footer, Nav } from "../layout";
import { Contact, Experience, Hero, Projects, Skills } from "../sections";

const PortfolioPage = () => {
  return (
    <div className="portfolio-shell">
      <div className="noise" />
      <div className="grid-bg" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <Nav />

      <main className="portfolio-main">
        <div className="divider" />
        <div className="divider" />
        <div className="divider" />
        <div className="divider" />

        <Hero />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;