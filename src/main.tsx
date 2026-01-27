import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css";
import "@styles/global.scss";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)
