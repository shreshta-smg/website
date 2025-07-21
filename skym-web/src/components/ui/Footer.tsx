"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "News", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/rajashree.n.37?mibextid=ZbWKwL",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="accentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.812c-3.233 0-4.188 1.508-4.188 4.035v2.965z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="accentColor"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.598-3.852-1.598-5.878 0-6.592 5.306-11.967 11.803-11.967 3.272 0 6.336 1.341 8.577 3.57c2.245 2.238 3.588 5.278 3.588 8.563s-1.341 6.324-3.579 8.563c-2.245 2.239-5.286 3.582-8.572 3.582l-6.205 1.694zm6.559-4.848l-.349-.198c-.183-.104-.37-.156-.554-.156c-.349 0-.671.134-.946.366l-.089.076c-.461.378-1.041.874-1.559 1.488-.035.039-.063.076-.089.104l-1.319.452c-.161.055-.333-.004-.388-.164l-.567-1.644c-.055-.164-.004-.333.161-.388l1.319-.452c.035-.012.063-.024.089-.035l.089-.076c.275-.232.597-.366.946-.366.366 0 .715.156 1.025.432l.366.315c.035.035.076.047.104.047.024 0 .047-.008.07-.024l.149-.092c.164-.108.315-.224.452-.357c.306-.28.567-.584.783-.916.195-.29.352-.61.464-.946.035-.104.059-.216.059-.349 0-.092-.008-.19-.024-.282l-.089-.349c-.055-.164-.004-.333.161-.388l1.644-.567c.164-.055.333-.004.388.161l.567 1.644c.055.164.004.333-.161.388l-1.319.452c-.035.012-.063.024-.089.035l-.089.076c-.275.232-.597.366-.946.366c-.366 0-.715-.156-1.025-.432zM11.803 1.967c5.448 0 9.873 4.408 9.873 9.873s-4.408 9.873-9.873 9.873c-2.923 0-5.636-1.295-7.558-3.34l-1.565.426 1.173-4.288c-.996-1.63-1.521-3.523-1.521-5.461 0-5.448 4.408-9.873 9.873-9.873z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/rajashree.yoga?igsh=emh6cGJzYTM5bnIx",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="accentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-base-300 text-base-content">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold gradient-text mb-4 inline-block"
            >
              SKYM
            </Link>
            <p className="text-base-content/70 mb-6 leading-relaxed">
              Transforming businesses with innovative technology solutions. We
              build the future, one project at a time.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="btn btn-circle btn-sm btn-outline hover:btn-primary transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base-content/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base-content/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base-content/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-base-content/70">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1 md:w-64"
              />
              <button className="btn btn-primary btn-animate">
                Subscribe
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="accentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-base-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-base-content/70 text-sm">
              © {currentYear} SKYM. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <span className="text-base-content/70">
                Made with ❤️ by SKYM Team
              </span>
              <div className="flex items-center gap-2 text-base-content/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="accentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Innovation City, IC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
