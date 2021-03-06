import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <footer>
      <div className="flex justify-between">
        <Link to="/home">
          <button className="flex items-center flex-col">
            <img
              className="ml-1 mb-1"
              src="/assets/running.png"
              alt="running-man"
            />
            <div className="text-white">Home</div>
          </button>
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/new">
              <button>
                <img
                  className="mb-1 mt-1"
                  src="/assets/+.png"
                  alt="plus-sign"
                />
                <div className="text-white">Add</div>
              </button>
            </Link>
            <Link to="/profile">
              <button>
                <img
                  className="mb-1 ml-2"
                  src="/assets/coolicon.png"
                  alt="profile-icon"
                />
                <div className="text-white">Profile</div>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="flex items-center flex-col">
                <img
                  className="mb-2 mt-1"
                  src="/assets/+.png"
                  alt="plus-sign"
                />
                <div className="text-white">Sign up</div>
              </button>
            </Link>
            <Link to="/login">
              <button className="flex items-center flex-col">
                <img
                  className="mb-1 mt-1"
                  src="/assets/coolicon.png"
                  alt="profile-icon"
                />
                <div className="text-white">Login</div>
              </button>
            </Link>
          </>
        )}
      </div>
    </footer>
  );
}

export default Footer;
