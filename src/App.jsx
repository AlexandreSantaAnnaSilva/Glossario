import { useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Glossario from './pages/glossario/Glossario';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';

export default function App() {
  const [page, setPage] = useState('home');
  const [papel, setPapel] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null); // ← novo

  function handleLoginSucesso(papelUsuario, nome) { // ← recebe nome
    setPapel(papelUsuario);
    setNomeUsuario(nome); // ← salva nome
    setPage(papelUsuario === 'professor' ? 'professor' : 'aluno');
  }

  function handleLogout() {
    setPapel(null);
    setNomeUsuario(null);
    setPage('home');
  }

  if (page === 'glossario') {
    return <Glossario onBack={() => setPage('home')} nomeUsuario={nomeUsuario} onLogout={handleLogout} />;
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
  return (
    <Home
      onOpenGlossario={() => setPage('glossario')}
      onCadastro={() => setPage('cadastro')}
      onLogin={() => setPage('login')}
      nomeUsuario={nomeUsuario}
      onLogout={handleLogout}
    />
  );
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
      nomeUsuario={nomeUsuario}
      onLogout={handleLogout}
    />
  );
}