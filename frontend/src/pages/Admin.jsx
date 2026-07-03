'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (token) {
      fetchReservations(token);
      interval = setInterval(() => {
        fetchReservations(token);
      }, 15000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Connection error — is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async (authToken) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      });
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch {
      console.error('Failed to fetch reservations');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reservations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok && token) {
        fetchReservations(token);
      }
    } catch {
      console.error('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setReservations([]);
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-4">
        <div className="bg-ever-dark-3 p-8 rounded-lg w-full max-w-md border border-ever-border">
          <h1 className="font-playfair text-2xl text-ever-cream mb-6 text-center">Admin Login</h1>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-ever-dark border border-ever-text-muted/30 rounded p-3 text-ever-cream outline-none focus:border-ever-terracotta"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-ever-dark border border-ever-text-muted/30 rounded p-3 text-ever-cream outline-none focus:border-ever-terracotta"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-ever-terracotta text-ever-dark font-bold uppercase tracking-wider py-3 rounded mt-2 hover:bg-ever-terra-light transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-ever-border">
        <h1 className="font-playfair text-3xl text-ever-cream">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-ever-text-muted hover:text-ever-terracotta text-sm uppercase tracking-wider">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-ever-dark-3 p-6 rounded border border-ever-border">
          <h3 className="text-ever-text-muted text-xs uppercase tracking-wider mb-2">Total Bookings</h3>
          <p className="font-playfair text-3xl text-ever-terracotta">{reservations.length}</p>
        </div>
        <div className="bg-ever-dark-3 p-6 rounded border border-ever-border">
          <h3 className="text-ever-text-muted text-xs uppercase tracking-wider mb-2">Pending</h3>
          <p className="font-playfair text-3xl text-ever-cream">{reservations.filter(r => r.status === 'Pending').length}</p>
        </div>
        <div className="bg-ever-dark-3 p-6 rounded border border-ever-border">
          <h3 className="text-ever-text-muted text-xs uppercase tracking-wider mb-2">Confirmed</h3>
          <p className="font-playfair text-3xl text-[#7bc97e]">{reservations.filter(r => r.status === 'Confirmed').length}</p>
        </div>
      </div>

      <h2 className="font-playfair text-2xl text-ever-cream mb-6">Recent Reservations</h2>
      <div className="overflow-x-auto bg-ever-dark-3 rounded border border-ever-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ever-border">
              <th className="p-4 text-[10px] tracking-wider uppercase text-ever-terracotta font-normal">Date &amp; Time</th>
              <th className="p-4 text-[10px] tracking-wider uppercase text-ever-terracotta font-normal">Guest</th>
              <th className="p-4 text-[10px] tracking-wider uppercase text-ever-terracotta font-normal">Details</th>
              <th className="p-4 text-[10px] tracking-wider uppercase text-ever-terracotta font-normal">Seating</th>
              <th className="p-4 text-[10px] tracking-wider uppercase text-ever-terracotta font-normal">Status</th>
              <th className="p-4 text-[10px] tracking-wider uppercase text-ever-terracotta font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-ever-text-muted text-sm">No reservations found</td>
              </tr>
            ) : (
              reservations.map(r => (
                <tr key={r._id} className="border-b border-ever-border/50 hover:bg-ever-dark transition-colors">
                  <td className="p-4 text-sm text-ever-cream">
                    {r.date} <br /> <span className="text-ever-text-muted">{r.time}</span>
                  </td>
                  <td className="p-4 text-sm text-ever-cream">
                    {r.firstName} {r.lastName} <br />
                    <span className="text-ever-text-muted text-xs">{r.phone}</span>
                  </td>
                  <td className="p-4 text-sm text-ever-text">
                    {r.guests} Guests <br />
                    {r.occasion && <span className="text-xs text-ever-terracotta">{r.occasion}</span>}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border ${
                      r.seatingPreference === 'Inside'
                        ? 'border-[#6da06d]/40 text-[#6da06d] bg-[#6da06d]/10'
                        : r.seatingPreference === 'Terrace'
                          ? 'border-ever-terracotta/40 text-ever-terracotta bg-ever-terracotta/10'
                          : 'border-[#b49050]/40 text-[#b49050] bg-[#b49050]/10'
                    }`}>
                      {r.seatingPreference}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs ${
                      r.status === 'Confirmed' ? 'text-[#7bc97e]'
                        : r.status === 'Cancelled' ? 'text-red-400'
                          : r.status === 'Completed' ? 'text-blue-400'
                            : 'text-yellow-400'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {r.status === 'Pending' && (
                      <button onClick={() => handleStatusChange(r._id, 'Confirmed')} className="text-xs text-[#7bc97e] border border-[#7bc97e]/30 px-2 py-1 rounded hover:bg-[#7bc97e]/10">
                        Confirm
                      </button>
                    )}
                    {r.status !== 'Cancelled' && (
                      <button onClick={() => handleStatusChange(r._id, 'Cancelled')} className="text-xs text-red-400 border border-red-400/30 px-2 py-1 rounded hover:bg-red-400/10">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
