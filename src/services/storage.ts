// src/services/storage.ts
export interface User {
  id: string;
  nome: string;
  sexo: 'M' | 'F' | 'Outro';
  cpf: string;
  dataNascimento: string; // YYYY-MM-DD
  email: string;
  senha: string;
  endereco: {
    cep: string;
    logradouro?: string;
    complemento?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
  };
}

const STORAGE_KEY = 'recicla365_users';

const initialUsers: User[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-123456efgh78',
    nome: 'Ana Silva',
    sexo: 'F',
    cpf: '12345678909',
    dataNascimento: '1992-04-15',
    email: 'ana.silva@example.com',
    senha: 'senha123',
    endereco: {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP'
    }
  },
  {
    id: 'b2c3d4e5-f678-9012-abcd-234567fghi89',
    nome: 'Bruno Souza',
    sexo: 'M',
    cpf: '98765432100',
    dataNascimento: '1985-11-30',
    email: 'bruno.souza@example.com',
    senha: 'bruno2020',
    endereco: {
      cep: '20040-000',
      logradouro: 'Rua da Assembléia',
      bairro: 'Centro',
      localidade: 'Rio de Janeiro',
      uf: 'RJ'
    }
  },
  {
    id: 'c3d4e5f6-7890-1234-abcd-345678ghij90',
    nome: 'Carla Pereira',
    sexo: 'F',
    cpf: '56473829100',
    dataNascimento: '1990-07-21',
    email: 'carla.pereira@example.com',
    senha: 'carla!@#',
    endereco: {
      cep: '30190-008',
      logradouro: 'Avenida do Contorno',
      bairro: 'Funcionários',
      localidade: 'Belo Horizonte',
      uf: 'MG'
    }
  },
  {
    id: 'd4e5f6g7-8901-2345-abcd-456789ijkl01',
    nome: 'Diego Santos',
    sexo: 'M',
    cpf: '10293847560',
    dataNascimento: '1978-02-10',
    email: 'diego.santos@example.com',
    senha: 'diego!789',
    endereco: {
      cep: '40020-000',
      logradouro: 'Avenida Sete de Setembro',
      bairro: 'Centro',
      localidade: 'Salvador',
      uf: 'BA'
    }
  },
  {
    id: 'e5f6g7h8-9012-3456-abcd-567890jklm12',
    nome: 'Eduarda Lima',
    sexo: 'F',
    cpf: '01928374650',
    dataNascimento: '2000-12-05',
    email: 'eduarda.lima@example.com',
    senha: 'eduarda2000',
    endereco: {
      cep: '70040-010',
      logradouro: 'Praça dos Três Poderes',
      bairro: 'Zona Cívico-Administrativa',
      localidade: 'Brasília',
      uf: 'DF'
    }
  }
];

export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }
  return JSON.parse(data);
}

export function setUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
