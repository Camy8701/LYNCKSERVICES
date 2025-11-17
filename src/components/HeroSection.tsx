import { ArrowRight, Sun, Droplets, Thermometer, Wind } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="overflow-hidden glass-card rounded-3xl mb-20 mx-4 md:mx-6 lg:mx-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="relative md:p-10 lg:p-14 pt-6 pr-6 pb-6 pl-6">
          <div className="mt-10 md:mt-14">
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground font-serif font-normal">
              Nature, Reimagined
            </h1>
            <h2 className="mt-2 text-5xl md:text-6xl lg:text-7xl tracking-tight text-muted-foreground font-serif font-normal">
              by Intelligent Care
            </h2>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="inline-flex items-center justify-center bg-white/10 w-7 h-7 ring-white/20 ring-2 rounded-full">
                  <Sun className="w-4 h-4 text-gray-300" />
                </span>
                <span className="inline-flex items-center justify-center bg-white/10 w-7 h-7 ring-white/20 ring-2 rounded-full">
                  <Droplets className="w-4 h-4 text-gray-300" />
                </span>
                <span className="inline-flex items-center justify-center bg-white/10 w-7 h-7 ring-white/20 ring-2 rounded-full">
                  <Thermometer className="w-4 h-4 text-gray-300" />
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Light, Water, Climate — tuned by data</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 items-center">
              <a
                href="#"
                className="relative inline-flex items-center justify-center overflow-hidden group text-white tracking-tighter bg-gray-800 rounded-3xl pt-2.5 pr-4 pb-2.5 pl-4 hover:scale-105 transition-transform duration-300"
              >
                <span className="absolute transition-all duration-500 ease-out group-hover:w-56 group-hover:h-56 bg-teal-600 w-0 h-0 rounded-full"></span>
                <span className="relative text-base font-semibold">Start Growing Smarter</span>
                <ArrowRight className="h-4 w-4 relative ml-3" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4">
                <div className="text-xs text-muted-foreground mt-1">01</div>
                <div className="flex-1">
                  <p className="text-base font-medium tracking-tight text-foreground">Adaptive Climate Sync</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Automated temperature, humidity, and airflow calibration for every growth stage.
                  </p>
                </div>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 flex items-start gap-4">
                <div className="text-xs text-muted-foreground mt-1">02</div>
                <div className="flex-1">
                  <p className="text-base font-medium tracking-tight text-foreground">Live Growth Telemetry</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Precision plant metrics, analyzed and graphed in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative bg-cover bg-center rounded-3xl" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1600&q=80)" }}>
          <div className="relative md:p-10 lg:p-14 pt-8 pr-8 pb-8 pl-8">
            <div className="relative overflow-hidden min-h-[420px] md:min-h-[520px] flex bg-emerald-950/20 bg-cover bg-center ring-white/10 ring-1 rounded-3xl items-center justify-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=80)" }}>
              
              {/* Photosynthesis Chart */}
              <div className="absolute top-4 left-4 bg-white/10 w-[220px] border-white/10 border rounded-2xl pt-4 pr-4 pb-4 pl-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-xs font-medium">Photosynthesis</span>
                  <span className="inline-flex items-center gap-1 text-emerald-300 text-xs">
                    <span>↗</span> +12%
                  </span>
                </div>
                <div className="mt-2 h-[70px] bg-gradient-to-b from-emerald-500/20 to-transparent rounded"></div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-emerald-200 text-sm font-medium">+12°</span>
                  <span className="text-white/80 text-xs">Temp Avg</span>
                </div>
              </div>

              {/* Light Exposure */}
              <div className="absolute bottom-4 left-4 bg-white/10 w-[260px] border-white/10 border rounded-2xl pt-4 pr-4 pb-4 pl-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Sun className="h-4 w-4 text-amber-300" />
                    <span className="text-sm font-medium">Light Exposure</span>
                  </div>
                  <span className="text-xs text-white/80">18:00 PM</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-2 bg-white/15 rounded-full w-full overflow-hidden">
                    <div className="h-2 bg-amber-300 rounded-full w-[65%]"></div>
                  </div>
                  <span className="text-white text-sm font-medium">65%</span>
                </div>
              </div>

              {/* Side Pills */}
              <div className="absolute sm:flex flex-col gap-3 top-4 right-4 hidden">
                <span className="inline-flex items-center gap-2 text-emerald-200 bg-white/10 border border-white/10 rounded-full px-3 py-2 text-xs">
                  <Droplets className="h-4 w-4" /> 48%
                </span>
                <span className="inline-flex items-center gap-2 text-emerald-200 bg-white/10 border border-white/10 rounded-full px-3 py-2 text-xs">
                  <Wind className="h-4 w-4" /> 1.3 m/s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
