import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Farm CPA - Cadastro</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;
