// src/services/viacep.ts
export interface CepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export async function fetchAddressByCep(cep: string): Promise<CepAddress> {
  const cleanedCep = cep.replace(/\D/g, '');
  const res = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
  if (!res.ok) throw new Error('Erro ao consultar ViaCEP');
  const data = await res.json();
  if (data.erro) throw new Error('CEP não encontrado');
  return {
    cep: data.cep,
    logradouro: data.logradouro,
    complemento: data.complemento,
    bairro: data.bairro,
    localidade: data.localidade,
    uf: data.uf
  };
}
