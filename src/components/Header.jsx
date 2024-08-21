import { useState } from "react"
import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";

export default function Header() {

    const [isDarkMode, setDarkMode] = useState(false);

    const logo = isDarkMode ? logoLight : logoDark;

    return (
        <header>
            <img id="mainLogo" src={logo} alt="Logo" width="150" height="auto" />
        </header>
    )
}