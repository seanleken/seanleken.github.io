import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_LOCATION,
} from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-18 bg-portfolio-navy">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Let's Work Together
        </h2>
        <p className="text-portfolio-light-slate mb-12 max-w-2xl leading-relaxed">
          Open to cloud engineering and e-commerce opportunities. Whether you
          need help with architecture, infrastructure, or development, let's
          connect.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium text-portfolio-light-slate uppercase tracking-wider mb-2">
              Email
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white hover:text-portfolio-blue transition-colors duration-200"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-portfolio-light-slate uppercase tracking-wider mb-2">
              Phone
            </h3>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="text-white hover:text-portfolio-blue transition-colors duration-200"
            >
              {CONTACT_PHONE}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-medium text-portfolio-light-slate uppercase tracking-wider mb-2">
              Location
            </h3>
            <span className="text-white">{CONTACT_LOCATION}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
