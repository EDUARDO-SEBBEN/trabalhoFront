import { useState } from 'react';
import { Link } from 'react-router-dom';

const valoresIniciais = {
  name: '',
  description: '',
  latitude: '',
  longitude: '',
};

function EditorLocalizacao({ pontoInicial, onSalvar, textoBotao }) {
  const [campos, setCampos] = useState(() => ({
    ...valoresIniciais,
    name: pontoInicial?.name ?? '',
    description: pontoInicial?.description ?? '',
    latitude: pontoInicial?.latitude ?? '',
    longitude: pontoInicial?.longitude ?? '',
  }));

  const [mensagemErro, setMensagemErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  function alterarCampo(evento) {
    const { name, value } = evento.target;

    setCampos((anteriores) => ({
      ...anteriores,
      [name]: value,
    }));
  }

  function validarCampos() {
    const nome = campos.name.trim();
    const descricao = campos.description.trim();

    if (!nome) return 'Informe o nome do ponto.';
    if (nome.length > 100) return 'O nome ultrapassa o limite de 100 caracteres.';
    if (descricao.length > 255) return 'A descrição ultrapassa 255 caracteres.';

    if (campos.latitude === '' || campos.longitude === '') {
      return 'As duas coordenadas precisam ser preenchidas.';
    }

    const lat = Number(campos.latitude);
    const lng = Number(campos.longitude);

    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      return 'Valor de latitude inválido. Utilize um valor entre -90 e 90.';
    }

    if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
      return 'Valor de longitude inválido. Utilize um valor entre -180 e 180.';
    }

    return null;
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();

    if (enviando) return;

    const problema = validarCampos();

    if (problema) {
      setMensagemErro(problema);
      return;
    }

    const registro = {
      name: campos.name.trim(),
      description: campos.description.trim(),
      latitude: Number(campos.latitude),
      longitude: Number(campos.longitude),
    };

    setMensagemErro('');
    setEnviando(true);

    try {
      await onSalvar(registro);
    } catch (erro) {
      setMensagemErro(erro.message || 'Ocorreu um erro ao salvar os dados.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="form-ponto" onSubmit={enviarFormulario}>
      <div className="form-secao">
        <h2>Identificação</h2>
        <p>Preencha as informações básicas da localização.</p>

        <div className="form-campo">
          <label htmlFor="name">Nome do ponto *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={campos.name}
            onChange={alterarCampo}
            maxLength={100}
            placeholder="Ex.: Praça Central"
            required
          />
        </div>

        <div className="form-campo">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={campos.description}
            onChange={alterarCampo}
            maxLength={255}
            placeholder="Descreva brevemente este local..."
          />
        </div>
      </div>

      <div className="form-secao">
        <h2>Posicionamento geográfico</h2>
        <p>Informe as coordenadas correspondentes ao local.</p>

        <div className="form-coordenadas">
          <div className="form-campo">
            <label htmlFor="latitude">Latitude *</label>
            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              value={campos.latitude}
              onChange={alterarCampo}
              placeholder="-28.2825"
              required
            />
          </div>

          <div className="form-campo">
            <label htmlFor="longitude">Longitude *</label>
            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              min="-180"
              max="180"
              value={campos.longitude}
              onChange={alterarCampo}
              placeholder="-52.7869"
              required
            />
          </div>
        </div>
      </div>

      {mensagemErro && (
        <div className="form-erro" role="alert">
          {mensagemErro}
        </div>
      )}

      <div className="form-botoes">
        <button type="submit" disabled={enviando}>
          {enviando ? 'Processando...' : textoBotao}
        </button>

        <Link to="/pontos" className="botao-cancelar">
          Cancelar
        </Link>
      </div>
    </form>
  );
}

export default EditorLocalizacao;