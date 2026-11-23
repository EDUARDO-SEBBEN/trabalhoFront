import { Link } from 'react-router-dom';

function ListaLocalizacoes({ pontos, onExcluir, excluindoId }) {
  const renderizarCoordenada = (valor) => {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero.toFixed(5) : valor;
  };

  return (
    <div className="lista-registros">
      <div className="lista-registros-cabecalho">
        <span>Registros encontrados</span>
        <span>{pontos.length} ponto(s)</span>
      </div>

      <div className="area-tabela">
        <table className="tabela-pontos">
          <thead>
            <tr>
              <th>Localização</th>
              <th>Informações</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Gerenciar</th>
            </tr>
          </thead>

          <tbody>
            {pontos.map((registro) => {
              const bloqueado = excluindoId !== null;
              const processando = excluindoId === registro.id;

              return (
                <tr key={registro.id}>
                  <td>
                    <Link
                      to={`/pontos/${registro.id}`}
                      className="registro-nome"
                    >
                      {registro.name}
                    </Link>
                  </td>

                  <td>
                    {registro.description || 'Não informado'}
                  </td>

                  <td>{renderizarCoordenada(registro.latitude)}</td>
                  <td>{renderizarCoordenada(registro.longitude)}</td>

                  <td>
                    <div className="registro-acoes">
                      <Link to={`/pontos/${registro.id}`}>
                        Abrir
                      </Link>

                      <Link to={`/pontos/${registro.id}/editar`}>
                        Alterar
                      </Link>

                      <button
                        type="button"
                        className="acao-remover"
                        disabled={bloqueado}
                        onClick={() => onExcluir(registro.id)}
                      >
                        {processando ? 'Aguarde...' : 'Remover'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaLocalizacoes;