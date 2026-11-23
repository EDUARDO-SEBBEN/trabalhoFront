const ENDPOINT = 'https://geopoint-6x4u.onrender.com/api/points';

async function executarRequisicao(caminho = '', configuracao = {}) {
  const { method = 'GET', body } = configuracao;

  const cabecalhos = {};

  if (body !== undefined) {
    cabecalhos['Content-Type'] = 'application/json';
  }

  let resposta;

  try {
    resposta = await fetch(`${ENDPOINT}${caminho}`, {
      method,
      headers: cabecalhos,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error(
      'Não foi possível conectar à GeoPoint API. Verifique sua conexão.'
    );
  }

  if (!resposta.ok) {
    let mensagem = `Erro ${resposta.status}: ${
      resposta.statusText || 'requisição não concluída'
    }`;

    try {
      const conteudo = await resposta.json();
      mensagem = conteudo.message || conteudo.mensagem || mensagem;
    } catch {

    }

    throw new Error(mensagem);
  }

  if ([204, 205].includes(resposta.status)) {
    return null;
  }

  return resposta.json();
}

const identificarPonto = (id) => `/${encodeURIComponent(id)}`;

export function listarPontos() {
  return executarRequisicao();
}

export function buscarPonto(id) {
  return executarRequisicao(identificarPonto(id));
}

export function criarPonto(dados) {
  return executarRequisicao('', {
    method: 'POST',
    body: dados,
  });
}

export function atualizarPonto(id, dados) {
  return executarRequisicao(identificarPonto(id), {
    method: 'PUT',
    body: dados,
  });
}

export function excluirPonto(id) {
  return executarRequisicao(identificarPonto(id), {
    method: 'DELETE',
  });
}