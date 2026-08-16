import { Header } from './components/Header';
import { MapScreen } from './map/MapScreen';
import { DiaryModal } from './diary/DiaryModal';

function App() {
  return (
    <div className="h-svh flex flex-col bg-surface-0 text-ink">
      <Header />
      <main className="flex-1 min-h-0">
        <MapScreen />
      </main>
      <DiaryModal />
    </div>
  );
}

export default App;
