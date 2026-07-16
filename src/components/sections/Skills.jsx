import { skillCategories, techOrbit, web3Tags } from "../../constants/skills";
import { BallCanvas } from "../canvas";
import { FadeIn, SectionEyebrow } from "../common";
import { SkillCategory } from "../ui";

const Skills = () => {
  return (
    <section id="skills" className="section-wrap">
      <FadeIn>
        <SectionEyebrow>Technical Skills</SectionEyebrow>
      </FadeIn>
      <FadeIn>
        <h2 className="section-title">
          Crafted with the <em>right tools</em>
        </h2>
      </FadeIn>
      <FadeIn>
        <div className="tech-orbit">
          {techOrbit.map((tech) => (
            <div className="tech-orbit__item" key={tech.name}>
              <BallCanvas color={tech.color} icon={tech.icon} />
              <span className="tech-orbit__label">{tech.name}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <SkillCategory key={category.label} label={category.label} items={category.items} />
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="web3-section">
          <SectionEyebrow>Web3 Specialisation</SectionEyebrow>
          <h3 className="web3-heading">
            Decentralised frontends &amp; <em>wallet integrations</em>
          </h3>
          <p className="web3-copy">
            Experience building Web3-enabled UIs with WalletConnect authentication, real-time blockchain data feeds,
            and island architecture patterns for high-performance dApps.
          </p>
          <div className="web3-tags">
            {web3Tags.map((tag) => (
              <span className="w3-tag" key={tag}>
                <span className="dot" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Skills;