'use client';

import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">💎 CardVault</h3>
            <p className="text-gray-300">Your ultimate destination for rare trading cards.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/a" className="hover:text-white transition">Home</a></li>
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/my-profile" className="hover:text-white transition">My Profile</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@cardvault.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Card Street, Collector City</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="text-gray-300 text-sm space-x-4">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Shipping Info</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 CardVault. All rights reserved. | Building the future of card collecting.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}