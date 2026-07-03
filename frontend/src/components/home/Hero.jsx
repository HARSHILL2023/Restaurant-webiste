import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1800&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1800&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&q=80',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1800&q=80',
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1.4s] ease-in-out ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundImage: `url('${slide}')` }}
          >
            <div className="absolute inset-0 bg-gradient-hero mix-blend-multiply" />
          </div>
        ))}
      </div>
      
      <div className="relative z-20 text-center px-6 max-w-[820px]">
        <p className="text-[11px] font-semibold tracking-[4px] uppercase text-ever-terracotta mb-5">
          Pure Vegetarian · All Day Bistro · Thaltej, Ahmedabad
        </p>
        <h1 className="font-playfair text-[clamp(48px,8vw,92px)] font-bold leading-[1.05] text-ever-cream mb-[22px]">
          Good Food, <em className="text-ever-terracotta italic">Any Hour</em>
        </h1>
        <p className="text-[17px] font-light leading-[1.75] text-ever-text/80 mb-9">
          A warm, 100% vegetarian bistro open from morning to midnight — serving honest food, handcrafted mocktails, and specialty coffees all day long.
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap mb-10">
          <span className="text-[11px] tracking-[1.5px] uppercase border border-green-500/45 text-[#7bc97e] px-3.5 py-1.5 rounded-full">🟢 100% Vegetarian</span>
          <span className="text-[11px] tracking-[1.5px] uppercase border border-ever-border text-ever-text-muted px-3.5 py-1.5 rounded-full">🏠 Inside · 90 Seats</span>
          <span className="text-[11px] tracking-[1.5px] uppercase border border-ever-border text-ever-text-muted px-3.5 py-1.5 rounded-full">🌿 Terrace · 70 Seats</span>
          <span className="text-[11px] tracking-[1.5px] uppercase border border-ever-border text-ever-text-muted px-3.5 py-1.5 rounded-full">🌅 Elevated Terrace · 40 Seats</span>
        </div>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link to="/reserve">
            <button className="bg-ever-terracotta text-ever-dark border-none py-4 px-9 font-inter text-xs font-bold tracking-[2px] uppercase rounded cursor-pointer transition-all duration-200 hover:bg-ever-terra-light hover:-translate-y-px">
              Reserve a Table
            </button>
          </Link>
          <Link to="/menu">
            <button className="bg-transparent text-ever-cream border border-ever-cream/35 py-4 px-9 font-inter text-xs font-bold tracking-[2px] uppercase rounded cursor-pointer transition-all duration-200 hover:border-ever-terracotta hover:text-ever-terracotta hover:-translate-y-px">
              View Menu
            </button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${index === activeSlide ? 'bg-ever-terracotta scale-125' : 'bg-ever-cream/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
