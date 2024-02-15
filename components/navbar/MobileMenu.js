import React from 'react';
import MainMenu from './MainMenu';


export default function MobileMenu({ isOpen, onClose }) {

    return (
        <>
            <div className={(isOpen ? 'left-0' : '-left-full') + " top-0 text-gray-500 p-8 fixed w-9/12 bg-black h-full rounded-lg z-40"}>
                <MainMenu />
            </div>
            <div
                onClick={onClose}
                className={(isOpen ? 'block':'hidden') + 'fixed left-0 top-0 w-full h-full bg-black/30 z-40' }
            />
        </>
    )
}