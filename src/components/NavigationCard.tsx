import React from 'react';
import classes from "../styles/layout.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation, useNavigate} from "react-router-dom";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

interface NavigationCardProps {
    path: string,
    icon: IconDefinition,
    text: string
}

const NavigationCard: React.FC<NavigationCardProps> = ({path, icon, text}) => {

    const activeNavCard = `${classes.navCard} ${classes.navCardActive}`;

    const navigate = useNavigate();
    const location = useLocation()

    return (
        <div
            className={path !== '/' ?
                (location.pathname.includes(path) ? activeNavCard : classes.navCard)
                :
                location.pathname === path ? activeNavCard : classes.navCard}
            onClick={() => navigate(path)}>
            <FontAwesomeIcon icon={icon} size='3x'/>
            <span>{text}</span>
        </div>
    );
};

export default NavigationCard;