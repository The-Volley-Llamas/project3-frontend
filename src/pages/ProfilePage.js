import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "./../context/auth.context";

function ProfilePage(props) {
  const [userGamesList, setUserGamesList] = useState([]);
  const API_URI = process.env.REACT_APP_API_URI;
  const { user, logOutUser } = useContext(AuthContext);
  const [removed, setRemoved] = useState(true);
  const [userClicked, setUserClicked] = useState("MYGAMES");

  const handleOnClick = () => {
    if (userClicked === "LOGOUT") {
      setUserClicked("MYGAMES");
    } else {
      setUserClicked("LOGOUT");
    }
  };

  useEffect(() => {
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URI}/api/profile/${user._id}/usergames`, {
        headers: { Authorization: `Bearer ${localJWTToken}` },
      })
      .then((response) => {
        setUserGamesList(response.data);
      })
      .catch(console.log);
  }, [removed]);

  function deletedEvent(eventId) {
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URI}/api/remove/${eventId}/${user._id}`,
        { user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((response) => {
        setRemoved(!removed);
      })
      .catch(console.log);
  }
  return (
    <div>
    <div className="ProfileButtons">
      <button
        className="font-semibold underline text-2xl"
        onClick={handleOnClick}
      >
        My Games
      </button>
      <button
        className="font-semibold underline text-2xl"
        onClick={(handleOnClick, logOutUser)}
      >
        Log out
      </button>
      </div>

      <>
        {userGamesList.map((event) => {
          return (
            <div className="border border-black-900">
              <Link to={`sports/${event._id}`}>
            
                <ul>
                  <p className="text-xl font-semibold border-2 p-2">
                    {event.sport}
                  </p>
                  <br />

                  <p className="font-semibold">
                    Attendees: {event.players.length}/{event.numberOfPlayers}
                  </p>
                  <p>
                    {event.players.map((player) => {
                      return (
                        <>
                          <div className="flex flex-row justify-center">
                            <div className="flex-row">
                              <p>{player.name}</p>
                              <img
                                className="rounded-full w-10 h-10"
                                src={player.profileImage}
                                alt=""
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </p>
                  <p> {event.venue.name}</p>

                  <p>{event.date}</p>
                  <p>{event.time}</p>
                  <p>{event.price}€</p>
                </ul>
              </Link>
              <button
                className="w-20 mt-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md shadow-lg"
                onClick={() => deletedEvent(event._id)}
              >
                Leave
              </button>
            </div>
          );
        })}
      </>
    </div>
  );
}

export default ProfilePage;
