import React from "react";
import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    <div className="Splashpage">
    <div class="md:flex md:justify-center md:w-50">
      <img
        className="mt-20 w-50"
        src="/assets/Frame 15.png"
        alt="splash-logo"
      />
<br/>
      <Link
        className="m-4 shadow-lg bg-gray-400 rounded-full p-3 md:h-10"
        to="/home"
      >
        Start...
      </Link>
      </div>
    </div>
  );
}
