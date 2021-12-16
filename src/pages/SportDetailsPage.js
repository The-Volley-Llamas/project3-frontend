import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import loader from "../running-man.gif";
import { AuthContext } from "./../context/auth.context";
import Confirmation from "../components/Confirmation";
import { useHistory } from "react-router";
import Map from "../components/Map";

const API_URI = process.env.REACT_APP_API_URI;

function SportDetailsPage(props) {
  const [sport, setSport] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id: sportId } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [joined, setJoined] = useState(false);
  const [userClicked, setUserClicked] = useState("events");
  //const [removed, setRemoved] = useState(false);
  const history = useHistory();

  const handleOnClick = (name) => {
    if (name === "events") {
      setUserClicked("events");
    } else if (name === "map") {
      setUserClicked("map");
    }
  };

  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  useEffect(() => {
    axios
      .get(`${API_URI}/api/event/${sportId}`)
      .then((response) => {
        setSport(response.data);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [joined]);

  function handleSubmit() {
    if (!isLoggedIn) return history.push("/login");
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URI}/api/join/${sportId}/${user._id}`,
        { user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((response) => {
        setMessage(response.data);
        setJoined(true);
      })
      .catch(console.log);
  }

  function handleLeave() {
    if (!isLoggedIn) return history.push("/login");
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URI}/api/remove/${sportId}/${user._id}`,
        { user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((response) => {
        setMessage(response.data);
        setJoined(false);
      })
      .catch(console.log);
  }
  /*function deletedEvent() {
    const localJWTToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URI}/api/remove/${sportId}/${user._id}`,
        { user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((response) => {
        setRemoved(true);
      })
      .catch(console.log);
  }*/

  return (
    <div>
      <button
        name="events"
        className="bg-transparent text-black-300 font-semibold hover:text-black py-2 px-4 border border-black-900 shadow-lg mb-5"
        onClick={(e) => handleOnClick(e.target.name)}
      >
        Event
      </button>
      <button
        name="map"
        className="bg-transparent text-black-300 font-semibold hover:text-black py-2 px-4 border border-black-900 shadow-lg mb-5"
        onClick={(e) => handleOnClick(e.target.name)}
      >
        Map
      </button>

      {isLoading ? (
        <>
          <img className="loading" src={loader} alt="loading..." />
          <p>Loading...</p>
        </>
      ) : (
        <>
          {userClicked === "events" ? (
            <div className="md:flex md:justify-center">
              <img className="md:w-50 md:h-40" src={sport.venue.image} alt="" />
            </div>
          ) : (
            <Map
              venue={{
                latitude: sport.venue.location.coordinates[0],
                longitude: sport.venue.location.coordinates[1],
                name: sport.venue.name,
                address: sport.venue.location.type,
                image: sport.venue.image,
                id: sport._id,
              }}
            ></Map>
          )}

          <h1 className="font-semibold text-2xl">{sport.sport}</h1>
          {sport.venue.location.type}

          <br />
          <br />
          <div className="border-solid border-2 pt-1">
            <p>
              Attendees {sport.players.length}/{sport.numberOfPlayers}
            </p>
            <div className="flex flex-wrap justify-around w-10/12 mx-auto">
              {sport.players.map((player) => (
                <>
                  <div className="flex flex-col items-center w-24 my-2">
                    <ul>
                      <li className="items-center">
                        {" "}
                        <span>{player.name}</span>
                        <span>
                          {" "}
                          <img
                            className="w-10 rounded-full"
                            src={player.profileImage}
                            alt="manimg"
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ))}
            </div>
            <br />
            <p>Time: {sport.time}</p>
            <p> {sport.price}€</p>
            <br />
          </div>
          {!joined ? (
            <button
              className="w-20 mt-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md shadow-lg"
              onClick={handleSubmit}
            >
              Join
            </button>
          ) : (
            <>
              <Confirmation message={[message]}></Confirmation>
              <button
                className="w-20 mt-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md shadow-lg"
                onClick={handleLeave}
              >
                Leave
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SportDetailsPage;
