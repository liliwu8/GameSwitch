import './App.css'
import FourOFour from './pages/FourOFour'
import Home from './pages/Home'
import UsersIndex from './pages/UsersIndex'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Signup from './firebaseTest/Signup'
import Login from './firebaseTest/Login'
import UserProfile from './components/UserProfile'
import ResetPassWord from './firebaseTest/ResetPassword'
import UserProfileUpdate from './components/UserProfileUpdate'
import { CurrentUserContext } from './components/CurrentUserContext'
import { useState } from 'react'
import GameSwitchDescription from './pages/GameSwitchDescription'
import User from './components/User'
import GameCollection from './gamecollection/GameCollection'
import GameDetail from './components/GameDetail'
import AddNewGame from './gamecollection/AddNewGame'
import UpdateGame from './gamecollection/UpdateGame'
import TradeRequestRecords from './tradeRequestRecords/TradeRequestRecords'
import Thread from './components/Thread'
import Footer from './pages/Footer'
import Forum from './components/Forum'
import { useEffect } from 'react'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const API = process.env.REACT_APP_API_URL //localhost:3333

function App() {
  //stores the user info throughout the whole app
  const [currentUser, setCurrentUser] = useState({})
  const auth = getAuth();
  
  useEffect(() => {
    const userSession = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        axios
          .get(`${API}/users/${email}`)
          .then((res) => {
            setCurrentUser(res.data.payload);
          })
          .catch((err) => {
            console.error(err);
          });
       
      } else {
        setCurrentUser({});
      }
      return () => userSession();
    })
  },[auth])

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<UsersIndex />} />
            <Route path='/users/:user_email' element={<User />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path='/resetpassword' element={<ResetPassWord />} />
            <Route path='/updateprofile' element={<UserProfileUpdate />} />
            <Route path='/gamecollection' element={<GameCollection />} />
            <Route path='/addnewgame' element={<AddNewGame />} />
            <Route path='/updategame/:gameid' element={<UpdateGame />} />
            <Route path='/tutorial' element={<GameSwitchDescription />} />
            <Route path='/games/:gameId' element={<GameDetail />} />
            <Route
              path='/traderequestrecords'
              element={<TradeRequestRecords />}
            />
            <Route path='/forum' element={<Forum />} />
            <Route path='/thread/:threadId' element={<Thread />} />
            <Route path='*' element={<FourOFour />} />
          </Routes>
        </main>
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  )
}

export default App
