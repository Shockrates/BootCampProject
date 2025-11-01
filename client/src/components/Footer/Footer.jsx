import logo from '../../assets/ReelTalk.png'
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="bg-stone-900 text-slate-200 py-8 mt-8 border-t border-stone-700">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">

                {/* Left section with logo, text, and socials */}
                <div className="flex flex-col items-center sm:items-start space-y-3 flex-shrink-0 max-w-md ">
                    {/* Logo + Text */}
                    <div className="flex items-start space-x-3 mb-4">
                        <img src={logo} alt="Logo" className="w-20 h-20 object-contain flex-shrink-0" />

                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-10 text-lg mt-10">
                        <Link to="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
                            <FaFacebook />
                        </Link>
                        <Link to="#" aria-label="Twitter" className="hover:text-sky-400 transition-colors">
                            <FaTwitter />
                        </Link>
                        <Link to="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
                            <FaInstagram />
                        </Link>
                        <Link to="#" aria-label="YouTube" className="hover:text-red-600 transition-colors">
                            <FaYoutube />
                        </Link>
                    </div>
                </div>

                {/* Right - Links (can grow freely) */}
                {/* Right - Links (vertical layout, right-aligned container, left-aligned text) */}
                <div className="flex flex-col items-end sm:items-end flex-grow">
                    <div className="flex flex-col text-left space-y-2 w-fit">
                        <Link to="/terms" className="hover:text-white transition-colors">
                            Όροι χρήσης
                        </Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">
                            Απόρρητο
                        </Link>
                        <Link to="/contact" className="hover:text-white transition-colors">
                            Επικοινωνία
                        </Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">
                            Προτιμήσεις Cookies
                        </Link>
                        <Link to="/aboutUs" className="hover:text-white transition-colors">
                            Ποιοι είμαστε
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom line */}
            <div className="text-center text-xs text-slate-400 mt-6">
                © {new Date().getFullYear()} YourCompany. Όλα τα δικαιώματα διατηρούνται.
            </div>
        </footer>
    );
}
