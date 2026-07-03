'use client';
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState('breakfast');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch menu items
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/menu`);
        if (res.ok) {
          const data = await res.json();
          setMenuItems(data);
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const tabs = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'brunch', label: 'Brunch' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'bar', label: 'Mocktails & Coffee' }
  ];

  const filteredMenu = menuItems.filter(item => item.category === activeTab);

  return (
    <main className="min-h-screen">
      <div className="h-[360px] bg-cover bg-center flex items-center justify-center relative mt-[72px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80')" }}>
        <div className="absolute inset-0 bg-ever-dark/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[11px] font-semibold tracking-[4px] uppercase text-ever-terracotta mb-2.5">Pure Vegetarian · All Day Menu</p>
          <h1 className="font-playfair text-[56px] text-ever-cream font-bold leading-tight">The Ever House Kitchen</h1>
          <p className="text-[11px] tracking-[2px] uppercase text-ever-text-muted mt-3">100% Vegetarian · Seasonal · Updated Regularly</p>
        </div>
      </div>

      <div className="bg-ever-dark-2">
        <div className="flex justify-center border-b border-ever-border overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`bg-transparent whitespace-nowrap font-inter text-[11px] font-semibold tracking-[2px] uppercase px-[26px] py-[18px] cursor-pointer border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-ever-terracotta border-ever-terracotta'
                  : 'text-ever-text-muted border-transparent hover:text-ever-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-[72px] px-6 md:px-12 max-w-[1100px] mx-auto min-h-[400px]">
        <h2 className="font-playfair text-[32px] text-ever-cream mb-1.5 capitalize">{activeTab}</h2>
        <p className="text-[13px] text-ever-text-muted mb-[52px]">
          {activeTab === 'breakfast' && 'Served 8:00 am – 11:30 am daily · All items are pure vegetarian'}
          {activeTab === 'brunch' && 'Saturday & Sunday · 11:00 am – 3:00 pm · All items are pure vegetarian'}
          {activeTab === 'lunch' && 'Served 12:00 pm – 4:00 pm daily · All items are pure vegetarian'}
          {activeTab === 'dinner' && 'Served 5:00 pm – 11:30 pm daily · All items are pure vegetarian'}
          {activeTab === 'bar' && 'Available all day · Alcohol-free'}
        </p>

        {loading ? (
          <div className="text-center text-ever-text-muted py-20">Loading menu...</div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center text-ever-text-muted py-20">No items available for this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {filteredMenu.map((item) => (
              <div key={item._id} className="bg-ever-dark-2 p-[26px_30px] flex justify-between items-start gap-5 transition-colors duration-200 hover:bg-ever-dark-3">
                <div>
                  <h4 className="font-playfair text-[17px] text-ever-cream mb-1.5">{item.name}</h4>
                  <p className="text-[13px] text-ever-text-muted leading-[1.65]">{item.description}</p>
                  
                  {item.badges && item.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {item.badges.map((badge, idx) => {
                        let badgeClass = "border border-ever-border text-ever-text-muted";
                        if (badge.toLowerCase() === 'bestseller' || badge.toLowerCase().includes('chef')) {
                          badgeClass = "bg-ever-terracotta/10 text-ever-terracotta border-ever-terracotta/30";
                        } else if (badge.toLowerCase() === 'vegetarian' || badge.toLowerCase() === 'veg') {
                          badgeClass = "bg-[#4caf50]/10 text-[#7bc97e] border-[#4caf50]/30";
                        } else if (badge.toLowerCase() === 'vegan') {
                          badgeClass = "bg-[#4caf50]/15 text-[#5db85d] border-[#4caf50]/40";
                        } else if (badge.toLowerCase().includes('jain')) {
                          badgeClass = "bg-[#b49050]/10 text-[#b49050] border-[#b49050]/35";
                        }
                        
                        return (
                          <span key={idx} className={`text-[10px] tracking-[1px] uppercase px-2 py-0.5 rounded-[2px] inline-block ${badgeClass}`}>
                            {badge}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="font-playfair text-[19px] text-ever-terracotta whitespace-nowrap flex-shrink-0">
                  ₹{item.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
