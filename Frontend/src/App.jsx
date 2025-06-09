import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useCookies } from "react-cookie"
import './App.css'
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SignUp from './routes/SignUp.jsx';
import LoggedinHome from "./routes/LoggedinHome.jsx";
import UploadSong from "./routes/UploadSong.jsx";
import MyMusic from "./routes/MyMusic.jsx";
import SearchPage from "./routes/SearchPage.jsx";
import songContext from "./contexts/songContext.js";
import {SearchProvider} from "./contexts/SearchContext.jsx";
import { useState } from "react";
import SinglePlaylistView from "./routes/SinglePlaylistView.jsx";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong , setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <>

      <BrowserRouter>
        {cookie.token ? (
          // routes for loggdin
          <SearchProvider>
            <songContext.Provider value={{currentSong, setCurrentSong , soundPlayed, setSoundPlayed, isPaused, setIsPaused}}>  
            <Routes>
              <Route path='/' element={<LoggedinHome />} />
              <Route path='/uploadSong' element={<UploadSong />} />
              <Route path='/myMusic' element={<MyMusic />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/playlist/:playlistId' element={<SinglePlaylistView />} />
              <Route path='*' element={<Navigate to="/" />} />
            </Routes>
          </songContext.Provider>
          </SearchProvider>
          
        ) : (
          //routes for not login
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>

    </>
  )
}




export default App
