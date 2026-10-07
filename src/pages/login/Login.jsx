import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Login.css';

export default function Login({ onVoltar, onLoginSucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e) {
  e.preventDefault();
  setErro('');
  setCarregando(true);

  try {
    const credencial = await signInWithEmailAndPassword(auth, email, senha);
    const uid = credencial.user.uid;

    const snap = await getDoc(doc(db, 'usuarios', uid));
    const dados = snap.exists() ? snap.data() : {};

    onLoginSucesso(dados.papel || 'aluno', dados.nome || 'Usuário'); 
  } catch (err) {
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      setErro('E-mail ou senha incorretos.');
    } else {
      setErro('Erro ao entrar. Tente novamente.');
    }
  } finally {
    setCarregando(false);
  }
}

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Entrar</h1>
        <p className="login-sub">Acesse o portal com sua conta</p>

        <form onSubmit={handleLogin}>
          <div className="campo">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" className="login-btn" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <button className="voltar-link" onClick={onVoltar}>
          ← Voltar
        </button>
      </div>
    </div>
  );
}