import { VideoProvider } from './contexts/VideoContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { Home } from './pages/Home';

function App() {
  return (
    <DarkModeProvider>
      <VideoProvider>
        <Home />
      </VideoProvider>
    </DarkModeProvider>
  );
}

export default App;
