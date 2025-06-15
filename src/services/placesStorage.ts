export interface Place {
  id: string;
  userId: string;
  nome: string;
  descricao: string;
  endereco: {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: string;
  };
  latitude: number;
  longitude: number;
  tiposResiduos: string[];
}

const STORAGE_KEY = 'recicla365_places';

export function getPlaces(): Place[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initial: Place[] = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

export function setPlaces(places: Place[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
}
