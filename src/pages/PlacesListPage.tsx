// src/pages/PlacesListPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaces } from '../contexts/PlacesContext';
import NavBar from '../components/organisms/NavBar';

export default function PlacesListPage() {
  const { places, deletePlace } = usePlaces();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Locais de Coleta</h2>
        <button onClick={() => navigate('/locais/novo')}>
          + Novo Local
        </button>
        <ul>
          {places.map((p) => (
            <li key={p.id} style={{ marginTop: 10 }}>
              <strong>{p.nome}</strong> – {p.descricao}
              <div>
                <button onClick={() => navigate(`/locais/${p.id}`)}>
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm('Deseja realmente excluir este local?')
                    ) {
                      deletePlace(p.id);
                    }
                  }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
