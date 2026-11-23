
import { Navigate, Route, Routes } from 'react-router-dom';

import ListaPontos from './pages/PainelLocalizacoes';
import CadastroPonto from './pages/NovoCadastro';
import DetalhePonto from './pages/VisualizarLocalizacao';
import EditarPonto from './pages/EditarCadastro';
import NaoEncontrado from './pages/PaginaInexistente';

import './App.css';

function App() {
  return (
    <div className="aplicacao">
      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Navigate to="/pontos" replace />} />
          <Route path="/pontos" element={<ListaPontos />} />
          <Route path="/pontos/novo" element={<CadastroPonto />} />
          <Route path="/pontos/:id" element={<DetalhePonto />} />
          <Route path="/pontos/:id/editar" element={<EditarPonto />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;