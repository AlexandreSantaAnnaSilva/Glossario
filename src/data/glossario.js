// Base de termos do glossário técnico.
//
// Para adicionar um termo novo, inclua um objeto no array abaixo.
// "categoria" é livre (ex: "Redes", "Suporte", "Sistemas Operacionais"),
// vai ser usada futuramente para filtros e para o selo mostrado no resultado.

const glossario = [
  {
    termo: "TCP",
    categoria: "Redes",
    definicao: "Transmission Control Protocol. Protocolo orientado à conexão que garante a entrega de pacotes.",
  },
  {
    termo: "UDP",
    categoria: "Redes",
    definicao: "User Datagram Protocol. Protocolo rápido, não orientado à conexão, ideal para streaming.",
  },
  {
    termo: "BGP",
    categoria: "Redes",
    definicao: "Border Gateway Protocol. Responsável pelo roteamento entre sistemas autônomos na internet.",
  },
  {
    termo: "DHCP",
    categoria: "Redes",
    definicao: "Dynamic Host Configuration Protocol. Atribui endereços IP automaticamente aos dispositivos na rede.",
  },
  {
    termo: "SNMP",
    categoria: "Redes",
    definicao: "Simple Network Management Protocol. Usado para monitorar e gerenciar dispositivos de rede.",
  },
  {
    termo: "DNS",
    categoria: "Redes",
    definicao: "Domain Name System. Converte nomes de domínio em endereços IP.",
  },
  {
    termo: "ICMP",
    categoria: "Redes",
    definicao: "Internet Control Message Protocol. Usado para enviar mensagens de erro e informações de diagnóstico na rede.",
  },
  {
    termo: "IP",
    categoria: "Redes",
    definicao: "Internet Protocol. Rótulo numérico exclusivo que identifica dispositivos (computadores, celulares, impressoras) em uma rede, funcionando como um CEP digital.",
  },
  {
    termo: "VLAN",
    categoria: "Redes",
    definicao: "Virtual Local Area Network. Segmentação lógica de uma rede física para melhorar a segurança e o desempenho.",
  },
  {
    termo: "Broadcast",
    categoria: "Redes",
    definicao: "É um método de transmissão de dados, áudio ou vídeo onde uma única mensagem é enviada de um emissor para todos os receptores em uma mesma rede local (LAN) simultaneamente.",
  },
];

export default glossario;
