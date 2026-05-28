import { contacts } from "../../constants/experience";
import { FadeIn, SectionEyebrow } from "../common";

const Contact = () => {
  return (
    <section id="contact" className="section-wrap">
      <FadeIn>
        <SectionEyebrow>Contact</SectionEyebrow>
      </FadeIn>
      <FadeIn>
        <h2 className="section-title">
          Let's build <em>something great</em>
        </h2>
      </FadeIn>
      <FadeIn>
        <p className="section-sub">
          Available for freelance projects, remote contracts, and collaborations worldwide. Responses within 24
          hours.
        </p>
      </FadeIn>
      <FadeIn>
        <div className="contact-grid">
          {contacts.map((contact) => (
            <div className="contact-block" key={contact.label}>
              <div className="contact-label">{contact.label}</div>
              <div className={contact.muted ? "contact-value muted" : "contact-value"}>
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  >
                    {contact.value}
                  </a>
                ) : (
                  contact.value
                )}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

export default Contact;