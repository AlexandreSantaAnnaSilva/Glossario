import { useMemo, useState, useRef, useEffect } from 'react';
import glossario from '../../data/glossario';
import Hero2 from '../../assets/hero2.png';
import './Glossario.css';

export default function Glossario({ onBack }) {
  const [busca, setBusca] = useState("");
  const resultadoRef = useRef(null); // ← estava faltando esta linha

  const indice = useMemo(() => {
    const mapa = new Map();
    glossario.forEach((item) => mapa.set(item.termo.toUpperCase(), item));
    return mapa;
  }, []);

  const termoFormatado = busca.trim().toUpperCase();
  const resultado = indice.get(termoFormatado);

  useEffect(() => {
    if (resultado && resultadoRef.current) {
      resultadoRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [resultado]);

  return (
    <div className="google-wrapper">
      <button className="back-link" onClick={onBack}>← Início</button>

      <header className="main-header">
        <img src={Hero2} alt="" className="glossario-img" />
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

        {busca && (
          <div className="result-card" ref={resultadoRef}> {/* ← ref adicionado aqui */}
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