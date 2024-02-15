import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Logo from "./navbar/Logo";
import MainMenu from "./navbar/MainMenu";
import MobileMenu from "./navbar/MobileMenu";
import Footer from "./Footer";

export default function Layout({ children }) {
    // con estados, como si fuera un modal trabajamos con la navbar
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <header className='fixed left-0 top-0 w-full p-5 bg-black z-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <Logo />
                    </div>
                    <div className='hidden lg:flex justify-between items-center gap-5'>
                        <MainMenu />
                    </div>
                    <div className='lg:hidden'>
                        <button
                            type='button'
                            onClick={() => setShowMenu(!showMenu)}
                            className='text-white'
                        >
                            {showMenu ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                        </button>
                    </div>
                </div>
            </header>
            <div className='lg:hidden'>
                <MobileMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
            </div>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}