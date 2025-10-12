import { VideoProvider } from './contexts/VideoContext';
import { Home } from './pages/Home';

function App() {
  return (
    <VideoProvider>
      <Home />
    </VideoProvider>
  );
}

export default App;
