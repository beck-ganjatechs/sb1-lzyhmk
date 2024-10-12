import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, LogIn, LogOut, UserPlus } from 'lucide-react';
import { getCurrentUser, logout } from '../api/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf size={24} />
          <span className="text-xl font-bold">Cannabis Inventory</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-green-200">Home</Link></li>
            {currentUser ? (
              <>
                <li><Link to="/product-entry" className="hover:text-green-200">Add Product</Link></li>
                <li><Link to="/admin" className="hover:text-green-200">Admin</Link></li>
                <li>
                  <button onClick={handleLogout} className="flex items-center hover:text-green-200">
                    <LogOut size={18} className="mr-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="flex items-center hover:text-green-200">
                    <LogIn size={18} className="mr-1" /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center hover:text-green-200">
                    <UserPlus size={18} className="mr-1" /> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;