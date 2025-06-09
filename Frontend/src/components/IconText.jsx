import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
    return (
        <Link to={targetLink} >
            <div
                className="list m-4 w-[26vw] flex"
                onClick={onClick}
            >

                <Icon
                    icon={iconName}
                    width="25"
                    height="25"
                    className={`${active ? "opacity-100" : "opacity-70"} mt-2`}
                />

                <span className={`${active ? "opacity-100": "opacity-70"} p-2.5 cursor-pointer hover:opacity-100 font-bold`}>{displayText}</span>
            </div>
        </Link>
    );
};

export default IconText;