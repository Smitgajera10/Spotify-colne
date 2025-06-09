
const Card = ({link, imgURL, title, discription }) => {
    return (
        <>
            <a href={link} target="_blank">
                <div className="group relative w-[200px] h-[240px] flex-col items-start justify-center pt-2 rounded-2xl cursor-pointer hover:bg-[#181818]">
                    <div className="photo w-[150px] h-[150px] m-auto rounded-full overflow-hidden">
                        <img src={imgURL} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-transform duration-300 ease-out group-hover:w-[50px] group-hover:h-[50px] hover:bg-[rgb(85,222,83)] w-[48px] h-[48px] bg-green-500 rounded-full absolute ml-[130px] mt-[-45px]">
                        <img src="assets/play.svg" alt="" className="w-[25px] m-[12px] " />
                    </div>
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis pl-2 pt-2 font-bold">{title}</div>
                    <div className="opacity-70 text-[15px] pl-2"> {discription} </div>
                </div>
            </a>
        </>
    )
}

export default Card;