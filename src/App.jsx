import { useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Glossario from './pages/glossario/Glossario';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import Anotacoes from './pages/anotacoes/Anotacoes';

export default function App() {
  const [page, setPage] = useState('home');
  const [papel, setPapel] = useState(null);
  const [nomeUsuario, setNomeUsuario] = useState(null);

  function handleLoginSucesso(papelUsuario, nome) {
    setPapel(papelUsuario);
    setNomeUsuario(nome);
    setPage(papelUsuario === 'professor' ? 'professor' : 'home');
  }

  function handleLogout() {
    setPapel(null);
    setNomeUsuario(null);
    setPage('home');
  }

  function handleNomeAtualizado(novoNome) {
    setNomeUsuario(novoNome);
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

  if (page === 'anotacoes') {
    return <Anotacoes onBack={() => setPage('home')} />;
  }

  if (page === 'professor') {
    return <div style={{color:'#fff', padding:'40px'}}>
      Dashboard do Professor — em breve!
    </div>;
  }

  // home e aluno usam o mesmo componente Home
  return (
    <Home
      onOpenGlossario={() => setPage('glossario')}
      onCadastro={() => setPage('cadastro')}
      onLogin={() => setPage('login')}
      nomeUsuario={nomeUsuario}
      onLogout={handleLogout}
      onNomeAtualizado={handleNomeAtualizado}
      onAnotacoes={() => setPage('anotacoes')}
    />
  );
}