
import { Route, Routes } from 'react-router'
import Layout from './components/Layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      {/* Add personal url here*/}
      </Route>
    </Routes>
  );
}

export default App
