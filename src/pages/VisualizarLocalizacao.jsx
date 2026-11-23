import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { buscarPonto, excluirPonto } from '../services/api';
import Mensagem from '../components/AvisoSistema';

function VisualizarLocalizacao() {
  const { id } = useParams();
  const navegar = useNavigate();

  const [registro, setRegistro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [removendo, setRemovendo] = useState(false);

  useEffect(() => {
    let paginaAtiva = true;

    async function obterDetalhes() {
      setCarregando(true);
      setRegistro(null);
      setErro('');

      try {
        const resposta = await buscarPonto(id);

        if (paginaAtiva) {
          setRegistro(resposta);
        }
      } catch (problema) {
        if (paginaAtiva) {
          setErro(problema.message || 'Erro ao consultar a localização.');
        }
      } finally {
        if (paginaAtiva) {
          setCarregando(false);
        }
      }
    }

    obterDetalhes();

    return () => {
      paginaAtiva = false;
    };
  }, [id]);

  async function removerLocalizacao() {
    if (removendo) return;

    const autorizado = window.confirm(
      'Deseja realmente excluir esta localização? Essa operação não poderá ser desfeita.'
    );

    if (!autorizado) return;

    setRemovendo(true);
    setErro('');

    try {
      await excluirPonto(id);
      navegar('/pontos');
    } catch (problema) {
      setErro(problema.message || 'Não foi possível remover o ponto.');
    } finally {
      setRemovendo(false);
    }
  }

  if (carregando) {
    return (
      <div className="estado-pagina" role="status">
        <span className="indicador-carregamento" />
        <p>Buscando dados da localização...</p>
      </div>
    );
  }

  if (!registro) {
    return (
      <section className="pagina-detalhe">
        <div className="titulo-secao">
          <div>
            <span className="texto-superior">CONSULTA DE REGISTRO</span>
            <h1>Localização indisponível</h1>
          </div>
        </div>

        <Mensagem tipo="erro">
          {erro || 'O ponto solicitado não existe ou não está disponível.'}
        </Mensagem>

        <Link to="/pontos" className="botao-cancelar">
          Voltar para a listagem
        </Link>
      </section>
    );
  }

  const lat = Number(registro.latitude);
  const lng = Number(registro.longitude);

  const coordenadasValidas =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  let enderecoMapa = '';
  let enderecoExterno = '';

  if (coordenadasValidas) {
    const limites = [
      Math.max(-180, lng - 0.018),
      Math.max(-90, lat - 0.012),
      Math.min(180, lng + 0.018),
      Math.min(90, lat + 0.012),
    ];

    const parametros = new URLSearchParams({
      bbox: limites.join(','),
      layer: 'mapnik',
      marker: `${lat},${lng}`,
    });

    enderecoMapa =
      `https://www.openstreetmap.org/export/embed.html?${parametros.toString()}`;

    enderecoExterno =
      `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
  }

  return (
    <section className="pagina-detalhe">
      <div className="titulo-secao">
        <div>
          <span className="texto-superior">INFORMAÇÕES GEOGRÁFICAS</span>
          <h1>Ficha da localização</h1>
          <p>Consulte os dados e a posição geográfica deste registro.</p>
        </div>
      </div>

      {erro && (
        <Mensagem tipo="erro">
          {erro}
        </Mensagem>
      )}

      <article className="cartao-detalhe">
        <div className="cartao-detalhe-topo">
          <div>
            <span className="texto-superior">PONTO CADASTRADO</span>
            <h2>{registro.name}</h2>
          </div>

          <span className="identificador-registro">
            ID: {registro.id}
          </span>
        </div>

        <div className="detalhe-descricao">
          <span className="detalhe-label">Descrição</span>
          <p>{registro.description || 'Nenhuma descrição foi informada.'}</p>
        </div>

        <div className="detalhe-coordenadas">
          <div className="coordenada-item">
            <span className="detalhe-label">LATITUDE</span>
            <strong>{registro.latitude}</strong>
          </div>

          <div className="coordenada-item">
            <span className="detalhe-label">LONGITUDE</span>
            <strong>{registro.longitude}</strong>
          </div>
        </div>

        <div className="detalhe-acoes">
          <Link
            to={`/pontos/${id}/editar`}
            className="botao-adicionar"
          >
            Editar informações
          </Link>

          <button
            type="button"
            className="botao-excluir"
            onClick={removerLocalizacao}
            disabled={removendo}
          >
            {removendo ? 'Removendo...' : 'Excluir localização'}
          </button>

          <Link to="/pontos" className="botao-cancelar">
            Voltar
          </Link>
        </div>
      </article>

      <section className="secao-mapa">
        <div className="secao-mapa-titulo">
          <div>
            <span className="texto-superior">VISUALIZAÇÃO CARTOGRÁFICA</span>
            <h2>Posição no mapa</h2>
          </div>
        </div>

        {coordenadasValidas ? (
          <div className="mapa-detalhado">
            <iframe
              title={`Mapa da localização ${registro.name}`}
              src={enderecoMapa}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="mapa-link">
              <a
                href={enderecoExterno}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visualizar no OpenStreetMap
              </a>
            </div>
          </div>
        ) : (
          <Mensagem tipo="aviso">
            Não é possível exibir o mapa porque as coordenadas deste registro são inválidas.
          </Mensagem>
        )}
      </section>
    </section>
  );
}

export default VisualizarLocalizacao;