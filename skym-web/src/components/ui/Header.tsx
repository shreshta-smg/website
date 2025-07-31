"use client";

import { useState } from "react";
import Link from "next/link";
import AuthStatus from "./AuthStatus";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
    { name: "Blog", href: "/blog/categories" },
    { name: "Review", href: "/#review" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-xl font-bold gradient-text"
        >
          SKYM
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <AuthStatus />
        <Link href="#contact" className="btn btn-primary btn-animate">
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;
