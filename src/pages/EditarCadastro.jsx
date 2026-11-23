import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { buscarPonto, atualizarPonto } from '../services/api';
import FormPonto from '../components/EditorLocalizacao';
import Mensagem from '../components/AvisoSistema';

function EditarCadastro() {
  const { id } = useParams();
  const navegar = useNavigate();

  const [dadosOriginais, setDadosOriginais] = useState(null);
  const [consultando, setConsultando] = useState(true);
  const [falha, setFalha] = useState('');

  useEffect(() => {
    let telaDisponivel = true;

    async function consultarRegistro() {
      setConsultando(true);
      setDadosOriginais(null);
      setFalha('');

      try {
        const registro = await buscarPonto(id);

        if (telaDisponivel) {
          setDadosOriginais(registro);
        }
      } catch (erro) {
        if (telaDisponivel) {
          setFalha(erro.message || 'Não foi possível localizar o ponto.');
        }
      } finally {
        if (telaDisponivel) {
          setConsultando(false);
        }
      }
    }

    consultarRegistro();

    return () => {
      telaDisponivel = false;
    };
  }, [id]);

  async function salvarAlteracoes(novosDados) {
    await atualizarPonto(id, novosDados);
    navegar(`/pontos/${id}`);
  }

  if (consultando) {
    return (
      <div className="estado-pagina" role="status">
        <span className="indicador-carregamento" />
        <p>Carregando informações da localização...</p>
      </div>
    );
  }

  if (falha || !dadosOriginais) {
    return (
      <section className="pagina-edicao">
        <h1>Não foi possível abrir a edição</h1>

        <Mensagem tipo="erro">
          {falha || 'O registro solicitado não foi encontrado.'}
        </Mensagem>

        <Link to="/pontos" className="botao-cancelar">
          Retornar aos registros
        </Link>
      </section>
    );
  }

  return (
    <section className="pagina-edicao">
      <div className="titulo-secao">
        <div>
          <span className="texto-superior">ATUALIZAÇÃO DE REGISTRO</span>
          <h1>Editar localização</h1>
          <p>
            Modifique as informações abaixo para atualizar o ponto selecionado.
          </p>
        </div>
      </div>

      <div className="cartao-formulario">
        <div className="cartao-formulario-cabecalho">
          <span>REGISTRO #{id}</span>
          <h2>{dadosOriginais.name}</h2>
          <p>Revise os campos antes de confirmar as alterações.</p>
        </div>

        <FormPonto
          key={id}
          pontoInicial={dadosOriginais}
          onSalvar={salvarAlteracoes}
          textoBotao="Salvar atualização"
        />
      </div>
    </section>
  );
}

export default EditarCadastro;