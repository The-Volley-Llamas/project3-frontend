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
      <button
        className="font-semibold underline text-xl"
        onClick={handleOnClick}
      >
        My Games
      </button>
      <button
        className="font-semibold underline text-xl"
        onClick={(handleOnClick, logOutUser)}
      >
        Logout
      </button>
      <>
        {userGamesList.map((event) => {
          return (
            <div className="border border-black-900">
              <Link to={`sports/${event._id}`}>
                  <h2>{event.sport}</h2>
                <ul>
                  <p>
                    Attendees: {event.players.length}/{event.numberOfPlayers}
                  </p>
                  <p>
                    {event.players.map((player) => {
                      return (
                        <>
                          <div className="flex flex-nowrap flex-col">
                            <div className="flex-col">
                              <p>{player.name}</p>
                              <img
                                src={player.profileImage}
                                alt=""
                                width="40px"
                                height="40px"
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
                className="shadow-lg mt-2 mb-4 bg-gray-400 rounded-2xl"
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
