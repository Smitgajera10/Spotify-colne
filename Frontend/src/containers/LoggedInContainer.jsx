import '../routes/Home.css';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import songContext from '../contexts/songContext.js';
import IconText from '../components/IconText.jsx';
import { SearchContext } from '../contexts/SearchContext.jsx';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/serverHelpers.js';
import PlaylistCard from '../components/PlaylistCard.jsx';
import CreatePlayListModel from '../models/CreatePlaylistModel.jsx';
import AddToPlaylistModel from '../models/AddToPlaylistModel.jsx';

function LoggedInContainer({ children, curActiveScreen, searchInputRef }) {
  const { currentSong, setCurrentSong, isPaused, setIsPaused, soundPlayed, setSoundPlayed } = useContext(songContext);
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [playlists, setPlaylists] = useState([]);
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const firstupdate = useRef(true);

  useLayoutEffect(() => {
    if (firstupdate.current) {
      firstupdate.current = false;
      return;
    }
    if (!currentSong) return;
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload);
    if (response._id) {
      setAddToPlaylistModalOpen(false);
      alert("Song added to playlist successfully!");
    }
  };

  const playSound = (songSrc) => {
    if (!soundPlayed) return;
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    const sound = new Howl({ src: [songSrc], html5: true });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.trim() === "") {
      if (curActiveScreen !== "home") navigate("/home", { replace: true });
    } else {
      if (curActiveScreen !== "search") navigate("/search", { replace: true });
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/playlist/me");
      if (!response) throw new Error('Error fetching playlists');
      setPlaylists(response.data || []);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  return (
    <>
      <div className="bg-black text-white w-full min-h-screen flex flex-col">
        <CreatePlayListModel
          show={createPlaylistModal}
          onClose={() => setCreatePlaylistModal(false)}
          fetchPlaylists={fetchPlaylists}
          selectedSong={currentSong}
        />
        <AddToPlaylistModel
          show={addToPlaylistModalOpen}
          onClose={() => setAddToPlaylistModalOpen(false)}
          onAdd={(playlistId) => addSongToPlaylist(playlistId)}
          selectedSong={currentSong}
        />

        {/* Mobile Top Bar */}
        <div className="sm:hidden flex flex-col gap-2 px-2 py-2 bg-black">
          <div className="flex justify-between items-center">
            <Icon icon="logos:spotify-icon" width="40" className="m-1 p-0" />
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-white p-2">
              <Icon icon={showMobileMenu ? "material-symbols:close" : "material-symbols:menu"} width="30" />
            </button>
          </div>
          <div className="flex items-center relative">
            <Icon icon="ei:search" width="24" className="absolute left-3 top-2.5 text-gray-400" />
            <input
              ref={searchInputRef}
              onChange={handleInputChange}
              value={searchValue}
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-2xl bg-[#1f1f1f] text-white text-sm w-full outline-none"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden bg-[#121212] p-4">
            <div className="flex flex-col space-y-4">
              <Link to="/home" className="flex items-center"><Icon icon="material-symbols-light:home" width="24" className="mr-2" /><span>Home</span></Link>
              <Link to="/myMusic" className="flex items-center"><Icon icon="lucide:music" width="24" className="mr-2" /><span>My Music</span></Link>
              <div className="flex items-center"><Icon icon="bx:library" width="24" className="mr-2" /><span>Your Library</span></div>
              <div className="flex items-center cursor-pointer" onClick={() => setCreatePlaylistModal(true)}><Icon icon="material-symbols:add" width="24" className="mr-2" /><span>Create Playlist</span></div>
              <Link to="/uploadSong" className="flex items-center"><Icon icon="material-symbols:upload" width="24" className="mr-2" /><span>Upload Song</span></Link>
            </div>
          </div>
        )}

        {/* Desktop Navbar */}
        <nav className="hidden sm:flex pt-3 pl-1 bg-black w-full top-0 left-0 right-0 z-50">
          <Icon icon="logos:spotify-icon" width="40" className="m-1 mt-2 p-0" />
          <div className="searchbar flex m-1 ml-6 h-1">
            <Link to="/home">
              <div className="h-[50px] w-[50px] rounded-[100%] bg-[#1f1f1f] pt-1">
                <Icon icon="material-symbols-light:home" width="40" className="m-auto p-0" />
              </div>
            </Link>
            <div className="search flex ml-3">
              <form action="submit">
                <Icon icon="ei:search" width="40" height="40" className="absolute" />
                <input
                  ref={searchInputRef}
                  onChange={handleInputChange}
                  value={searchValue}
                  type="text"
                  placeholder="What do you want to play?"
                  className="cursor-text box-border bg-[#1f1f1f] w-full sm:w-[25rem] h-[45px] rounded-2xl text-left pl-[42px] text-[#656565] border-none outline-none"
                />
              </form>
            </div>
          </div>
          <div className="rightbar md:flex hidden text-white justify-end items-center ml-auto">
            <div className="flex p-2 text-[15px]">
              <span className="px-[20px] py-0 cursor-pointer opacity-70 hover:opacity-100">Premium</span>
              <span className="px-[20px] py-0 cursor-pointer opacity-70 hover:opacity-100">Support</span>
              <span className="px-[20px] py-0 cursor-pointer opacity-70 hover:opacity-100">Download</span>
              <div className="h-7 w-0.5 bg-white"></div>
              <span className="px-[20px] py-0 cursor-pointer opacity-70 hover:opacity-100">Install App</span>
              <span className="px-[20px] py-0 cursor-pointer opacity-70 hover:opacity-100"><Link to="/uploadSong">Upload Song</Link></span>
            </div>
            <Link to="/login">
              <div className="bg-[white] text-[black] rounded-[30px] pt-[5px] text-nowrap text-center w-10 h-10 m-1 mr-3">
                <button className="font-semibold">SM</button>
              </div>
            </Link>
          </div>
        </nav>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row flex-1">
          {/* Sidebar */}
          <div className={`${showMobileMenu ? 'block' : 'hidden'} sm:block sm:w-[350px] md:w-[300px] lg:w-[250px] h-[calc(100vh-60px)] bg-[#121212] rounded-lg m-2 overflow-y-auto custom-scrollbar`}>
            <div className="flex justify-between items-center px-4 pt-4">
              <div className="list m-4 w-full flex" onClick={fetchPlaylists}>
                <Icon icon="bx:library" width="25" height="25" className={`${playlists.length > 0 ? "opacity-100" : "opacity-70"} mt-2`} />
                <span className={`${playlists.length > 0 ? "opacity-100" : "opacity-70"} p-2.5 cursor-pointer hover:opacity-100 font-bold`}>Your Library</span>
              </div>
              <button title='Create playlist' onClick={() => setCreatePlaylistModal(true)} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#2a2a2a]" aria-label="Create playlist">
                <Icon icon="material-symbols:add" width="24" />
              </button>
            </div>
            {playlists.length > 0 ? (
              <div className="pt-2 px-4 space-y-2">
                {playlists.map((item) => (
                  <PlaylistCard key={item._id} playlistId={item._id} title={item.name} description={item.description} owner={item.owner} imgUrl={item.thumbnail} />
                ))}
              </div>
            ) : (
              <div className="createPlaylist bg-[#1f1f1f] m-2 p-2 rounded-2xl flex-col h-fit">
                <div className="p-3 font-bold ">Create your first playlist</div>
                <div className="pl-3 text-[15px]">It's easy, we'll help you</div>
                <div className="create_Playlist rounded-2xl m-3 w-fit p-2 font-bold text-[16px] hover:scale-105 transition-transform text-black bg-white cursor-pointer" onClick={() => setCreatePlaylistModal(true)}>
                  Create Playlist
                </div>
              </div>
            )}
            <IconText iconName={"lucide:music"} displayText={"My Music"} targetLink="/myMusic" active={curActiveScreen === "myMusic"} />
            <div className="browsepodcasts bg-[#1f1f1f] m-2 mt-4 p-2 rounded-2xl flex-col h-fit">
              <div className="p-3 font-bold">Let's find some podcasts to follow</div>
              <div className="pl-3 text-[15px]">We'll keep updated in new episodes</div>
              <div className="browse_podcasts rounded-2xl m-3 w-fit p-2 font-bold text-[16px] hover:scale-105 transition-transform text-black bg-white cursor-pointer">
                Browse podcasts
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="right flex-grow h-[calc(100vh-60px)] overflow-auto bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-lg m-2 sm:m-2 sm:ml-0">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom Song Player */}
      {currentSong &&
  <div className='h-auto w-full bg-gradient-to-r from-[#1f1f1f] to-[#121212] flex flex-col sm:flex-row text-white items-center justify-between px-4 py-3 fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 space-y-2 sm:space-y-0 sm:space-x-2'>

    {/* Left Section */}
    <div className='flex items-center w-full sm:w-1/4'>
      <img
        src={currentSong.thumbnail}
        alt='currentSongThumbnail'
        className='h-12 w-12 rounded'
      />
      <div className="pl-3">
        <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
        <div className="text-xs text-gray-500 hover:underline cursor-pointer">
          {currentSong.artist.firstName + " " + currentSong.artist.lastName}
        </div>
      </div>
    </div>

    {/* Center Section */}
    <div className='flex justify-center items-center w-full sm:w-2/4'>
      <div className='flex justify-between items-center w-[80%] max-w-[250px]'>
        <Icon icon="fluent:arrow-shuffle-16-filled" width="20" className="cursor-pointer text-gray-500 hover:text-white" />
        <Icon icon="material-symbols:skip-previous-rounded" width="24" className="cursor-pointer text-gray-500 hover:text-white" />
        <Icon
          icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"}
          width="36"
          className="cursor-pointer text-white hover:scale-105 transition-transform"
          onClick={() => togglePlayPause()}
        />
        <Icon icon="material-symbols:skip-next-rounded" width="24" className="cursor-pointer text-gray-500 hover:text-white" />
        <Icon icon="fad:repeat" width="20" className="cursor-pointer text-gray-500 hover:text-white" />
      </div>
    </div>

    {/* Right Section */}
    <div className='flex justify-end items-center w-full sm:w-1/4 space-x-4'>
      <Icon
        icon="material-symbols:playlist-add"
        width="24"
        className="cursor-pointer text-gray-500 hover:text-white"
        onClick={() => { setAddToPlaylistModalOpen(true) }}
      />
      <Icon
        icon={currentSong.liked ? "fluent:heart-20-filled" : "fluent:heart-20-regular"}
        width="24"
        className={`cursor-pointer ${currentSong.liked ? "text-green-500" : "text-gray-500"} hover:text-white`}
      />
    </div>
  </div>
}

    </>
  );
}

export default LoggedInContainer;
