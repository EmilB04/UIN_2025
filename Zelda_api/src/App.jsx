import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import GamePage from './components/GamePage'

function App() {
  const [games, setGames] = useState([]);
  const getGames = async () => {
    fetch("https://zelda.fanapis.com/api/games")
    .then(response => response.json())
    .then(data => setGames(data.data))
    .catch(error => console.error("Noe feil skjedde ved henting av data fra API", error));
  };
  useEffect(() => {
    getGames();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home games={games}/>}></Route>
          <Route path=":slug" element={<CategoryPage/>}></Route>
          <Route path="games/:game_id" element={<GamePage/>}></Route>

        </Routes>
      </Layout>
    </>
  )
}

export default App
