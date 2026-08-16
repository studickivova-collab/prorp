import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './i18n/I18nContext';
import { DiaryProvider } from './diary/DiaryContext';
import { GuideProvider } from './guide/GuideContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <DiaryProvider>
          <GuideProvider>
            <App />
          </GuideProvider>
        </DiaryProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
);
