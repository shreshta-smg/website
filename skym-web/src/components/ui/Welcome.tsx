"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // For optimized image loading

const HAS_SHOWN_WELCOME_MODAL_KEY = "hasShownWelcomeModal";

const WelcomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage to see if the modal has been shown before
    const hasShown = localStorage.getItem(HAS_SHOWN_WELCOME_MODAL_KEY);

    if (!hasShown) {
      setIsOpen(true); // Show the modal
      localStorage.setItem(HAS_SHOWN_WELCOME_MODAL_KEY, "true"); // Mark as shown
    }
  }, []); // Run only once on component mount

  const handleClose = () => {
    setIsOpen(false);
  };

  // DaisyUI modal structure
  // The 'dialog' element is used here as a controlled component via 'open' prop.
  // We use `daisy-modal-backdrop` and a click handler on it to close the modal when clicked outside.
  return (
    <dialog
      id="krishna_welcome_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      onClick={handleClose}
    >
      <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-6">
        <form method="dialog">
          {/* Close button at the top right */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </form>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          {/* Krishna SVG Image */}
          <div className="flex-shrink-0 w-full max-w-xs lg:max-w-[45%]">
            <Image
              src="/krishna.svg" // Adjust to your actual SVG path in public folder
              alt="Krishna holding a flute with a blue hue"
              width={300} // Adjust as per your SVG's viewBox or desired display size
              height={300} // Adjust as per your SVG's viewBox or desired display size
              className="rounded-lg shadow-xl"
              priority={isOpen} // Load with priority ONLY when modal is open
            />
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left lg:max-w-[55%]">
            <h3 className="font-bold text-3xl text-primary mb-2">
              Shree Krishna Yoga Mandiram
            </h3>
            <p className="py-4 text-base">
              Welcome to a place of peace, wisdom, and spiritual growth. Here,
              we embrace the teachings and tranquility inspired by Lord Krishna,
              guiding you on your journey towards inner harmony through yoga and
              meditation.
            </p>
            <div className="modal-action mt-4 justify-center lg:justify-start">
              <button className="btn btn-primary" onClick={handleClose}>
                Enter & Explore
              </button>
              {/* You could add another button here, e.g., "Learn More" */}
            </div>
          </div>
        </div>
      </div>
      {/* Clickable backdrop to close the modal */}
      <form method="dialog" className="modal-backdrop" onClick={handleClose}>
        <button type="button">Close</button>
      </form>
    </dialog>
  );
};

export default WelcomePage;
