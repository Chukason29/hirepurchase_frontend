"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Features: [
    { name: "Buy Gift Cards", href: "#" },
    { name: "Sell Gift Cards", href: "#" },
  ],
  Products: [
    { name: "Airtime", href: "#" },
    { name: "Data", href: "#" },
  ],
  "Available Gift Cards": [
    { name: "Travel Gift Cards", href: "#" },
    { name: "Lifestyle Gift Cards", href: "#" },
  ],
};

const socialLinks = [
  { name: "X", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Whatsapp", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Threads", href: "#" },
  { name: "TikTok", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-white border-t">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">
        {Object.entries(footerLinks).map(([title, links], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-semibold text-lg text-blue-900">{title}</h4>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Link
                    href={link.href}
                    className="text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-900">
            © Hire Purchase {new Date().getFullYear()}
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                whileHover={{ scale: 1.1, color: "#1d4ed8" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  href={social.href}
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                >
                  {social.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
