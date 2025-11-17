import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Rodriguez",
    role: "Urban Farm Owner",
    initials: "MR",
    color: "emerald",
    rating: 5,
    text: "VerdantIQ transformed my urban farm completely. The AI monitoring caught nutrient deficiencies I never would have noticed, and my yield increased by 40% in just one season.",
    metric: "+40% Yield Increase",
    metricColor: "emerald"
  },
  {
    name: "James Chen",
    role: "Hydroponic Specialist",
    initials: "JC",
    color: "sky",
    rating: 5,
    text: "The precision environmental control is incredible. My hydroponic systems now maintain perfect conditions 24/7, and I've reduced water usage by 35% while improving plant quality.",
    metric: "-35% Water Usage",
    metricColor: "sky"
  },
  {
    name: "Sarah Green",
    role: "Greenhouse Manager",
    initials: "SG",
    color: "violet",
    rating: 5,
    text: "The growth analytics have revolutionized how we plan our harvests. We can predict optimal harvest times with 95% accuracy and our customers love the consistency.",
    metric: "95% Accuracy",
    metricColor: "violet"
  },
  {
    name: "David Wilson",
    role: "Home Grower",
    initials: "DW",
    color: "amber",
    rating: 5,
    text: "As a beginner, VerdantIQ made growing accessible. The mobile app guides me through everything, and I'm amazed that I can monitor my plants while traveling.",
    metric: "Beginner Friendly",
    metricColor: "amber"
  },
  {
    name: "Lisa Martinez",
    role: "Organic Farm Co-op",
    initials: "LM",
    color: "teal",
    rating: 5,
    text: "Resource optimization has been a game-changer for our co-op. We've cut energy costs by 28% while maintaining organic certification and improving soil health.",
    metric: "-28% Energy Costs",
    metricColor: "teal"
  },
  {
    name: "Alex Thompson",
    role: "Vertical Farm CEO",
    initials: "AT",
    color: "rose",
    rating: 5,
    text: "The expert community feature has been invaluable. Having 24/7 access to growing experts helped us scale from 5 to 50 growing towers without losing quality.",
    metric: "10x Scale Growth",
    metricColor: "rose"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="overflow-hidden glass-card rounded-3xl mt-24 mb-20 mx-4 md:mx-6 lg:mx-8">
      <div className="md:px-10 lg:px-14 pt-20 pr-6 pb-16 pl-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground font-serif font-normal">
            Growing Success,
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-muted-foreground font-serif font-normal mb-6">
            Shared Stories
          </h3>
          <p className="text-lg text-muted-foreground">
            Real results from growers who transformed their harvests with intelligent plant care technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-${testimonial.color}-500/20 rounded-full flex items-center justify-center`}>
                  <span className={`text-sm font-semibold text-${testimonial.color}-300`}>{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed mb-4">{testimonial.text}</p>
              <div className={`text-sm font-medium text-${testimonial.metricColor}-400`}>{testimonial.metric}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-muted-foreground text-sm">Active Growers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">4.9</div>
              <div className="text-muted-foreground text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">45%</div>
              <div className="text-muted-foreground text-sm">Average Yield Increase</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-muted-foreground text-sm">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
