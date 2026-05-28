import { experienceItems } from "../../constants/experience";
import { FadeIn, SectionEyebrow } from "../common";

const Experience = () => {
  return (
    <section id="experience" className="section-wrap">
      <FadeIn>
        <SectionEyebrow>Work Experience</SectionEyebrow>
      </FadeIn>
      <FadeIn>
        <h2 className="section-title">
          Where I've <em>built things</em>
        </h2>
      </FadeIn>
      <div className="experience-list">
        {experienceItems.map((experience) => (
          <FadeIn key={`${experience.company}-${experience.date}`}>
            <div className="exp-item">
              <div className="exp-meta">
                <div className="exp-date">{experience.date}</div>
                <div className="exp-company">{experience.company}</div>
                <div className="exp-type">{experience.type}</div>
              </div>
              <div>
                <div className="exp-role">{experience.role}</div>
                <ul className="exp-bullets">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default Experience;