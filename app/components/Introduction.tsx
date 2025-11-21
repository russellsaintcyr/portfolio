export default function Introduction() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 py-8 md:py-8" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 text-center items-center">
          <div className="flex flex-col gap-2">
            <h1
              className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
              Russell Saint Cyr</h1>
            <h1
              className="text-gray-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Senior Frontend Developer and Architect</h1>
            <h2
              className="text-gray-600 dark:text-gray-300 text-lg font-normal leading-normal md:text-xl max-w-3xl mx-auto">
              20+ Years Building Scalable Applications
            </h2>
          </div>
          {/* <a className="flex min-w-[84px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            href="#projects">
            <span className="truncate">View My Work</span>
          </a> */}
        </div>
      </div>
    </section>
  );
}
