import React from "react";
import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    
    <div class="h-max bg-gradient-to-r from-lime-600 ... ">
      <img
        className="mt-20 w-50"
        src="/assets/Frame 15.png"
        alt="splash-logo"
      />

      <Link
        className="m-4 shadow-lg bg-gray-400 rounded-full p-3"
        to="/home"
      >
        Start...
      </Link>
    </div>
  );
}
