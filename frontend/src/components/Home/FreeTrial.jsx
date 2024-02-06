import { Link } from "react-router-dom";

export default function FreeTrial() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="md:text-3xl text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Boost your productivity.
            <br />
            Start using our app today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl md:text-lg text-base leading-8 text-gray-300">
            Boost your productivity with Masync AI Content Generator. Start
            using our app today.
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
              <div class="mb-5 md:mb-0 relative inline-flex group">
                  <div
                      className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-l from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-[10px] group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200 animate-pulse">
                  </div>
                  <Link className="relative inline-flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-200 bg-gray-800/50 font-pj rounded-full focus:outline-none backdrop-blur-3xl  hover:bg-gray-800/85 border-[0.5px]">
                      Start free 3 days trail
                  </Link>
              </div>
              
              <Link
              to="free-plan"
              className="text-sm font-semibold leading-6 text-white"
              >
              Learn more <span aria-hidden="true">→</span>
              </Link>
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}