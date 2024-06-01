// src/components/footer/Footer.jsx
import React from 'react';
import Logo from '../../assets/JieShopLogoWhite.png';

const Footer = () => {
    return (
        <div className="px-4 md:px-8 bg-black"> {/* Contenedor con márgenes horizontales */}
            <footer className="flex justify-between items-center bg-black text-white p-4">
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="logo-small w-16" />
                    <span className='mt-2'>Your Shopping, Your Way.</span>
                </div>
                <div className="flex flex-wrap justify-end space-x-24 mt-4">
                    <div className="bottom-block mb-4 md:mb-0">
                        <div className="bottom-label">
                            <div className="label font-bold mb-2">Resources</div>
                        </div>
                        <a href="/privacy-policy" className="footer-link block mb-1">Products</a>
                        <a href="/terms-of-service" className="footer-link block mb-1">Shop</a>
                    </div>
                    <div className="bottom-block">
                        <div className="bottom-label">
                            <div className="label font-bold mb-2">Social</div>
                        </div>
                        <a href="https://twitter.com/strut_ai" target="_blank" className="footer-link block mb-1">X/Twitter</a>
                        <a href="https://discord.com/invite/cnQYcr5dzE" target="_blank" className="footer-link block">Discord</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
