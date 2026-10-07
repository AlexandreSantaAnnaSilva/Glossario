import { useState, useEffect } from 'react';
import heroImg from '../../assets/hero.png';
import iconGlossario from '../../assets/icon-glossario.png';
import iconRank from '../../assets/icon-rank.png';
import PerfilDropdown from '../../components/PerfilDropdown';
import './Home.css';

export default function Home({ onOpenGlossario, onCadastro, onLogin, nomeUsuario, onLogout }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('tema') !== 'claro';
  });
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
    localStorage.setItem('tema', darkMode ? 'escuro' : 'claro');
  }, [darkMode]);

  return (
    <div className="home-wrapper">

      <nav className="navbar">
        <span className="navbar-brand">Central de <span className="accent">TI</span></span>
        <div className="navbar-actions">

          {/* Botão de tema */}
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>

          {nomeUsuario ? (
            <div className="navbar-perfil">
              <button
                className="user-avatar"
                onClick={() => setMostrarPerfil(!mostrarPerfil)}
              >
                {nomeUsuario.charAt(0).toUpperCase()}
              </button>
              {mostrarPerfil && (
                <PerfilDropdown
                  nomeUsuario={nomeUsuario}
                  onLogout={() => { setMostrarPerfil(false); onLogout(); }}
                  onNomeAtualizado={(novoNome) => { onNomeAtualizado(novoNome); setMostrarPerfil(false); }}
                />
              )}
            </div>
          ) : (
            <>
              <button className="tool-cta-secondary" onClick={onLogin}>Entrar</button>
              <button className="tool-cta" onClick={onCadastro}>Criar conta</button>
            </>
          )}
        </div>
      </nav>

      <div className="home-hero">
        <img src={heroImg} alt="" className="home-img" />
        <span className="eyebrow">PORTAL DE ESTUDOS</span>
        <h1>Central de <span className="accent">TI</span></h1>
        <p className="home-sub">
          Um só lugar para consultar termos técnicos e treinar os conceitos vistos em aula.
        </p>
      </div>

      <div className="tool-grid">
        <article className="tool-card">
          <div className="tool-icon">
            <img src={iconGlossario} alt="Glossário" className="tool-icon-img" />
          </div>
          <h2>Glossário Técnico</h2>
          <p>Pesquise termos, siglas e protocolos de TI e Redes explicados de forma direta.</p>
          <button className="tool-cta" onClick={onOpenGlossario}>
            Acessar o Glossário →
          </button>
        </article>

        <article className="tool-card is-soon">
          <span className="soon-badge">EM BREVE</span>
          <div className="tool-icon">
            <img src={iconRank} alt="TI Rank" className="tool-icon-img" />
          </div>
          <h2>TI Rank</h2>
          <p>Dispute o ranking de conhecimento da turma em um quiz cronometrado.</p>
          <button className="tool-cta" disabled>Em breve</button>
        </article>
      </div>
    </div>
  );
}