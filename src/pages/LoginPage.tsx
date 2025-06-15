// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { fetchAddressByCep } from '../services/viacep';
import type { CepAddress } from '../services/viacep';

export default function LoginPage() {
  const { login, register } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState<any>({
    nome: '',
    sexo: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    senha: '',
    endereco: {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: ''
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, key] = name.split('.');
      setForm((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setForm((prev: any) => ({
        ...prev,
        [name]: value
      }));
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
    if (isRegister) {
      if (!register(form)) {
        alert('CPF já cadastrado!');
        return;
      }
      alert('Cadastro OK! Agora faça login.');
      setIsRegister(false);
    } else {
      if (!login(form.email, form.senha)) {
        alert('Credenciais inválidas!');
      }
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: 'auto', padding: 20 }}>
      <h2>{isRegister ? 'Cadastro' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <input
              name="sexo"
              placeholder="Sexo"
              value={form.sexo}
              onChange={handleChange}
              required
            />
            <input
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
              required
            />
            <input
              name="dataNascimento"
              type="date"
              value={form.dataNascimento}
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
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</button>
      </form>
      <p style={{ marginTop: 10 }}>
        {isRegister ? 'Já tem conta?' : 'Não tem conta?'}{' '}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          {isRegister ? 'Faça login' : 'Cadastre-se'}
        </button>
      </p>
    </div>
  );
}
