import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URI = process.env.REACT_APP_API_URI;

export default function NewEvent() {
  const [formState, setFormState] = useState({
    sport: "Football",
    numberOfPlayers: 0,
    players: [],
    venue: "",
    date: "",
    time: "",
    price: 0,
  });
  const [venueList, setVenueList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URI}/api/venue`)
      .then((response) => {
        setVenueList(response.data);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  function handleSubmit(e) {
    const localJWTToken = localStorage.getItem("authToken");

    e.preventDefault();

    axios
      .post(
        `${API_URI}/api/event/add`,
        { formState, user },
        {
          headers: { Authorization: `Bearer ${localJWTToken}` },
        }
      )
      .then((respnse) => {
        history.push("/home");
      })
      .catch(console.log);
  }

  function handleInput(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value }); // setFormState(Object.assign{}, state, {[e.name]: e.value}))
  }

  return (
    <div className="CreateEvent">
      <form classname="flex flex-col justify-center " onSubmit={handleSubmit}>
        <div className="flex flex-col items-center  py-20 addForm">
          <label className="items-start">Sport:</label>
          <select
            className="bg-gray-300"
            name="sport"
            id="sport"
            form="sports_form"
            onChange={handleInput}
            value={formState.sport}
          >
            <option value="Football">Football</option>
            <option value="Beach-Volleyball">Beach Volleyball</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Table-Tennis">Table-Tennis</option>
            <option value="Padel">Padel</option>
            <option value="Yoga">Yoga</option>
            <option value="Accessible">Accessible</option>
            <option value="Individual">Individual</option>
          </select>

          <label>Attendees needed:</label>
          <input
            className="bg-gray-300"
            type="number"
            name="numberOfPlayers"
            onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
            value={formState.numberOfPlayers}
          />

          <label htmlFor="venue">Venue:</label>
          <select
            className="bg-gray-300"
            name="venue"
            id="venue"
            form="sports_form"
            onChange={handleInput}
            value={formState.venue}
          >
            {venueList
              .filter((venue) =>
                venue.sport.some((sportName) =>
                  (sportName || "").includes(formState.sport)
                )
              )
              .map((venue) => {
                return <option value={venue._id}>{venue.name}</option>;
              })}
          </select>

          <label>Date:</label>
          <input
            className="bg-gray-300"
            type="date"
            name="date"
            onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
            value={formState.date}
          />

          <label>Time:</label>
          <input
            className="bg-gray-300"
            type="time"
            name="time"
            onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
            value={formState.time}
          />

          <label>Price €:</label>
          <input
            className="bg-gray-300"
            type="number"
            name="price"
            onChange={handleInput} // onChange={(e) => setPrice(e.target.value)}
            value={formState.price}
          />

          <button
            type="submit"
            className="shadow-lg mt-4 bg-gray-400 rounded-2xl"
          >
            Create an event
          </button>
        </div>
      </form>
    </div>
  );
}
