import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ever-dark-2 border-t border-ever-border pt-16 px-6 md:px-12 pb-9">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 max-w-[1280px] mx-auto">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-playfair text-xl text-ever-terracotta tracking-[2px] uppercase mb-3.5">The Ever House</h3>
          <p className="text-[13px] text-ever-text-muted leading-[1.8] max-w-[280px]">
            A 100% vegetarian, alcohol-free all-day bistro in Thaltej, Ahmedabad. Good food and great mocktails, any hour of the day.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[2px] uppercase text-ever-cream mb-[18px]">Navigate</h4>
          <ul className="list-none flex flex-col gap-2.5">
            <li>
              <Link href="/" className="text-[13px] text-ever-text-muted no-underline transition-colors duration-200 hover:text-ever-terracotta">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="text-[13px] text-ever-text-muted no-underline transition-colors duration-200 hover:text-ever-terracotta">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/reserve" className="text-[13px] text-ever-text-muted no-underline transition-colors duration-200 hover:text-ever-terracotta">
                Reserve
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[2px] uppercase text-ever-cream mb-[18px]">Find Us</h4>
          <ul className="list-none flex flex-col gap-2.5 text-[13px] text-ever-text-muted">
            <li>302, Soham Pristine</li>
            <li>Nr Shaligram-2 Bungalow</li>
            <li>Off Sindhubhavan Road</li>
            <li>Thaltej, Ahmedabad 380054</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold tracking-[2px] uppercase text-ever-cream mb-[18px]">Hours</h4>
          <ul className="list-none flex flex-col gap-2.5 text-[13px] text-ever-text-muted">
            <li>Breakfast: 8 am – 11:30 am</li>
            <li>Lunch: 12 pm – 4 pm</li>
            <li>Evening: 5 pm – 11:30 pm</li>
            <li>Open Every Day</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto mt-11 pt-[22px] border-t border-ever-border flex flex-col md:flex-row justify-between items-center text-[11px] text-ever-text-muted gap-2.5 md:gap-0 text-center md:text-left">
        <span>© 2026 The Ever House · Pure Vegetarian · Ahmedabad</span>
        <Link href="/admin">
          <button className="bg-transparent border border-ever-border text-ever-text-muted text-[11px] tracking-[1px] uppercase py-[7px] px-3.5 rounded cursor-pointer transition-colors duration-200 hover:text-ever-terracotta hover:border-ever-terracotta">
            View Reservations
          </button>
        </Link>
      </div>
    </footer>
  );
}
