import { useNavigate } from 'react-router-dom';

import { criarPonto } from '../services/api';
import FormPonto from '../components/EditorLocalizacao';

function NovoCadastro() {
  const navegar = useNavigate();

  async function salvarNovoPonto(informacoes) {
    await criarPonto(informacoes);

    window.alert('A localização foi cadastrada com sucesso!');
    navegar('/pontos');
  }

  return (
    <section className="pagina-cadastro">
      <div className="titulo-secao">
        <div>
          <span className="texto-superior">NOVO REGISTRO</span>
          <h1>Adicionar localização</h1>
          <p>
            Insira os dados necessários para registrar um novo ponto geográfico.
          </p>
        </div>
      </div>

      <div className="cartao-formulario">
        <div className="cartao-formulario-cabecalho">
          <span>FORMULÁRIO DE CADASTRO</span>
          <h2>Dados da localização</h2>
          <p>Os campos marcados com * são obrigatórios.</p>
        </div>

        <FormPonto
          onSalvar={salvarNovoPonto}
          textoBotao="Concluir cadastro"
        />
      </div>
    </section>
  );
}

export default NovoCadastro;