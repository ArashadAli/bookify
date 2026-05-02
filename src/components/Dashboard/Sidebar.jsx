import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Plus, ShoppingCart, Package, Home, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

const navItems = [
  { label: 'Home',       to: '/',          icon: Home,         exact: true },
  { label: 'My Books',   to: '/dashboard', icon: BookOpen,     exact: true },
  { label: 'My Cart',    to: '/cart',      icon: ShoppingCart              },
  { label: 'My Orders',  to: '/orders',    icon: Package                   },
];

const DashboardSidebar = ({ isOpen, onClose }) => {
  const { logout }   = useAuth();
  const { cartCount } = useCart();
  const location     = useLocation();
  const navigate     = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col h-full transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          background: 'var(--bg-elevated)',
          borderRight: '1px solid var(--border)',
        }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-2 px-6 h-16 shrink-0"
          style={{ borderBottom: '1px solid var(--border-light)' }}
        >
          <BookOpen size={20} style={{ color: 'var(--accent)' }} />
          <span
            className="text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
          >
            Bookify
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium no-underline transition-all duration-200"
                style={
                  active
                    ? { background: 'var(--accent-subtle)', color: 'var(--accent)' }
                    : { color: 'var(--ink-secondary)' }
                }
              >
                <item.icon size={17} />
                {item.label}
                {item.icon === ShoppingCart && cartCount > 0 && (
                  <span
                    className="ml-auto w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-red-50"
            style={{ color: 'var(--error)' }}
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;