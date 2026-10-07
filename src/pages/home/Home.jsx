import heroImg from '../../assets/hero.png';
import iconGlossario from '../../assets/icon-glossario.png';
import iconRank from '../../assets/icon-rank.png';
import './Home.css';

export default function Home({ onOpenGlossario , onCadastro, onLogin }) {
  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <img src={heroImg} alt="" className="home-img" />
        <span className="eyebrow">PORTAL DE ESTUDOS</span>
        <h1>Central de <span className="accent">TI</span></h1>
        <p className="home-sub">
          Um só lugar para consultar termos técnicos e treinar os conceitos vistos em aula.
        </p>
        <div className="hero-actions">
          <button className="tool-cta" onClick={onLogin}>Entrar</button>
          <button className="tool-cta-secondary" onClick={onCadastro}>Criar conta</button>
        </div>
      </div>

      <div className="tool-grid">

        {/* Card Glossário */}
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

        {/* Card TI Rank */}
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