import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {

	const toInstagram = ()=> {
		const newWindow = window.open('https://www.instagram.com/leomessi/');
        if (newWindow) newWindow.opener = null
	}

	const toX= ()=> {
		const newWindow = window.open('https://twitter.com/mauriciomacri');
        if (newWindow) newWindow.opener = null
	}
	const toFacebook= ()=> {
		const newWindow = window.open('https://www.facebook.com/Cristiano');
        if (newWindow) newWindow.opener = null
	}
	const toTiktok= ()=> {
		const newWindow = window.open('https://www.tiktok.com/foryou');
        if (newWindow) newWindow.opener = null
	}
	const goToAddress= ()=> {
		const newWindow = window.open('https://www.google.es/maps/place/28760+Tres+Cantos,+Madrid/@40.6015673,-3.7291096,14z/data=!3m1!4b1!4m6!3m5!1s0xd43d51c39ab514b:0x1b8aecf9235eedd3!8m2!3d40.600727!4d-3.7079745!16zL20vMDQ1eXJz?entry=ttu');
        if (newWindow) newWindow.opener = null
	}

    return (
        <footer className='bg-gray-light/10'>
            <div className="flex items-center justify-center md:flex-row flex-col justify-around items-start p-20">
				<div className="p-5 ">
					<ul>
						<p className="text-gray-800 font-bold text-3xl pb-4">
							Barber<span className="text-primary">Ship</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FontAwesomeIcon onClick={toInstagram} icon={faInstagram} className="text-2xl cursor-pointer hover:text-primary" />
							<FontAwesomeIcon onClick={toX} icon={faXTwitter} className="text-2xl cursor-pointer hover:text-primary" />
							<FontAwesomeIcon onClick={toFacebook} icon={faFacebook} className="text-2xl cursor-pointer hover:text-primary" />
							<FontAwesomeIcon onClick={toTiktok} icon={faTiktok} className="text-2xl cursor-pointer hover:text-primary" />
						</div>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4">Tripulantes</p>
						<li className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							Pablo Tamanini
						</li>
						<li className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							Cristian Sancho
						</li>
						<li className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							Rober Pires
						</li>
					</ul>
				</div>
				<div className="p-5">
					<ul>
						<p className="text-gray-800 font-bold text-2xl pb-4 text-center ">Visitanos</p>
						<li onClick={goToAddress} className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							Tres Cantos
						</li>
						<li className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							288760 - Madrid - España
						</li>
					</ul>
				</div>
			</div>
            <div className='bg-primary p-5 text-white text-center'>
                <h5>&copy; 2024 Todos los derechos reservados</h5>
            </div>
        </footer>
    )
}