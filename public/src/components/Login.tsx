import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api'; // Importa a função de login

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        navigate('/farms');
      }
    } catch (error) {
      console.error('Erro ao fazer login', error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <h1>Farm CPA</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <p onClick={() => navigate('/signup')}>Criar conta</p>
      </form>
    </div>
  );
};

export default Login;
