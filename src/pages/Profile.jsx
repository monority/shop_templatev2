import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useCart } from '../store';
import PageMeta from '../components/ui/PageMeta';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, setUser } = useAuth();
  const { items } = useCart();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  if (!isAuthenticated) {
    return (
      <div className="bg-light min-h-screen pt-24 pb-12">
        <div className="container">
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-dark mb-4">Sign In Required</h1>
            <p className="text-gray mb-6">Please sign in to view your profile and manage your account.</p>
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const recentOrders = [
    { id: '#ORD-001', date: '2026-03-15', total: 299.99, status: 'Delivered', items: 2 },
    { id: '#ORD-002', date: '2026-03-10', total: 159.50, status: 'Shipped', items: 1 },
    { id: '#ORD-003', date: '2026-02-28', total: 449.00, status: 'Processing', items: 3 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-light min-h-screen pt-24 pb-12">
      <PageMeta title="My Account" />
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray">
            <button onClick={() => navigate('/')} className="hover:text-dark transition-colors">Home</button>
            <span>/</span>
            <span>My Account</span>
          </div>
          <h1 className="text-3xl font-bold text-dark">My Account</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand text-white flex items-center justify-center text-3xl font-bold">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h2 className="font-bold text-dark">{user?.username || 'User'}</h2>
                <p className="text-sm text-gray">{user?.email || 'user@example.com'}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                        ? 'bg-brand text-white'
                        : 'text-dark hover:bg-gray-100'
                      }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="font-semibold text-dark mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray text-sm">Total Orders</span>
                  <span className="font-semibold text-dark">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray text-sm">Cart Items</span>
                  <span className="font-semibold text-dark">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray text-sm">Favorites</span>
                  <span className="font-semibold text-dark">{user?.favorites?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Account Info Card */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-dark">Account Information</h2>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Full Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input"
                            autoComplete="name"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input"
                            autoComplete="email"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input"
                            autoComplete="tel"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Address</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="input"
                            autoComplete="street-address"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray mb-1">Full Name</p>
                        <p className="font-medium text-dark">{user?.username || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray mb-1">Email</p>
                        <p className="font-medium text-dark">{user?.email || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray mb-1">Phone</p>
                        <p className="font-medium text-dark">{user?.phone || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray mb-1">Address</p>
                        <p className="font-medium text-dark">{user?.address || 'Not set'}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Orders Preview */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-dark">Recent Orders</h2>
                    <button
                      className="text-brand font-medium hover:underline"
                      onClick={() => setActiveTab('orders')}
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <p className="font-semibold text-dark">{order.id}</p>
                          <p className="text-sm text-gray">{order.date} • {order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-dark">${order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-success/10 text-success' :
                              order.status === 'Shipped' ? 'bg-brand/10 text-brand' :
                                'bg-warning/10 text-warning'
                            }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-dark mb-6">Order History</h2>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-brand/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-dark">{order.id}</p>
                          <p className="text-sm text-gray">{order.date} • {order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-dark">${order.total.toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-success/10 text-success' :
                            order.status === 'Shipped' ? 'bg-brand/10 text-brand' :
                              'bg-warning/10 text-warning'
                          }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-dark mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-dark">Email Notifications</p>
                        <p className="text-sm text-gray">Receive updates about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-dark">Marketing Emails</p>
                        <p className="text-sm text-gray">Receive news and promotional offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h2 className="text-xl font-bold text-dark mb-6">Security</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-dark">Change Password</p>
                        <p className="text-sm text-gray">Update your password regularly</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                    <button
                      className="w-full flex items-center justify-between p-4 bg-error/5 rounded-xl hover:bg-error/10 transition-colors text-error"
                      onClick={() => setUser(null)}
                    >
                      <div>
                        <p className="font-medium">Sign Out</p>
                        <p className="text-sm opacity-70">Log out of your account</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
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
