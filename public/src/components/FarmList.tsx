import React, { useState, useEffect } from 'react';
import { getFarms } from '../services/api';
import FarmForm from './FarmForm';

interface Farm {
    id?: number; // O id pode ser indefinido até que seja gerado
    nome: string;
    latitude: string;
    longitude: string;
    tamanho: number;
  }

const FarmList: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await getFarms();
        setFarms(response.data);
      } catch (error) {
        console.error('Erro ao carregar as fazendas', error);
      }
    };
    fetchFarms();
  }, []);

  const handleAddFarm = (newFarm: Farm) => {
    setFarms([...farms, newFarm]);
  };

  return (
    <div>
      <h1>Fazendas Cadastradas</h1>
      <FarmForm onAddFarm={handleAddFarm} />
      <ul>
        {farms.map((farm) => (
          <li key={farm.id}>
            {farm.nome} - {farm.latitude} - {farm.longitude} - {farm.tamanho} hectares
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FarmList;
