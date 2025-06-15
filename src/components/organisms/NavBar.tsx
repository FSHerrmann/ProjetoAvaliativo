// src/components/organisms/NavBar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

export default function NavBar() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkStyle = { marginRight: 16, textDecoration: 'none', color: '#0070f3' };
  const activeStyle = { fontWeight: 'bold' };

  return (
    <nav style={{ padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <NavLink to="/dashboard" style={linkStyle} activeStyle={activeStyle}>
        Dashboard
      </NavLink>
      <NavLink to="/locais" style={linkStyle} activeStyle={activeStyle}>
        Locais de Coleta
      </NavLink>
      <button
        onClick={handleLogout}
        style={{ float: 'right', background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}
      >
        Sair
      </button>
    </nav>
  );
}
