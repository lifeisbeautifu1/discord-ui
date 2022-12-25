import { Routes, Route } from 'react-router-dom';

import { Home, Channels } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/channels" element={<Channels />} />
      <Route path="/channels/:id" element={<Channels />} />
    </Routes>
  );
}

export default App;
