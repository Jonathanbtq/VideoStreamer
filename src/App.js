import logo from './logo.svg'
import './App.css'
import Home from './Home'
import React, { useState, useEffect } from 'react'

function App() {
  const [msg, setMsg] = useState('')
  const [userData, setUserData] = useState(null)
  const [userId, setUserId] = useState('');

  const handleCLick = async () => {
    const data = await fetch('/accueil')
    const json = await data.json()
    const msg = json.msg
    setMsg(msg)
  }

  const fetchUserProfile = async () => {
    try {
      const data = await fetch(`/user/${userId}`)
      const json = await data.json()
      setUserData(json)
    }catch(error){
      console.error('Une erreur s\'est produite Lors de la récupération des données')
    }
  }

  useEffect(() => {
    if (userId){
      fetchUserProfile()
    }
  }, [userId])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleCLick}>
          Dis bonjour
        </button>
        <p>{msg}</p>

        <input type="text" placeholder='Id de l"utilisateur' value={userId} onChange={(e) => setUserId(e.target.value)}></input>
        <button onClick={fetchUserProfile}>Rechercher</button>

        {userData && (<div>
          <h2>Profil de l'utilisateur</h2>
          <p>{userData.name}</p>
          <p>{userData.age}</p>
        </div>)}
        <Home />
      </header>
    </div>
  );
}

export default App;
