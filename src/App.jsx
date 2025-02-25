import './styles/App.css'
import Layout from './components/Layout';
import { Route, Routes, useParams } from 'react-router';
import Resources from './components/Resources';
import Ressurser from './scripts/ressurser';

function App() {
  const categories = Ressurser();

  const { category } = useParams([]);
  // Not correct!!

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Resources category={category} />} />
          <Route path="/:title" element={<Resources category={category} />} />
        </Routes>
      </Layout>
    </>
  )
}
{/*
  Bruker alltid Layout ettersom utseende skal være likt for alle sider.
  Bruker Routes for å vise innholdet i Layout.
  Bruker Route for å vise innholdet i Layout.

  Resources er komponenten som viser innholdet.
    - Innholdet skal endres basert på hvilken kategori som er valgt.
    - Standard skal alltid være HTML, hvis ingen annen er valgt.
    - Bruker useParams for å hente ut hvilken kategori som er valgt.
    
  
  
  
*/}
export default App;