import { Heart, ArrowUpRight } from "lucide-react";

const portfolioItems = [
  {
    title: "Tribeca Penthouse",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Zenith Tech HQ",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Azure Boutique Hotel",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Meridian Art Gallery",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
  }
];

const PortfolioGrid = () => {
  return (
    <section className="mt-8 px-4 sm:px-6 lg:px-12 pt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {portfolioItems.map((item, index) => (
        <article
          key={index}
          className="group glass-card rounded-xl overflow-hidden hover:border-white/[0.12] transition-all duration-500 min-h-[420px] flex flex-col"
        >
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
              <Heart className="w-4 h-4 stroke-[1.5] hover:fill-primary hover:stroke-primary transition-colors duration-300" />
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <div className="flex-1"></div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground"></span>
              <ArrowUpRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default PortfolioGrid;
