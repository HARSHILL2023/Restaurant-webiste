import { useState } from 'react';

export default function StatusPage() {
  const [referenceId, setReferenceId] = useState('');
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    if (!referenceId.trim()) return;

    setLoading(true);
    setError('');
    setReservation(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reservations/ref/${referenceId.trim().toUpperCase()}`);
      const data = await res.json();

      if (res.ok) {
        setReservation(data);
      } else {
        setError(data.message || 'Reservation not found. Please check your reference ID.');
      }
    } catch {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] mt-[72px] grid grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-[320px] md:min-h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-ever-dark/75 to-ever-dark/45" />
        <div className="relative z-10 p-[36px_28px] md:p-[72px_52px] flex flex-col justify-end h-full">
          <h2 className="font-playfair text-[40px] text-ever-cream leading-[1.2] mb-[18px]">
            Check <em className="text-ever-terracotta italic">Status</em>
          </h2>
          <p className="text-ever-text/75 text-[14px] leading-[1.8] mb-9">
            Enter your booking reference number to view the current status of your reservation.
          </p>
        </div>
      </div>

      <div className="bg-ever-dark-2 p-[40px_28px] md:p-[64px_52px] overflow-y-auto">
        <h2 className="font-playfair text-[34px] text-ever-cream mb-1.5">Reservation Lookup</h2>
        <p className="text-[13px] text-ever-text-muted mb-10">Enter the 8-character reference ID provided at the time of booking.</p>

        <form onSubmit={handleCheckStatus} className="mb-10">
          <div className="flex flex-col gap-[7px] mb-6">
            <label className="text-[10px] font-semibold tracking-[1.5px] uppercase text-ever-text-muted">Reference ID</label>
            <input 
              required 
              type="text" 
              value={referenceId} 
              onChange={(e) => setReferenceId(e.target.value)}
              className="bg-ever-dark-3 border border-ever-text-muted/30 rounded p-[13px_15px] text-ever-cream font-inter text-[14px] outline-none transition-colors focus:border-ever-terracotta uppercase" 
              placeholder="e.g. 980488B1" 
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ever-terracotta text-ever-dark border-none p-[17px] font-inter text-[12px] font-bold tracking-[2px] uppercase rounded cursor-pointer transition-all duration-200 hover:bg-ever-terra-light hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Check Status'}
          </button>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {reservation && (
          <div className="bg-ever-dark-3 border border-ever-border rounded-lg p-8">
            <div className="flex justify-between items-start mb-6 border-b border-ever-border pb-4">
              <div>
                <h3 className="font-playfair text-xl text-ever-cream">{reservation.firstName} {reservation.lastName}</h3>
                <p className="text-[12px] text-ever-text-muted mt-1">{reservation.email} • {reservation.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-ever-text-muted block mb-1">Status</span>
                <span className={`text-sm font-semibold ${
                  reservation.status === 'Confirmed' ? 'text-[#7bc97e]'
                    : reservation.status === 'Cancelled' ? 'text-red-400'
                      : reservation.status === 'Completed' ? 'text-blue-400'
                        : 'text-yellow-400'
                }`}>
                  {reservation.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ever-text-muted block mb-1">Date & Time</span>
                <p className="text-sm text-ever-cream">{reservation.date} at {reservation.time}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ever-text-muted block mb-1">Guests</span>
                <p className="text-sm text-ever-cream">{reservation.guests} People</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ever-text-muted block mb-1">Seating</span>
                <p className="text-sm text-ever-cream">{reservation.seatingPreference}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-ever-text-muted block mb-1">Reference ID</span>
                <p className="text-sm text-ever-terracotta">{reservation.referenceId}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
