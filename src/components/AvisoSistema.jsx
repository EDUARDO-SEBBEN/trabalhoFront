const configuracoes = {
  info: 'notificacao-info',
  erro: 'notificacao-erro',
  sucesso: 'notificacao-sucesso',
  aviso: 'notificacao-aviso',
};

function AvisoSistema({ tipo = 'info', children }) {
  const classe = configuracoes[tipo] || configuracoes.info;
  const acessibilidade = tipo === 'erro' ? 'alert' : 'status';

  return (
    <div className={`notificacao ${classe}`} role={acessibilidade}>
      <span className="notificacao-conteudo">
        {children}
      </span>
    </div>
  );
}

export default AvisoSistema;