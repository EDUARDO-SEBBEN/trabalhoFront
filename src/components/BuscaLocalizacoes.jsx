function BuscaLocalizacoes({ filtro, setFiltro }) {
  const atualizarBusca = (evento) => {
    setFiltro(evento.target.value);
  };

  return (
    <section className="painel-busca">
      <div className="painel-busca-info">
        <span className="painel-busca-titulo">Pesquisa</span>
        <span className="painel-busca-descricao">
          Localize um ponto pelo nome
        </span>
      </div>

      <div className="campo-busca">
        <input
          type="search"
          id="pesquisa-ponto"
          aria-label="Pesquisar pontos geográficos"
          placeholder="Pesquisar localização..."
          value={filtro}
          onChange={atualizarBusca}
        />
      </div>
    </section>
  );
}

export default BuscaLocalizacoes;