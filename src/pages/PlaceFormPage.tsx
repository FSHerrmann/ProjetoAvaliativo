// src/pages/PlaceFormPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlaces } from '../contexts/PlacesContext';
import { fetchAddressByCep } from '../services/viacep';
import type { CepAddress } from '../services/viacep';
import NavBar from '../components/organisms/NavBar';

export default function PlaceFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { places, addPlace, updatePlace } = usePlaces();

  const [form, setForm] = useState<any>({
    nome: '',
    descricao: '',
    endereco: {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: ''
    },
    latitude: '',
    longitude: '',
    tiposResiduos: [] as string[]
  });

  useEffect(() => {
    if (isEdit && id) {
      const place = places.find(p => p.id === id);
      if (place) {
        setForm({
          nome: place.nome,
          descricao: place.descricao,
          endereco: place.endereco,
          latitude: place.latitude.toString(),
          longitude: place.longitude.toString(),
          tiposResiduos: place.tiposResiduos
        });
      }
    }
  }, [id, isEdit, places]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      const key = name.split('.')[1];
      setForm((prev: any) => ({
        ...prev,
        endereco: { ...prev.endereco, [key]: value }
      }));
    } else if (name === 'tiposResiduos') {
      const opts = (e.target as HTMLSelectElement).selectedOptions;
      const vals = Array.from(opts).map(o => o.value);
      setForm((prev: any) => ({ ...prev, tiposResiduos: vals }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleCepBlur = async () => {
    try {
      const addr: CepAddress = await fetchAddressByCep(form.endereco.cep);
      setForm((prev: any) => ({
        ...prev,
        endereco: { ...prev.endereco, ...addr }
      }));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      endereco: form.endereco,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      tiposResiduos: form.tiposResiduos
    };
    if (isEdit && id) {
      updatePlace(id, payload);
    } else {
      addPlace(payload);
    }
    navigate('/locais');
  };

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <h2>
          {isEdit ? 'Editar Local de Coleta' : 'Cadastrar Local de Coleta'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="nome"
            placeholder="Nome do Local"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.cep"
            placeholder="CEP"
            value={form.endereco.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            required
          />
          <input
            name="endereco.logradouro"
            placeholder="Logradouro"
            value={form.endereco.logradouro}
            readOnly
          />
          <input
            name="endereco.bairro"
            placeholder="Bairro"
            value={form.endereco.bairro}
            readOnly
          />
          <input
            name="endereco.localidade"
            placeholder="Cidade"
            value={form.endereco.localidade}
            readOnly
          />
          <input
            name="endereco.uf"
            placeholder="UF"
            value={form.endereco.uf}
            readOnly
          />
          <input
            name="endereco.complemento"
            placeholder="Complemento"
            value={form.endereco.complemento}
            onChange={handleChange}
          />
          <input
            name="latitude"
            type="number"
            step="any"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            required
          />
          <input
            name="longitude"
            type="number"
            step="any"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            required
          />
          <label>Tipos de Resíduos:</label>
          <select
            name="tiposResiduos"
            multiple
            value={form.tiposResiduos}
            onChange={handleChange}
            required
          >
            <option value="Vidro">Vidro</option>
            <option value="Metal">Metal</option>
            <option value="Papel">Papel</option>
            <option value="Plástico">Plástico</option>
            <option value="Orgânico">Orgânico</option>
            <option value="Baterias">Baterias</option>
          </select>
          <button type="submit">
            {isEdit ? 'Salvar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </>
  );
}
