'use client';
import { useState } from 'react';

export default function ReservePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    occasion: '',
    seatingPreference: 'Inside',
    notes: ''
  });

  const [dietChips, setDietChips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  const handleChipClick = (chip) => {
    setDietChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      guests: Number(formData.guests),
      dietaryRequirements: dietChips.join(', ')
    };

    try {
      const res = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessData(data);
      } else {
        setError(data.message || 'An error occurred while booking.');
      }
    } catch {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] mt-[72px] grid grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-[320px] md:min-h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-ever-dark/75 to-ever-dark/45" />
        <div className="relative z-10 p-[36px_28px] md:p-[72px_52px] flex flex-col justify-end h-full">
          <h2 className="font-playfair text-[40px] text-ever-cream leading-[1.2] mb-[18px]">
            Join Us <em className="text-ever-terracotta italic">Today</em>
          </h2>
          <p className="text-ever-text/75 text-[14px] leading-[1.8] mb-9">
            Whether it&apos;s a quiet morning coffee, a celebratory brunch, or a late-night dinner, we always save a seat for you.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="text-[16px] mt-0.5">🕒</span>
              <div>
                <strong className="text-ever-cream block text-[13px] font-semibold">Opening Hours</strong>
                <span className="text-[13px] text-ever-text-muted leading-[1.55]">Open daily from 8:00 am to 11:30 pm.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[16px] mt-0.5">📞</span>
              <div>
                <strong className="text-ever-cream block text-[13px] font-semibold">Large Groups</strong>
                <span className="text-[13px] text-ever-text-muted leading-[1.55]">For tables of 8+, please call us at +91 98765 43210.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[16px] mt-0.5">🚗</span>
              <div>
                <strong className="text-ever-cream block text-[13px] font-semibold">Parking</strong>
                <span className="text-[13px] text-ever-text-muted leading-[1.55]">Valet parking available at the entrance.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ever-dark-2 p-[40px_28px] md:p-[64px_52px] overflow-y-auto">
        {successData ? (
          <div className="bg-ever-terracotta/10 border border-ever-border rounded-lg p-11 text-center mt-10">
            <div className="text-[48px] mb-[18px]">✅</div>
            <h3 className="font-playfair text-ever-cream text-[26px] mb-2.5">Request Received</h3>
            <p className="text-ever-text-muted text-[14px] leading-[1.75]">
              Thank you, {successData.firstName}. We have received your reservation request for {successData.guests} guests on {successData.date} at {successData.time}.
            </p>
            <div className="font-playfair text-[22px] text-ever-terracotta my-3">
              {successData.referenceId}
            </div>
            <p className="text-ever-text-muted text-[14px] leading-[1.75] mb-2">
              Status: <span className="font-semibold text-[#7bc97e]">{successData.status}</span>
            </p>
            <p className="text-ever-text-muted text-[12px]">Please save this reference number. A confirmation email has been sent to {successData.email}.</p>
            <button
              onClick={() => setSuccessData(null)}
              className="mt-6 bg-transparent border border-ever-terracotta text-ever-terracotta px-6 py-2 rounded text-xs uppercase tracking-wider hover:bg-ever-terracotta hover:text-ever-dark transition-colors"
            >
              Make Another Booking
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-playfair text-[34px] text-ever-cream mb-1.5">Book a Table</h2>
            <p className="text-[13px] text-ever-text-muted mb-10">Select your preferred time and seating area. We&apos;ll send an email to confirm.</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta" placeholder="John" />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta" placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8">
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Date</label>
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta [color-scheme:dark]" />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Time</label>
                  <select name="time" value={formData.time} onChange={handleChange} className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta appearance-none">
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Guests</label>
                  <select name="guests" value={formData.guests} onChange={handleChange} className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta appearance-none">
                    {[1,2,3,4,5,6,7].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted block mb-3">Seating Preference</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { name: 'Inside', icon: '🏠' },
                    { name: 'Terrace', icon: '🌿' },
                    { name: 'Elevated Terrace', icon: '🌅' }
                  ].map(pref => (
                    <div
                      key={pref.name}
                      onClick={() => setFormData({ ...formData, seatingPreference: pref.name })}
                      className={`border rounded-md p-4 text-center cursor-pointer transition-colors duration-200 ${formData.seatingPreference === pref.name ? 'border-ever-terracotta bg-ever-terracotta/10' : 'border-ever-border hover:border-ever-terracotta/50'}`}
                    >
                      <div className="text-[22px] mb-2">{pref.icon}</div>
                      <h5 className="text-[12px] font-semibold text-ever-cream tracking-[0.5px] mb-1">{pref.name}</h5>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted block mb-2">Dietary Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {['Vegan', 'Jain', 'Gluten-Free', 'Nut Allergy'].map(chip => (
                    <div
                      key={chip}
                      onClick={() => handleChipClick(chip)}
                      className={`text-[12px] px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 select-none border ${dietChips.includes(chip) ? 'bg-[#4caf50]/10 border-[#4caf50]/50 text-[#7bc97e]' : 'bg-ever-dark-3 border-ever-text-muted/30 text-ever-text-muted hover:border-ever-text-muted'}`}
                    >
                      {chip}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[7px] mb-6">
                <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Special Requests / Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta min-h-[100px] resize-y" placeholder="Any special occasion? Birthday, Anniversary?" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ever-terracotta text-ever-dark border-none p-[17px] font-inter text-[12px] font-bold tracking-[2px] uppercase rounded cursor-pointer transition-all duration-200 hover:bg-ever-terra-light hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Processing...' : 'Confirm Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
