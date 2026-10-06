import { useState } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Glossario from './pages/glossario/Glossario';

export default function App() {
  const [page, setPage] = useState('home');

  if (page === 'glossario') {
    return <Glossario onBack={() => setPage('home')} />;
  }

  return <Home onOpenGlossario={() => setPage('glossario')} />;
}
