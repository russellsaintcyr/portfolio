import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="relative w-full overflow-x-hidden">

        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a className="text-xl font-bold text-gray-900 dark:text-white" href="#">Russell Saint Cyr</a>
            <div className="hidden md:flex items-center space-x-6">
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#home">Home</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#projects">Projects</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#about">About</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#contact">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#">
                <span className="material-symbols-outlined">code</span>
              </a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </nav>
        </header>

        {/* Main */}
        <main>
          <section className="container mx-auto px-4 py-16 md:py-24" id="home">
            <div className="flex flex-col gap-6 @container">
              <div className="flex flex-col gap-8 text-center items-center">
                <div className="flex flex-col gap-2">
                  <h1
                    className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                    Russell Saint Cyr</h1>
                  <h1
                    className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                    Senior Frontend Developer and Architect</h1>
                  <h2
                    className="text-gray-600 dark:text-gray-300 text-lg font-normal leading-normal md:text-xl max-w-3xl mx-auto">
                    Senior Frontend Developer | 20+ Years Building Scalable Applications
                  </h2>
                </div>
                <a className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                  href="#projects">
                  <span className="truncate">View My Work</span>
                </a>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="container mx-auto px-4 py-16 md:py-24" id="projects">
            <div className="flex flex-col gap-10 @container">
              <div className="flex flex-col gap-4 text-center items-center">
                <h2
                  className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight md:text-4xl">
                  Featured Projects</h2>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal max-w-3xl">Here
                  are some of the projects I'm proud to have worked on. Each project showcases my skills in
                  creating robust and user-friendly web solutions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Futurecults website */}
                <div
                  className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    data-alt="Abstract gradient for e-commerce platform thumbnail"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmsqRyBstfSr5idMwEWt0_Iaf82dVnjY2r2nvFwXXfZOweiC52hovs3xhSinsZTtRMGKHAzgsZKSuoT4hUW3Psz-gF-5FyOhCBKaX9UCbu0F0RSS4ZcYw4dmXBZoejrBlhlph_kq2IWffKDW6tTb1Ap2OHFNR4AFclFH2LCoVjpKST7xTFg_ZzxBvplzYh_EYXQHxNebc4OeLQJFSkhsGbrfMYtQw2tHa9hvWJmmsF1aGL1hQ9a0uIQwTSDcuyFMH1b-cB0a04rcyw")'
                    }}
                  >
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">futurecults.com</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">A full-featured online store built
                      with React, Node.js, and Stripe for payments.</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">React</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Node.js</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Stripe</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <a className="text-primary font-semibold text-sm hover:underline" href="#">Live Demo TBD</a>
                    <a className="text-primary font-semibold text-sm hover:underline" href="#">GitHub Repo</a>
                  </div>
                </div>
                {/* Worldweary */}
                <div
                  className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    data-alt="Abstract gradient for data visualization dashboard thumbnail"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCv-31HAW5C10aix0y_8_cLkxbmUZvW5TRa3jFXPOuhqgQi23bWpGQC4CL691XQ4YDFCqmNCWHAyD_5gFFOydsyZ000nRZwbubFa3BcfDg2RdurSAltYXyS1Nv4ldvmx3QtVuMP-pw1GI13ICIXdO85yCXS1BkhFuitfOTrCuQtazGWDnrzhmPK5Kd_-vp7MXO9b7lf_gieXzXOl6iFw8-tscWegyoCpDdthc-5CXJdQe7F2SkRe8pkIDATxzbCY5Sv4gnXdGQZL1Gw")'
                    }}
                  >
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">worldweary.com
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">An interactive dashboard for
                      visualizing complex datasets using D3.js and Python.</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">D3.js</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Python</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <a className="text-primary font-semibold text-sm hover:underline" href="#">Live Demo TBD</a>
                    <a className="text-primary font-semibold text-sm hover:underline" href="#">GitHub Repo</a>
                  </div>
                </div>
                {/* Spotify playlist rater */}
                <div
                  className="flex flex-col gap-4 bg-white dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    data-alt="Abstract gradient for project management tool thumbnail"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHcJFgJbpR6atXhZugTAAhMXsV8dLYg13RaNFuJFFJ3Ine2qipO8j-f13wsE7FkAiHJfQkiZq__SHvato70hEd0OGSQM6GAxi--33WPxP4aDso6h-JGnvUHzefilR-r6r--IiIlIokrai2Tdi07OIwqUpN8NVDLCb3sjnguCJo__CoDocYQmsLpHpfB4fd_0LD_C69-w7ygJytDeM3QrOphpr1NMhm25SBUwrsXqZ5raw_Us_l7c5quZT6tUdEPL4snk4O3WdcIImB")'
                    }}
                  >
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-white text-xl font-bold">Spotify playlist rater</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">A collaborative tool for teams to
                      manage tasks, deadlines, and progress.</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Vue.js</span>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">Firebase</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <a className="text-primary font-semibold text-sm hover:underline" href="#">Live Demo TBD</a>
                    <a className="text-primary font-semibold text-sm hover:underline" href="#">GitHub Repo</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Me */}
          <section className="container mx-auto px-4 py-16 md:py-24" id="about">
            <div className="flex flex-col lg:flex-row items-center gap-12 @container">
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-center bg-no-repeat bg-cover rounded-full"
                  data-alt="Professional headshot of Russell Saint Cyr"
                  style={{
                    backgroundImage: 'url("profile_photo.jpg")'
                  }}
                >
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-center lg:text-left">
                  <h2
                    className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight md:text-4xl">
                    About Me</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed">
                    I am a Senior Frontend Developer with 20+ years crafting elegant solutions across the technology stack.
                    I transform complex requirements into scalable, performant applications using Angular, React and React Native,
                    modifying the backend as needed. My architectural approach has modernized legacy systems and delivered
                    measurable wins—including 30% smaller bundle sizes and 15% higher Lighthouse scores. I thrive at the
                    union of technical excellence and user experience, guiding teams to build systems that are
                    well-designed and intuitive.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">code</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">JavaScript</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Advanced proficiency
                        in modern JavaScript (ES6+).</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">developer_mode</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">React</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Building dynamic
                        user interfaces with React and its ecosystem.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">Node.js</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Developing scalable
                        server-side applications.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">data_object</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">Python</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Utilizing Python for
                        backend services and data processing.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">database</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">SQL</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Designing and
                        managing relational databases.</p>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">cloud</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-900 dark:text-white text-base font-bold">AWS</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-normal">Deploying and
                        managing applications on AWS.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="container mx-auto px-4 py-16 md:py-24" id="contact">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col justify-end gap-8">
                <div className="flex flex-col gap-2 text-center">
                  <h2
                    className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight md:text-4xl">
                    Get In Touch</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">Interested
                    in collaborating or have a question? I'd love to hear from you. Fill out the form below,
                    and I'll get back to you as soon as possible.</p>
                </div>
                <form className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      className="form-input flex-1 w-full min-w-0 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 py-3 text-base"
                      placeholder="Your Name" type="text" />
                    <input
                      className="form-input flex-1 w-full min-w-0 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 py-3 text-base"
                      placeholder="Your Email" type="email" />
                  </div>
                  <textarea
                    className="form-textarea w-full min-w-0 resize-y overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 py-3 text-base"
                    placeholder="Your Message" rows="5"></textarea>
                  <button
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                    type="submit">
                    <span className="truncate">Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">© 2024 Russell Saint Cyr. All Rights Reserved.</p>
              <div className="flex items-center space-x-6">
                <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  href="#">
                  <span className="material-symbols-outlined">code</span>
                </a>
                <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  href="#">
                  <span className="material-symbols-outlined">alternate_email</span>
                </a>
                <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  href="#">
                  <span className="material-symbols-outlined">link</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
