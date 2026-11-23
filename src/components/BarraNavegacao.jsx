import { Link, NavLink } from 'react-router-dom';

function BarraNavegacao() {
  const links = [
    { caminho: '/pontos', texto: 'Explorar', exato: true },
    { caminho: '/pontos/novo', texto: 'Adicionar ponto', exato: false },
  ];

  return (
    <header className="cabecalho-sistema">
      <div className="cabecalho-conteudo">
        <Link to="/pontos" className="identidade">
          <span className="identidade-simbolo">G.</span>
          <span className="identidade-nome">GeoPoints</span>
        </Link>

        <nav className="navegacao-principal" aria-label="Menu principal">
          {links.map(({ caminho, texto, exato }) => (
            <NavLink
              key={caminho}
              to={caminho}
              end={exato}
              className={({ isActive }) =>
                isActive ? 'navegacao-link selecionado' : 'navegacao-link'
              }
            >
              {texto}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default BarraNavegacao;