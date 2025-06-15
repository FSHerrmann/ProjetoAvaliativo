import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PlacesListPage from './pages/PlacesListPage';
import PlaceFormPage from './pages/PlaceFormPage';

export default function App() {
  const { currentUser } = useUser();
  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser ? <Navigate to="/dashboard" /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          currentUser ? <DashboardPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/locais"
        element={
          currentUser ? <PlacesListPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/locais/novo"
        element={
          currentUser ? <PlaceFormPage /> : <Navigate to="/" />
        }
      />
      <Route
        path="/locais/:id"
        element={
          currentUser ? <PlaceFormPage /> : <Navigate to="/" />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
