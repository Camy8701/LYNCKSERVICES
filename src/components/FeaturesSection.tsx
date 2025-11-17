const features = [
  {
    title: "AI Plant Monitoring",
    description: "Computer vision and machine learning algorithms continuously analyze plant health, growth patterns, and environmental needs.",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Precision Environmental Control",
    description: "Automated adjustment of temperature, humidity, lighting, and airflow based on real-time plant feedback and growth stage requirements.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Growth Analytics & Insights",
    description: "Comprehensive data visualization and predictive analytics to optimize yield, track progress, and forecast harvest timing.",
    image: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mobile Management",
    description: "Control and monitor your growing systems from anywhere with our intuitive mobile app and real-time notifications.",
    image: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Resource Optimization",
    description: "Minimize water, energy, and nutrient usage through intelligent resource management and efficiency algorithms.",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Expert Community",
    description: "Access to growing experts, community knowledge sharing, and 24/7 support to help you achieve optimal results.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  }
];

const FeaturesSection = () => {
  return (
    <section className="overflow-hidden glass-card rounded-3xl mt-8 mb-20 mx-4 md:mx-6 lg:mx-8">
      <div className="md:px-10 lg:px-14 pt-20 pr-6 pb-16 pl-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal">
            Smart Growth,
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-muted-foreground font-serif font-normal mb-6">
            Simplified
          </h3>
          <p className="text-lg text-muted-foreground">
            Advanced plant care technology that learns, adapts, and optimizes your growing environment automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div
                className="aspect-[4/3] overflow-hidden relative bg-cover bg-center rounded-2xl mb-6"
                style={{ backgroundImage: `url(${feature.image})` }}
              ></div>
              <h4 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
                {feature.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
