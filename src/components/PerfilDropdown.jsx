import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './PerfilDropdown.css';

export default function PerfilDropdown(
  { nomeUsuario, onLogout, onNomeAtualizado, onAnotacoes }
) {
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(nomeUsuario);
  const [salvando, setSalvando] = useState(false);

  async function handleSalvarNome() {
    if (!novoNome.trim()) return;
    setSalvando(true);
    try {
      const { auth } = await import('../firebase');
      const uid = auth.currentUser.uid;
      await updateDoc(doc(db, 'usuarios', uid), { nome: novoNome });
      onNomeAtualizado(novoNome);
      setEditando(false);
    } catch (err) {
      console.error('Erro ao salvar nome:', err);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="perfil-dropdown">

      {/* Avatar e nome */}
      <div className="perfil-topo">
        <div className="perfil-avatar">
          {nomeUsuario.charAt(0).toUpperCase()}
        </div>
        <span className="perfil-nome">{nomeUsuario}</span>
      </div>

      <div className="perfil-divider" />

      {/* Minhas Anotações ← novo */}
      <button className="perfil-item" onClick={onAnotacoes}>
        📝 Minhas Anotações
      </button>

      <div className="perfil-divider" />

      {/* Editar nome */}
      {editando ? (
        <div className="perfil-editar">
          <input
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            placeholder="Novo nome"
            autoFocus
          />
          <div className="perfil-editar-acoes">
            <button onClick={handleSalvarNome} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
            <button className="cancelar" onClick={() => { 
              setEditando(false); setNovoNome(nomeUsuario); 
              }}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button className="perfil-item" onClick={() => setEditando(true)}>
          ✏️ Editar nome
        </button>
      )}

      <div className="perfil-divider" />

      {/* Sair */}
      <button className="perfil-item perfil-sair" onClick={onLogout}>
        🚪 Sair
      </button>

    </div>
  );
}