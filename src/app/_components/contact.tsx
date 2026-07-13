import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_LOCATION,
  CONTACT_LINKEDIN_URL,
} from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap sec-pad">
        <span className="eyebrow">// contact</span>
        <h2>Let&apos;s build something worth shipping.</h2>
        <p className="intro">
          Open to senior full-stack roles and interesting contract work. If
          you&apos;re building something in TypeScript and care about doing it
          well, get in touch.
        </p>
        <div className="contact-grid">
          <div>
            <span className="lbl">email</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
          <div>
            <span className="lbl">phone</span>
            <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
          </div>
          <div>
            <span className="lbl">location</span>
            <span className="val">{CONTACT_LOCATION}</span>
          </div>
          <div>
            <span className="lbl">linkedin</span>
            <a href={CONTACT_LINKEDIN_URL} target="_blank" rel="noreferrer">
              linkedin.com/in/sean-pertet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
