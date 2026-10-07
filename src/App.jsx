import { useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Glossario from './pages/glossario/Glossario';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';

export default function App() {
  const [page, setPage] = useState('home');
  const [papel, setPapel] = useState(null);

  function handleLoginSucesso(papelUsuario) {
    setPapel(papelUsuario);
    setPage(papelUsuario === 'professor' ? 'professor' : 'aluno');
  }

  if (page === 'glossario') {
    return <Glossario onBack={() => setPage('home')} />;
  }

  if (page === 'cadastro') {
    return <Cadastro onVoltar={() => setPage('login')} />;
  }

  if (page === 'login') {
    return <Login
      onVoltar={() => setPage('home')}
      onLoginSucesso={handleLoginSucesso}
    />;
  }

  if (page === 'aluno') {
    return <Glossario onBack={() => setPage('home')} />;
    // Futuramente: dashboard completo do aluno
  }

  if (page === 'professor') {
    return <div style={{color:'#fff', padding:'40px'}}>
      Dashboard do Professor — em breve!
    </div>;
  }

  return (
    <Home
      onOpenGlossario={() => setPage('glossario')}
      onCadastro={() => setPage('cadastro')}
      onLogin={() => setPage('login')}
    />
  );
}