import './styles/App.css'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router';
import Resources from './components/Resources';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path=":category" element={<Resources />} />
      </Route>
    </Routes>
  );
}

export default App;
