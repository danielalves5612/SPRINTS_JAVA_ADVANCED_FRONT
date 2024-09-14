import React, { useState } from 'react';
import { createFarm } from '../services/api';

interface FarmFormProps {
  onAddFarm: (farm: Farm) => void;
}

interface Farm {
  id?: number; // O id é opcional
  nome: string;
  latitude: string;
  longitude: string;
  tamanho: number;
}

const FarmForm: React.FC<FarmFormProps> = ({ onAddFarm }) => {
  const [nome, setNome] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [tamanho, setTamanho] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFarm = { nome, latitude, longitude, tamanho };
    try {
      const response = await createFarm(newFarm);
      if (response.status === 200) {
        onAddFarm(response.data); // Aqui a API deve retornar a fazenda já com o id
      }
    } catch (error) {
      console.error('Erro ao criar fazenda', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da fazenda"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tamanho (ha)"
        value={tamanho}
        onChange={(e) => setTamanho(Number(e.target.value))}
      />
      <button type="submit">Adicionar Fazenda</button>
    </form>
  );
};

export default FarmForm;
