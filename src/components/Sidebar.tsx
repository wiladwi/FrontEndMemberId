import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setTimeout(() => {
        setIsSidebarOpen(false);
      }, 300); // Delay sebelum menutup sidebar
    } else {
      setIsSidebarOpen(true);
    }
  };
  const DeleteToken=()=>{
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`bg-gray-200 h-screen p-4 transition-all ${
        isSidebarOpen ? 'w-60' : 'w-20'
      } ${isSidebarOpen ? 'overflow-x-hidden' : ''}`}
    >
      <div className="flex justify-end mb-4">
        <button className="text-xl focus:outline-none" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className={`mb-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <img src="icons8-star-48.png" alt="Logo" className="w-16 h-16 mx-auto" />
        <div className={`mt-4 ms-5 font-bold m-2 ${isSidebarOpen ? 'block' : 'hidden'}`}> Award Menu</div>
      </div>
      <nav>
        <ul className={`mt-4 ms-5 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <li>
            <NavLink to="/" className="block py-2">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/card" className="block py-2">
              Card
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="block py-2">
              Profile
            </NavLink>
          </li>

          <li onClick={()=>DeleteToken()}>
            <NavLink to="/login" className="block py-2">
              Logout
            </NavLink>
          </li>
          {/* No NavLink to /sidebar here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
