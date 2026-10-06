import heroImg from '../../assets/hero.png';
import './Home.css';


const TOOLS = [
  {
    icon: '📖',
    title: 'Glossário Técnico',
    description: 'Pesquise termos, siglas e protocolos de TI e Redes explicados de forma direta.',
    cta: 'Acessar o Glossário',
    status: 'live',
  },
  {
    icon: '🏆',
    title: 'TI Rank',
    description: 'Dispute o ranking de conhecimento da turma em um quiz cronometrado.',
    cta: 'Em breve',
    status: 'soon',
  },
];

export default function Home({ onOpenGlossario }) {
  return (
    <div className="home-wrapper">
      <div className="home-hero">
        <img src={heroImg} alt="" className="hero-img" />
        <span className="eyebrow">PORTAL DE ESTUDOS</span>
        <h1>Central de <span className="accent">TI</span></h1>
        <p className="home-sub">
          Um só lugar para consultar termos técnicos e treinar os conceitos vistos em aula.
        </p>
      </div>

      <div className="tool-grid">
        {TOOLS.map((tool) => (
          <article
            key={tool.title}
            className={`tool-card${tool.status === 'soon' ? ' is-soon' : ''}`}
          >
            {tool.status === 'soon' && <span className="soon-badge">EM BREVE</span>}
            <div className="tool-icon">{tool.icon}</div>
            <h2>{tool.title}</h2>
            <p>{tool.description}</p>
            <button
              className="tool-cta"
              disabled={tool.status === 'soon'}
              onClick={tool.status === 'live' ? onOpenGlossario : undefined}
            >
              {tool.cta}{tool.status === 'live' && ' →'}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
