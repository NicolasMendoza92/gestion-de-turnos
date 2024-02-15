import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
    return (
        <footer className='bg-gray-light/10'>
            <div className="flex items-center justify-center md:flex-row flex-col justify-around items-start p-20">
				<div className="p-5 ">
					<ul>
						<p className="text-gray-800 font-bold text-3xl pb-4">
							Barber<span className="text-primary">Ship</span>
						</p>
						<div className="flex gap-6 pb-5">
							<FontAwesomeIcon icon={faInstagram} className="text-2xl cursor-pointer hover:text-primary" />
							<FontAwesomeIcon icon={faTwitter} className="text-2xl cursor-pointer hover:text-primary" />
							<FontAwesomeIcon icon={faFacebook} className="text-2xl cursor-pointer hover:text-primary" />
							<FontAwesomeIcon icon={faTiktok} className="text-2xl cursor-pointer hover:text-primary" />
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
						<li className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							Calle del puerro 14
						</li>
						<li className="text-gray-500 text-center text-md pb-2 font-semibold hover:text-primary cursor-pointer">
							28002 - Madrid - España
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