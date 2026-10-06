import { useMemo,useState } from 'react';
import glossario from '../../data/glossario';
import './Glossario.css';


export default function Glossario({ onBack }) {
  const [busca, setBusca] = useState("");

  const indice = useMemo(() => {
    const mapa = new Map();
    glossario.forEach((item) => mapa.set(item.termo.toUpperCase(), item));
    return mapa;
  }, []);


  const termoFormatado = busca.trim().toUpperCase();
  const resultado = indice.get(termoFormatado);

  return (
    <div className="google-wrapper">
      <button className="back-link" onClick={onBack}>← Início</button>

      <header className="main-header">
        <h1>Glossário</h1>
      </header>

      <main className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Pesquise um protocolo ou termo técnico..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            autoFocus
          />
        </div>

        {/* A janela (card) só aparece se houver algo digitado */}
        {busca && (
          <div className="result-card">
            {resultado ? (
              <div className="result-content">
                <h2>{resultado.termo}</h2>
                <p>{resultado.definicao}</p>
              </div>
            ) : (
              <p className="not-found">Nenhum resultado encontrado para "{busca}"</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
