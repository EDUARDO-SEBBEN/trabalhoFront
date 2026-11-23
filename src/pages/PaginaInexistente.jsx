import { Link } from 'react-router-dom';

function PaginaInexistente() {
  return (
    <section className="pagina-erro">
      <span className="erro-codigo">404</span>

      <div className="erro-conteudo">
        <h1>Esta página não existe</h1>

        <p>
          O endereço acessado não corresponde a nenhuma página disponível
          no GeoPoints. Verifique o endereço ou retorne ao painel.
        </p>

        <Link to="/pontos" className="botao-adicionar">
          Ir para os pontos geográficos
        </Link>
      </div>
    </section>
  );
}

export default PaginaInexistente;