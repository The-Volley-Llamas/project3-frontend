import React from "react";
import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
      <div class="h-max bg-gradient-to-r from-lime-600 ... ">
      <img src="assets/splash logo.png" alt="splash-logo"/>
      <img className="/assets/Frame 15.png" alt="man"/>
        <Link to="/home">Get Started</Link>
    </div>
  );
}
