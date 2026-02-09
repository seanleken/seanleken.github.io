export function EnterpriseExperience() {
  return (
    <section className="py-11 md:py-18">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-portfolio-navy dark:text-white mb-4">
          Enterprise Experience
        </h2>
        <p className="text-portfolio-slate dark:text-portfolio-light-slate mb-8">
          6+ years building cloud solutions for:
        </p>
        <ul className="space-y-4 max-w-2xl">
          <li className="flex items-start gap-3">
            <span className="text-portfolio-blue mt-1">•</span>
            <div>
              <span className="font-semibold text-portfolio-navy dark:text-white">
                Space48
              </span>
              <span className="text-portfolio-slate dark:text-portfolio-light-slate">
                {" "}
                (UK E-commerce Consultancy) — Graduate Developer → Developer →  Senior Developer
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-portfolio-blue mt-1">•</span>
            <div>
              <span className="font-semibold text-portfolio-navy dark:text-white">
                Above The Fray
              </span>
              <span className="text-portfolio-slate dark:text-portfolio-light-slate">
                {" "}
                (US E-commerce Consultancy) — Software Engineer
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-portfolio-blue mt-1">•</span>
            <div>
              <span className="font-semibold text-portfolio-navy dark:text-white">
                Major British Retailers
              </span>
              <span className="text-portfolio-slate dark:text-portfolio-light-slate">
                {" "}
                — Platform integrations & migrations
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-portfolio-blue mt-1">•</span>
            <div>
              <span className="font-semibold text-portfolio-navy dark:text-white">
                UK National Mapping Agency
              </span>
              <span className="text-portfolio-slate dark:text-portfolio-light-slate">
                {" "}
                — iPaaS & BigCommerce integrations
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
