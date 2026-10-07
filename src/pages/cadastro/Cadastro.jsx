import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Cadastro.css';

export default function Cadastro({ onVoltar }) {
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  async function handleCadastro(e) {
    e.preventDefault();
    setErro('');

    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = credencial.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        nome,
        nascimento,
        email,
        papel: 'aluno',
        criadoEm: new Date().toISOString(),
      });

      setSucesso(true);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está cadastrado.');
      } else if (err.code === 'auth/weak-password') {
        setErro('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setErro('Erro ao criar conta. Tente novamente.');
      }
    }
  }

  if (sucesso) {
    return (
      <div className="cadastro-wrapper">
        <div className="cadastro-card">
          <div className="sucesso-icon">✅</div>
          <h2>Conta criada!</h2>
          <p>Bem-vindo(a), {nome}! Agora você já pode entrar.</p>
          <button className="cadastro-btn" onClick={onVoltar}>
            Ir para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-card">
        <h1>Criar conta</h1>
        <p className="cadastro-sub">Preencha os dados para acessar o portal</p>

        <form onSubmit={handleCadastro}>
          <div className="campo">
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Data de nascimento</label>
            <input
              type="date"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" className="cadastro-btn">
            Criar conta
          </button>
        </form>

        <button className="voltar-link" onClick={onVoltar}>
          ← Já tenho conta
        </button>
      </div>
    </div>
  );
}