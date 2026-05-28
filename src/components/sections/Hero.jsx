import { heroChips, stats } from "../../constants/skills";
import { FadeIn } from "../common";
import { Chip, StatBlock } from "../ui";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <FadeIn>
          <div className="hero-tag">Frontend Developer</div>
        </FadeIn>
        <FadeIn>
          <h1 className="hero-name">
            Sana
            <br />
            <em>Nafari</em>
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="hero-title">Building web experiences that matter</p>
        </FadeIn>
        <FadeIn>
          <p className="hero-desc">
            A driven frontend developer with 3 years of experience shipping production React &amp; Next.js
            applications — from streaming platforms to Web3 social networks. I write clean, maintainable code and
            bring both technical depth and genuine communication skills to every project.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="hero-chips">
            {heroChips.map((chip) => (
              <Chip accent={chip.accent} key={chip.label}>
                {chip.label}
              </Chip>
            ))}
          </div>
        </FadeIn>
        <FadeIn>
          <div className="hero-actions">
            <a className="btn-primary" href="#projects">
              View my work
            </a>
            <a className="btn-ghost" href="mailto:sananafari2003@gmail.com">
              Get in touch
            </a>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="hero-stats">
            {stats.map((stat) => (
              <StatBlock key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;