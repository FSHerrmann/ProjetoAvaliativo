import React from 'react';
import { useUser } from '../contexts/UserContext';
import { usePlaces } from '../contexts/PlacesContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { users, currentUser, logout } = useUser();
  const { places } = usePlaces();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>Bem-vindo, {currentUser?.nome}!</h1>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        <div>
          <h3>Usuários Ativos</h3>
          <p>{users.length}</p>
        </div>
        <div>
          <h3>Locais Cadastrados</h3>
          <p>{places.length}</p>
        </div>
      </div>
      <button onClick={() => navigate('/locais')}>
        Ver Locais de Coleta
      </button>{' '}
      <button onClick={logout}>Sair</button>
    </div>
  );
}
