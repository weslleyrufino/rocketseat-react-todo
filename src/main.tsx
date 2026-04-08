import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// O ! indica que temos certeza que o elemento existe, evitando erros de tipo
// StrictMode é uma ferramenta de desenvolvimento que ajuda a identificar problemas no código, como ciclos infinitos, uso de APIs obsoletas e outros erros comuns. 
// Ele não afeta o comportamento da aplicação em produção, mas é muito útil durante o desenvolvimento para garantir que o código seja mais robusto e livre de bugs.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Resumo:

// StrictMode → ajuda a encontrar bugs (dev only)
// createRoot → nova forma de renderizar React
// index.css → estilos globais
// App → componente principal
// getElementById('root') → ponto de entrada no HTML
// .render() → inicia a aplicação
