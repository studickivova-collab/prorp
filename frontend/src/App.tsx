import { Header } from './components/Header';
import { MapScreen } from './map/MapScreen';
import { DiaryModal } from './diary/DiaryModal';
import { GuideModal } from './guide/GuideModal';

function App() {
  return (
    <div className="h-svh flex flex-col bg-surface-0 text-ink">
      <Header />
      <main className="flex-1 min-h-0">
        <MapScreen />
      </main>
      <DiaryModal />
      <GuideModal />
    </div>
  );
}

export default App;
