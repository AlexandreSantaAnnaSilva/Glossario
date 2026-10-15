import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import AnotacaoEditor from './AnotacaoEditor';
import './Anotacoes.css';

const MATERIAS = [
  'Gestão de Computadores e Sistemas Operacionais',
  'Atendimento e Suporte ao Usuário',
  'Redes de Comunicação de Dados',
];

export default function Anotacoes({ onBack }) {
  const [anotacoes, setAnotacoes] = useState([]);
  const [criando, setCriando] = useState(false);
  const [editando, setEditando] = useState(null);
  const [materiaFiltro, setMateriaFiltro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState(MATERIAS[0]);
  const [dataAula, setDataAula] = useState('');
  const [professor, setProfessor] = useState('Alexandre');
  const [conteudo, setConteudo] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarAnotacoes();
  }, []);

  async function carregarAnotacoes() {
    setCarregando(true);
    const uid = auth.currentUser.uid;
    const q = query(
      collection(db, 'anotacoes'),
      where('uid', '==', uid),
      orderBy('criadoEm', 'desc')
    );
    const snap = await getDocs(q);
    setAnotacoes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    setCarregando(false);
  }

  // Abre o modal de edição preenchido com os dados da anotação
  function abrirEdicao(anotacao) {
    setEditando(anotacao);
    setTitulo(anotacao.titulo);
    setMateria(anotacao.materia);
    setDataAula(anotacao.dataAula);
    setProfessor(anotacao.professor);
    setConteudo(anotacao.conteudo);
  }

  function fecharModal() {
    setCriando(false);
    setEditando(null);
    setTitulo('');
    setMateria(MATERIAS[0]);
    setDataAula('');
    setProfessor('Alexandre');
    setConteudo('');
  }

  async function handleSalvar() {
    if (!titulo.trim() || !conteudo.trim()) return;
    setSalvando(true);
    try {
      const uid = auth.currentUser.uid;

      if (editando) {
        // ← Atualiza anotação existente
        await updateDoc(doc(db, 'anotacoes', editando.id), {
          titulo,
          materia,
          dataAula,
          professor,
          conteudo,
        });
      } else {
        // ← Cria nova anotação
        await addDoc(collection(db, 'anotacoes'), {
          uid,
          titulo,
          materia,
          dataAula,
          professor,
          conteudo,
          criadoEm: serverTimestamp(),
        });
      }

      fecharModal();
      carregarAnotacoes();
    } catch (err) {
      console.error('Erro ao salvar:', err);
    } finally {
      setSalvando(false);
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Tem certeza que deseja excluir esta anotação?')) return;
    try {
      await deleteDoc(doc(db, 'anotacoes', id));
      carregarAnotacoes();
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  }

  const agrupadas = MATERIAS.reduce((acc, m) => {
    acc[m] = anotacoes.filter(a => a.materia === m);
    return acc;
  }, {});

  const materiasVisiveis = materiaFiltro ? [materiaFiltro] : MATERIAS;
  const modalAberto = criando || editando !== null;

  return (
    <div className="anotacoes-wrapper">

      <header className="anotacoes-header">
        <button className="back-link" onClick={onBack}>← Início</button>
        <h1>Minhas Anotações</h1>
        <button className="nova-btn" onClick={() => setCriando(true)}>
          + Nova Anotação
        </button>
      </header>

      <div className="filtros">
        <button
          className={`filtro-btn ${!materiaFiltro ? 'ativo' : ''}`}
          onClick={() => setMateriaFiltro(null)}
        >
          Todas
        </button>
        {MATERIAS.map(m => (
          <button
            key={m}
            className={`filtro-btn ${materiaFiltro === m ? 'ativo' : ''}`}
            onClick={() => setMateriaFiltro(m)}
          >
            {m.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Modal de criar/editar */}
      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2>{editando ? 'Editar Anotação' : 'Nova Anotação'}</h2>

            <div className="campo">
              <label>Título da aula</label>
              <input
                type="text"
                placeholder="Ex: Introdução ao protocolo TCP/IP"
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
              />
            </div>

            <div className="campo-row">
              <div className="campo">
                <label>Matéria</label>
                <select value={materia} onChange={e => setMateria(e.target.value)}>
                  {MATERIAS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="campo">
                <label>Data da aula</label>
                <input
                  type="date"
                  value={dataAula}
                  onChange={e => setDataAula(e.target.value)}
                />
              </div>
            </div>

            <div className="campo">
              <label>Professor</label>
              <input
                type="text"
                placeholder="Nome do professor"
                value={professor}
                onChange={e => setProfessor(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Conteúdo da aula</label>
              <AnotacaoEditor value={conteudo} onChange={setConteudo} />
            </div>

            <div className="modal-acoes">
              <button className="cancelar-btn" onClick={fecharModal}>
                Cancelar
              </button>
              <button className="salvar-btn" onClick={handleSalvar} disabled={salvando}>
                {salvando ? 'Salvando...' : editando ? 'Salvar Edição' : 'Salvar Anotação'}
              </button>
            </div>
          </div>
        </div>
      )}

      {carregando ? (
        <p className="carregando">Carregando anotações...</p>
      ) : (
        <div className="materias-grid">
          {materiasVisiveis.map(m => (
            <div key={m} className="materia-coluna">
              <h2 className="materia-titulo">{m}</h2>
              {agrupadas[m].length === 0 ? (
                <p className="vazio">Nenhuma anotação ainda.</p>
              ) : (
                agrupadas[m].map(a => (
                  <div key={a.id} className="anotacao-card">
                    <div className="anotacao-meta">
                      <span className="anotacao-data">📅 {a.dataAula || 'Sem data'}</span>
                      <span className="anotacao-prof">👤 {a.professor}</span>
                      {/* ← Botões de ação */}
                      <div className="anotacao-acoes">
                        <button className="acao-btn" onClick={() => abrirEdicao(a)}>✏️</button>
                        <button className="acao-btn acao-deletar" onClick={() => handleDeletar(a.id)}>🗑️</button>
                      </div>
                    </div>
                    <h3 className="anotacao-titulo">{a.titulo}</h3>
                    <div
                      className="anotacao-preview"
                      dangerouslySetInnerHTML={{ __html: a.conteudo }}
                    />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}