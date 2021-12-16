import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import loader from "../running-man.gif";
import { AuthContext } from "./../context/auth.context";
import Confirmation from "../components/Confirmation";
import { useHistory } from "react-router";

const API_URI = process.env.REACT_APP_API_URI;

function SportDetailsPage(props) {
  const [sport, setSport] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id: sportId } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [joined, setJoined] = useState(false);
  //const [removed, setRemoved] = useState(false);

  const history = useHistory()

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
    <div className="SportDetails">
      {isLoading ? (
        <>
          <img
            className="loading"
            src={loader}
            alt="loading..."
            width="130"
            height="130"
          />
          <p>Loading...</p>
        </>
      ) : (
        <>
          <img src={sport.venue.image} alt="not found" />

          <h1>
            {sport.sport}, {sport.venue.location.type}
          </h1>
          <p> </p>
          <p>
            Attendees {sport.players.length}/{sport.numberOfPlayers}
          </p>
          <div>
            {sport.players.map((player) => (
              <>
              <ul>
                <li>{player.name}</li>
              
              </ul>
              <img src={player.profileImage} alt=""/>
              </>
            ))}
          </div>
          <p>Time: {sport.time}</p>
          <p> {sport.price}€</p>

          {message === "" ? (
            <button
              className="w-20 mt-5 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md shadow-lg"
              onClick={handleSubmit}
            >
              Join
            </button>
          ) : (
            <Confirmation message={[message]}></Confirmation>
          )}
        </>
      )}
    </div>
  );
}

export default SportDetailsPage;
