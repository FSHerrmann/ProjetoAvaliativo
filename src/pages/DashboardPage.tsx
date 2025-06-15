// src/pages/DashboardPage.tsx
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { usePlaces } from '../contexts/PlacesContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/organisms/NavBar';

export default function DashboardPage() {
  const { users, currentUser } = useUser();
  const { places } = usePlaces();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

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
        </button>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <h2>Lista de Locais de Coleta</h2>
        {places.length === 0 ? (
          <p>Ainda não há locais cadastrados.</p>
        ) : (
          <ul>
            {places.map(p => (
              <li key={p.id}>
                <strong>{p.nome}</strong> — {p.endereco.localidade}/{p.endereco.uf}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
