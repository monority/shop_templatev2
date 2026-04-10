import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useCart } from '../store';
import PageMeta from '../components/ui/PageMeta';
import { formatPrice, formatDate } from '../utils/format';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'orders',   label: 'Orders' },
  { id: 'settings', label: 'Settings' },
];

const RECENT_ORDERS = [
  { id: '#ORD-001', date: '2026-03-15', total: 299.99, status: 'Delivered', items: 2 },
  { id: '#ORD-002', date: '2026-03-10', total: 159.50, status: 'Shipped',   items: 1 },
  { id: '#ORD-003', date: '2026-02-28', total: 449.00, status: 'Processing',items: 3 },
];

const STATUS_COLORS = {
  Delivered:  'text-success',
  Shipped:    'text-white/60',
  Processing: 'text-warning',
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser, logout } = useAuth();
  const { items } = useCart();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData]   = useState({
    name:    user?.username || '',
    email:   user?.email    || '',
    phone:   user?.phone    || '',
    address: user?.address  || '',
  });

  if (!isAuthenticated) return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/20 text-sm tracking-widest uppercase mb-8">Sign in required</p>
        <button className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors" onClick={() => navigate('/login')}>
          Sign In
        </button>
      </div>
    </div>
  );

  const handleSave = useCallback((e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    setIsEditing(false);
  }, [user, formData, setUser]);

  const Field = ({ label, value }) => (
    <div>
      <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-1">{label}</p>
      <p className="text-white text-sm">{value || <span className="text-white/20">Not set</span>}</p>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <PageMeta title="My Account" />

      {/* Header */}
      <div className="border-b border-white/[0.06] py-16">
        <div className="container">
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Account</p>
          <h1 className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.95 }}>
            {user?.username || 'My Account'}
          </h1>
          <p className="text-white/25 text-sm mt-2">{user?.email}</p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/[0.06]">
              <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{user?.username}</p>
                <p className="text-white/30 text-xs">{user?.email}</p>
              </div>
            </div>

            {/* Tabs */}
            <nav className="space-y-1" aria-label="Account navigation">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-0 py-3 text-sm border-b border-white/[0.06] transition-colors flex items-center justify-between ${
                    activeTab === tab.id ? 'text-white' : 'text-white/30 hover:text-white'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="w-1 h-1 rounded-full bg-white" aria-hidden="true" />}
                </button>
              ))}
            </nav>

            {/* Stats */}
            <div className="mt-8 space-y-4">
              {[['Total Orders', '12'], ['Cart Items', items.length], ['Favorites', user?.favorites?.length || 0]].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-white/25 text-xs tracking-wide">{label}</span>
                  <span className="text-white text-xs font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">

            {activeTab === 'overview' && (
              <>
                {/* Account info */}
                <div className="border border-white/[0.06] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase">Account Information</p>
                    <button onClick={() => setIsEditing(!isEditing)} className="text-white/30 text-xs tracking-widest uppercase hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {[['name','Full Name','name'],['email','Email','email'],['phone','Phone','tel'],['address','Address','street-address']].map(([key, label, auto]) => (
                          <div key={key}>
                            <label className="block text-white/30 text-[10px] tracking-[0.2em] uppercase mb-2">{label}</label>
                            <input type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} autoComplete={auto} className="input w-full" />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="px-6 py-3 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 border border-white/10 text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/30 transition-colors">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Field label="Full Name" value={user?.username} />
                      <Field label="Email"     value={user?.email} />
                      <Field label="Phone"     value={user?.phone} />
                      <Field label="Address"   value={user?.address} />
                    </div>
                  )}
                </div>

                {/* Recent orders */}
                <div className="border border-white/[0.06] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase">Recent Orders</p>
                    <button onClick={() => setActiveTab('orders')} className="text-white/30 text-xs tracking-widest uppercase hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">View All</button>
                  </div>
                  <div className="space-y-0 divide-y divide-white/[0.06]">
                    {RECENT_ORDERS.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-4">
                        <div>
                          <p className="text-white text-sm font-medium">{order.id}</p>
                          <p className="text-white/25 text-xs mt-0.5">{formatDate(order.date)} · {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm">{formatPrice(order.total)}</p>
                          <p className={`text-xs mt-0.5 ${STATUS_COLORS[order.status]}`}>{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="border border-white/[0.06] p-6">
                <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Order History</p>
                <div className="space-y-0 divide-y divide-white/[0.06]">
                  {RECENT_ORDERS.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/20">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{order.id}</p>
                          <p className="text-white/25 text-xs mt-0.5">{formatDate(order.date)} · {order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm">{formatPrice(order.total)}</p>
                        <p className={`text-xs mt-0.5 ${STATUS_COLORS[order.status]}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="border border-white/[0.06] p-6">
                  <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Notifications</p>
                  <div className="space-y-0 divide-y divide-white/[0.06]">
                    {[['Email Notifications', 'Receive updates about your orders', true], ['Marketing Emails', 'News and promotional offers', false]].map(([title, desc, checked]) => (
                      <div key={title} className="flex items-center justify-between py-4">
                        <div>
                          <p className="text-white text-sm">{title}</p>
                          <p className="text-white/25 text-xs mt-0.5">{desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
                          <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-white/80 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[#0a0a0a] after:rounded-full after:h-4 after:w-4 after:transition-all" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-white/[0.06] p-6">
                  <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Security</p>
                  <div className="space-y-0 divide-y divide-white/[0.06]">
                    <button className="w-full flex items-center justify-between py-4 text-left group">
                      <div>
                        <p className="text-white text-sm">Change Password</p>
                        <p className="text-white/25 text-xs mt-0.5">Update your password regularly</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20 group-hover:text-white transition-colors"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                    <button
                      className="w-full flex items-center justify-between py-4 text-left group"
                      onClick={() => logout()}
                    >
                      <div>
                        <p className="text-accent text-sm">Sign Out</p>
                        <p className="text-white/25 text-xs mt-0.5">Log out of your account</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/40 group-hover:text-accent transition-colors"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
