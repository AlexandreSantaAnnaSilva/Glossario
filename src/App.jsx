import React, { useState } from 'react';
import './App.css';

const DATA_REDE = {
  "TCP": "Transmission Control Protocol. Protocolo orientado à conexão que garante a entrega de pacotes.",
  "UDP": "User Datagram Protocol. Protocolo rápido, não orientado à conexão, ideal para streaming.",
  "BGP": "Border Gateway Protocol. Responsável pelo roteamento entre sistemas autônomos na internet.",
  "DHCP": "Dynamic Host Configuration Protocol. Atribui endereços IP automaticamente aos dispositivos na rede.",
  "SNMP": "Simple Network Management Protocol. Usado para monitorar e gerenciar dispositivos de rede.",
  "DNS": "Domain Name System. Converte nomes de domínio em endereços IP.",
  "ICMP": "Internet Control Message Protocol. Usado para enviar mensagens de erro e informações de diagnóstico na rede.",
  "IP": "Internet Protocol. Rótulo numérico exclusivo que identifica dispositivos (computadores, celulares, impressoras) em uma rede, funcionando como um CEP digital."
};

export default function App() {
  const [busca, setBusca] = useState("");
  
  const termoFormatado = busca.trim().toUpperCase();
  const definicao = DATA_REDE[termoFormatado];

  return (
    <div className="google-wrapper">
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
          />
        </div>

        {/* A janela (card) só aparece se houver algo digitado */}
        {busca && (
          <div className="result-card">
            {definicao ? (
              <div className="result-content">
                <h2>{termoFormatado}</h2>
                <p>{definicao}</p>
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