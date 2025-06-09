import './Home.css';
import LoggedInContainer from '../containers/LoggedInContainer';
import Card from '../components/Card';

function LoggedinHome() {
  return (
    <LoggedInContainer>
      {/* Popular Artists */}
      <div className="flex justify-between items-center mx-4 my-4 sm:mx-5">
        <h2 className="text-xl sm:text-2xl font-bold">Popular artists</h2>
        <span className="text-xs sm:text-sm font-bold opacity-70">Show all</span>
      </div>

      <div className="flex overflow-x-auto gap-4 px-4 sm:px-5 pb-4">
        <a
          href="https://open.spotify.com/artist/2CIMQH7S2dFkfmjbpD06y1"
          target="_blank"
          rel="noreferrer"
          className="min-w-[160px] sm:min-w-[200px] flex-shrink-0 group relative rounded-2xl p-2 hover:bg-[#181818]"
        >
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] m-auto rounded-full overflow-hidden">
            <img src="assets/A_riday.JPG" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-transform duration-300 ease-out w-[48px] h-[48px] bg-green-500 rounded-full absolute right-4 top-[95px] sm:top-[115px]">
            <img src="assets/play.svg" alt="" className="w-[25px] m-[12px]" />
          </div>
          <div className="font-bold pt-2 truncate text-sm sm:text-base pl-2">Riday</div>
          <div className="opacity-70 text-sm pl-2">Artist</div>
        </a>
      </div>

      {/* Popular Albums */}
      <div className="flex justify-between items-center mx-4 my-4 sm:mx-5">
        <h2 className="text-xl sm:text-2xl font-bold">Popular albums and singles</h2>
        <span className="text-xs sm:text-sm font-bold opacity-70">Show all</span>
      </div>

      <div className="flex overflow-x-auto gap-4 px-4 sm:px-5 pb-4">
        <div className="min-w-[160px] sm:min-w-[200px] flex-shrink-0 group relative rounded-2xl p-2 hover:bg-[#181818]">
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] m-auto rounded-2xl overflow-hidden">
            <img src="assets/sanam_teri.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-transform duration-300 ease-out w-[48px] h-[48px] bg-green-500 rounded-full absolute right-4 top-[95px] sm:top-[115px]">
            <img src="assets/play.svg" alt="" className="w-[25px] m-[12px]" />
          </div>
          <div className="font-bold text-sm sm:text-base pt-2 px-2 truncate">
            Sanam Teri Kasam
          </div>
          <div className="opacity-70 text-sm px-2">Himesh Reshammiya</div>
        </div>
      </div>

      {/* Popular Radio */}
      <div className="flex justify-between items-center mx-4 my-4 sm:mx-5">
        <h2 className="text-xl sm:text-2xl font-bold">Popular radio</h2>
        <span className="text-xs sm:text-sm font-bold opacity-70">Show all</span>
      </div>

      <div className="flex overflow-x-auto gap-4 px-4 sm:px-5 pb-4">
        <div className="min-w-[160px] sm:min-w-[200px] flex-shrink-0 group relative rounded-2xl p-2 hover:bg-[#181818]">
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] m-auto rounded-2xl overflow-hidden">
            <img src="assets/radio_arijit.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-transform duration-300 ease-out w-[48px] h-[48px] bg-green-500 rounded-full absolute right-4 top-[95px] sm:top-[115px]">
            <img src="assets/play.svg" alt="" className="w-[25px] m-[12px]" />
          </div>
          <div className="opacity-70 text-sm px-2 mt-2 line-clamp-2 max-w-[150px] sm:max-w-[180px]">
            With Sachin-Jigar, Vishal-Shekhar, Amit Trivedi and more
          </div>
        </div>
      </div>

      {/* India's Best */}
      <div className="flex justify-between items-center mx-4 my-4 sm:mx-5">
        <h2 className="text-xl sm:text-2xl font-bold">India's best</h2>
        <span className="text-xs sm:text-sm font-bold opacity-70">Show all</span>
      </div>



      <div className="flex overflow-x-auto gap-4 px-4 sm:px-5 pb-6">
        <div className="min-w-[160px] sm:min-w-[200px] flex-shrink-0 group relative rounded-2xl p-2 hover:bg-[#181818]">
          <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] m-auto rounded-2xl overflow-hidden">
            <img src="assets/i-pop.jpeg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-transform duration-300 ease-out w-[48px] h-[48px] bg-green-500 rounded-full absolute right-4 top-[95px] sm:top-[115px]">
            <img src="assets/play.svg" alt="" className="w-[25px] m-[12px]" />
          </div>
          <div className="opacity-70 text-sm px-2 mt-2 line-clamp-2 max-w-[150px] sm:max-w-[180px]">
            Hottest tracks from your favourite I-Pop Icons. Cover - King
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
}

export default LoggedinHome;
