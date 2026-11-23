
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FiltroPontos from '../components/BuscaLocalizacoes';
import Mensagem from '../components/AvisoSistema';
import TabelaPontos from '../components/ListaLocalizacoes';

import {
  listarPontos,
  excluirPonto
} from '../services/api';

function PainelLocalizacoes() {
  const [registros, setRegistros] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [falha, setFalha] = useState('');
  const [registroEmExclusao, setRegistroEmExclusao] = useState(null);

  useEffect(() => {
    async function carregarRegistros() {
      try {
        const resposta = await listarPontos();
        setRegistros(Array.isArray(resposta) ? resposta : []);
      } catch (erro) {
        setFalha(erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarRegistros();
  }, []);

  async function removerRegistro(id) {
    const confirmar = window.confirm(
      'Deseja realmente excluir esta localização?'
    );

    if (!confirmar) return;

    try {
      setRegistroEmExclusao(id);
      await excluirPonto(id);

      setRegistros((anteriores) =>
        anteriores.filter((registro) => registro.id !== id)
      );
    } catch (erro) {
      setFalha(erro.message);
    } finally {
      setRegistroEmExclusao(null);
    }
  }

  const registrosFiltrados = registros.filter((registro) => {
    const nome = registro.name?.toLocaleLowerCase() || '';
    const descricao = registro.description?.toLocaleLowerCase() || '';
    const pesquisa = termoBusca.trim().toLocaleLowerCase();

    return nome.includes(pesquisa) || descricao.includes(pesquisa);
  });

  return (
    <section className="pagina-exploracao">

      <div className="cabecalho-listagem">
        <div className="titulo-secao">
          <span className="texto-superior">GERENCIAMENTO GEOGRÁFICO</span>
          <p>Consulte e gerencie seus pontos geográficos.</p>
        </div>

        <Link to="/pontos/novo" className="botao-adicionar">
          <span>+</span>
          Adicionar nova localização
        </Link>
      </div>

      {falha && (
        <Mensagem tipo="erro">
          {falha}
        </Mensagem>
      )}

      <div className="area-pesquisa">
        <FiltroPontos
          filtro={termoBusca}
          setFiltro={setTermoBusca}
        />
      </div>

      <div className="resumo-registros">
        <div>
          <span className="resumo-label">REGISTROS</span>
          <h2>{registros.length} localizações</h2>
        </div>

        <span className="resumo-filtrado">
          {registrosFiltrados.length} resultado(s)
        </span>
      </div>

      {carregando ? (
        <div className="estado-pagina">
          <div className="indicador-carregamento"></div>
          <p>Carregando localizações...</p>
        </div>
      ) : registrosFiltrados.length > 0 ? (
        <TabelaPontos
          pontos={registrosFiltrados}
          onExcluir={removerRegistro}
          excluindoId={registroEmExclusao}
        />
      ) : (
        <div className="estado-vazio">
          <h3>Nenhuma localização encontrada</h3>
          <p>
            {termoBusca
              ? 'Tente pesquisar utilizando outro termo.'
              : 'Adicione uma nova localização para começar.'}
          </p>

          {!termoBusca && (
            <Link to="/pontos/novo" className="botao-adicionar">
              + Adicionar nova localização
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

export default PainelLocalizacoes;
