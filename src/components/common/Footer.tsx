/** @format */

import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Kolom 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Bhumi Aveshana</h3>
          <p className="text-sm text-gray-300 mb-4">
            Platform untuk menjelajah tempat wisata, UMKM, dan layanan publik
            berbasis lokasi dan preferensi personal.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/6281280000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Menu</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white transition">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/explore" className="hover:text-white transition">
                Jelajahi
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-white transition">
                Favorit
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white transition">
                Profil
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Kategori</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="hover:text-white transition">Wisata Alam</li>
            <li className="hover:text-white transition">UKM Makanan</li>
            <li className="hover:text-white transition">Tempat Hiburan</li>
            <li className="hover:text-white transition">Layanan Publik</li>
          </ul>
        </div>

        {/* Kolom 4 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>Email: info@bhumiaveshana.id</li>
            <li>Instagram: @bhumiaveshana</li>
            <li>Facebook: fb.com/bhumiaveshana</li>
            <li>WhatsApp: +62 812-xxxx-xxxx</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 border-t border-blue-800 py-4">
        © {new Date().getFullYear()} Bhumi Aveshana. Made with ❤️ by YTECH
        DIGITAL SOLUTIONS
      </div>
    </footer>
  );
}
