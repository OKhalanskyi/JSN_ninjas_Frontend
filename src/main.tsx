import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './app/styles/index.scss'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@/app/providers/Theme/ThemeProvider.tsx';
import ErrorBoundary from '@/app/providers/ErrorBoundary/ErrorBoundary.tsx';
import { store } from '@/app/providers/ReduxProvider/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
