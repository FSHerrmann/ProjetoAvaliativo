import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import { getPlaces, setPlaces, Place } from '../services/placesStorage';
import type { Place as PlaceType } from '../services/placesStorage';
import { useUser } from './UserContext';

interface PlacesContextData {
  places: PlaceType[];
  addPlace: (data: Omit<PlaceType, 'id' | 'userId'>) => void;
  updatePlace: (
    id: string,
    data: Omit<PlaceType, 'id' | 'userId'>
  ) => void;
  deletePlace: (id: string) => void;
}

const PlacesContext = createContext<PlacesContextData | undefined>(undefined);

export const PlacesProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useUser();
  const [places, setPlaceList] = useState<PlaceType[]>([]);

  useEffect(() => {
    setPlaceList(getPlaces());
  }, []);

  const addPlace = (data: Omit<PlaceType, 'id' | 'userId'>) => {
    if (!currentUser) return;
    const newPlace: PlaceType = {
      id: Date.now().toString(),
      userId: currentUser.id,
      ...data
    };
    const updated = [...places, newPlace];
    setPlaceList(updated);
    setPlaces(updated);
  };

  const updatePlace = (
    id: string,
    data: Omit<PlaceType, 'id' | 'userId'>
  ) => {
    const updated = places.map((p) =>
      p.id === id ? { ...p, ...data } : p
    );
    setPlaceList(updated);
    setPlaces(updated);
  };

  const deletePlace = (id: string) => {
    const updated = places.filter((p) => p.id !== id);
    setPlaceList(updated);
    setPlaces(updated);
  };

  return (
    <PlacesContext.Provider
      value={{ places, addPlace, updatePlace, deletePlace }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export function usePlaces() {
  const context = useContext(PlacesContext);
  if (!context)
    throw new Error('usePlaces must be used within PlacesProvider');
  return context;
}
