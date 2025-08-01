import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NoteContextProvider } from './ContextApi/useContext.jsx'


createRoot(document.getElementById('root')).render(
  <NoteContextProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </NoteContextProvider>
)
