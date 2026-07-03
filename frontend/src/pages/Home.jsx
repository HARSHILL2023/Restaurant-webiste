import Hero from '@/components/home/Hero';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      {/* Gallery strip matching original 2fr 1fr 1fr layout */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] md:h-[360px] gap-[3px]">
        <div
          className="relative overflow-hidden bg-cover bg-center h-[220px] md:h-auto group"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80')" }}
        >
          <div className="absolute inset-0 bg-ever-dark/10 transition-colors duration-300 group-hover:bg-transparent" />
        </div>
        <div className="grid grid-rows-2 gap-[3px] h-[220px] md:h-auto">
          <div
            className="relative overflow-hidden bg-cover bg-center group"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80')" }}
          >
            <div className="absolute inset-0 bg-ever-dark/10 transition-colors duration-300 group-hover:bg-transparent" />
          </div>
          <div
            className="relative overflow-hidden bg-cover bg-center group"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80')" }}
          >
            <div className="absolute inset-0 bg-ever-dark/10 transition-colors duration-300 group-hover:bg-transparent" />
          </div>
        </div>
        <div className="grid grid-rows-2 gap-[3px] h-[220px] md:h-auto">
          <div
            className="relative overflow-hidden bg-cover bg-center group"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80')" }}
          >
            <div className="absolute inset-0 bg-ever-dark/10 transition-colors duration-300 group-hover:bg-transparent" />
          </div>
          <div
            className="relative overflow-hidden bg-cover bg-center group"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80')" }}
          >
            <div className="absolute inset-0 bg-ever-dark/10 transition-colors duration-300 group-hover:bg-transparent" />
          </div>
        </div>
      </div>

      {/* Seating Options Header */}
      <div className="bg-ever-dark pt-[72px]">
        <div className="text-center px-6 pb-12">
          <p className="text-[11px] font-semibold tracking-[4px] uppercase text-ever-terracotta mb-3.5">Choose Your Spot</p>
          <h2 className="font-playfair text-[clamp(30px,3.5vw,50px)] font-bold text-ever-cream leading-[1.15]">
            Three Ways to <em className="italic text-ever-terracotta">Dine With Us</em>
          </h2>
          <p className="text-ever-text-muted text-[14px] mt-3.5">200 total seats across three distinct atmospheres</p>
        </div>
      </div>

      {/* Seating Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px]">
        {[
          { title: 'Inside', desc: 'Cosy, air-conditioned indoor dining with warm bistro lighting and a lively open kitchen.', seats: '90 Seats', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80' },
          { title: 'Terrace', desc: 'Open-air garden terrace — ideal for leisurely lunches, evening mocktails, and group gatherings.', seats: '70 Seats', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80' },
          { title: 'Elevated Terrace', desc: 'A raised outdoor platform — panoramic views, fresh breeze, and the most sought-after seats in the house.', seats: '40 Seats', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80' }
        ].map((seat, i) => (
          <div key={i} className="relative h-[240px] md:h-[320px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('${seat.img}')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-ever-dark/85 to-ever-dark/20" />
            <div className="absolute bottom-0 left-0 right-0 z-10 px-8 py-7">
              <h3 className="font-playfair text-2xl text-ever-cream mb-1.5">{seat.title}</h3>
              <p className="text-[13px] text-ever-text/75 leading-[1.6]">{seat.desc}</p>
              <span className="inline-block mt-2.5 text-[11px] tracking-[1.5px] uppercase text-ever-terracotta border border-ever-border px-2.5 py-1 rounded-full">{seat.seats}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hours */}
      <div className="bg-ever-green-deep border-y border-ever-border">
        <div className="flex flex-col md:flex-row justify-center max-w-[1200px] mx-auto">
          {[
            { label: 'Breakfast', time: '8:00 am – 11:30 am', days: 'Daily' },
            { label: 'Brunch', time: '11:00 am – 3:00 pm', days: 'Saturday & Sunday' },
            { label: 'Lunch', time: '12:00 pm – 4:00 pm', days: 'Daily' },
            { label: 'Evening', time: '5:00 pm – 11:30 pm', days: 'Daily' }
          ].map((hour, i) => (
            <div key={i} className="flex-1 py-9 px-7 text-center border-b md:border-b-0 md:border-r border-ever-border last:border-0">
              <p className="text-[11px] tracking-[2px] uppercase text-ever-terracotta mb-2">{hour.label}</p>
              <h4 className="font-playfair text-xl text-ever-cream mb-1.5">{hour.time}</h4>
              <p className="text-[13px] text-ever-text-muted">{hour.days}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-[60px] md:py-[100px] px-6 md:px-[72px] max-w-[1320px] mx-auto">
        <div className="relative">
          <div className="absolute -top-3.5 -left-3.5 -right-3.5 -bottom-3.5 border border-ever-terracotta rounded-[2px] opacity-35" />
          <img
            className="w-full h-[300px] md:h-[500px] object-cover rounded-[2px] block relative z-10"
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80"
            alt="About The Ever House"
            width={900}
            height={500}
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-[4px] uppercase text-ever-terracotta mb-3.5">Our Story</p>
          <h2 className="font-playfair text-[clamp(30px,3.5vw,50px)] font-bold text-ever-cream leading-[1.15] mb-0">A Bistro for <em className="italic text-ever-terracotta">Every Moment</em></h2>
          <p className="font-playfair text-[19px] italic text-ever-text leading-[1.65] mt-6">&quot;We believe great vegetarian food doesn&apos;t need to compromise — every plate here is proof of that.&quot;</p>
          <p className="text-[15px] leading-[1.9] text-ever-text-muted mt-4">Nestled in the heart of Thaltej, Ahmedabad, The Ever House is a proudly 100% vegetarian, alcohol-free bistro. We built it for the neighbourhood — a place you can visit at 8 in the morning for a slow breakfast or at 10 at night for a relaxed dinner.</p>
          <p className="text-[15px] leading-[1.9] text-ever-text-muted mt-4">Our kitchen draws from the best of Indian and global vegetarian cuisine, presented simply and honestly. At our bar, you&apos;ll find handcrafted mocktails, specialty coffees, fresh juices, and more — no liquor, all flavour.</p>

          <div className="flex gap-10 mt-10 pt-9 border-t border-ever-border">
            <div><h3 className="font-playfair text-[34px] text-ever-terracotta font-bold">200</h3><p className="text-[11px] tracking-[2px] uppercase text-ever-text-muted mt-1">Total Seats</p></div>
            <div><h3 className="font-playfair text-[34px] text-ever-terracotta font-bold">3</h3><p className="text-[11px] tracking-[2px] uppercase text-ever-text-muted mt-1">Dining Spaces</p></div>
            <div><h3 className="font-playfair text-[34px] text-ever-terracotta font-bold">All Day</h3><p className="text-[11px] tracking-[2px] uppercase text-ever-text-muted mt-1">Open Daily</p></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-[110px] px-6 bg-ever-dark border-t border-ever-border">
        <p className="text-[11px] font-semibold tracking-[4px] uppercase text-ever-terracotta mb-3.5">Visit Us</p>
        <h2 className="font-playfair text-[clamp(30px,3.5vw,50px)] font-bold text-ever-cream leading-[1.15] mb-[18px]">Your Table Is <em className="italic text-ever-terracotta">Waiting</em></h2>
        <p className="text-ever-text-muted text-[15px] mb-3 leading-[1.8]">302, Soham Pristine, Nr Shaligram-2 Bungalow<br />Off Sindhubhavan Road, Thaltej, Ahmedabad — 380054</p>
        <p className="text-ever-text-muted text-[13px] mb-10">100% Vegetarian · Alcohol-Free · All Day Dining · 200 Seats</p>
        <Link to="/reserve">
          <button className="bg-ever-terracotta text-ever-dark border-none py-4 px-9 font-inter text-xs font-bold tracking-[2px] uppercase rounded cursor-pointer transition-all duration-200 hover:bg-ever-terra-light hover:-translate-y-px">
            Book a Table
          </button>
        </Link>
      </div>
    </main>
  );
}
