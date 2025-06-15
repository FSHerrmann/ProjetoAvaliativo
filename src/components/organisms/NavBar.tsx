// src/components/organisms/NavBar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function NavBar() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const baseLinkStyle: React.CSSProperties = {
    marginRight: 16,
    textDecoration: 'none',
    color: '#0070f3'
  };
  const activeLinkStyle: React.CSSProperties = {
    fontWeight: 'bold'
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #ccc', background: '#fff' }}>
      <NavLink
        to="/dashboard"
        style={({ isActive }) =>
          isActive
            ? { ...baseLinkStyle, ...activeLinkStyle }
            : baseLinkStyle
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/locais"
        style={({ isActive }) =>
          isActive
            ? { ...baseLinkStyle, ...activeLinkStyle }
            : baseLinkStyle
        }
      >
        Locais de Coleta
      </NavLink>

      <button
        onClick={handleLogout}
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          color: '#0070f3',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </nav>
  );
}
