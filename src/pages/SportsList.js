import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import loader from "../running-man.gif";
import MultipleMap from "../components/MultipleMap";

const API_URI = process.env.REACT_APP_API_URI;

function SportsListPage() {
  const [sportList, setSportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userClicked, setUserClicked] = useState("list");
  const { search } = useLocation();
  const { sport } = queryString.parse(search);

  const handleOnClick = () => {
    if (userClicked === "list") {
      setUserClicked("map");
    } else if (userClicked === "map") {
      setUserClicked("list");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URI}/api/event`)
      .then((response) => {
        console.log("response.data", response.data);
        const filteredSport = response.data.filter(
          (event) => event.sport === sport
        );
        setSportList(filteredSport);
        setIsLoading(false);
      })
      .catch(console.log);
  }, [sport]);

  // useEffect(() => {
  //const filteredSport = sportList.filter(event=> event.sport === sport)
  //   setSportList(filteredSport)
  // }, [sport])

  // const getAllSports = () => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .get(`${API_URI}/api/sports`, {
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => setSportList(response.data))
  //     .catch((error) => console.log(error));
  // };

  // // We set this effect will run only once, after the initial render
  // // by setting the empty dependency array - []
  // useEffect(() => {
  //   getAllSports();
  // }, []);

  return (
    <div className="SportsListPage">
      {isLoading ? (
        <>
          <img src={loader} alt="loading..." width="130" height="130" />
          <p>Loading...</p>
        </>
      ) : (
        <>
          {userClicked === "list" ? (
            <>
              <div className="font-extrabold text-3xl mt-10">
                <h1>{sport}</h1>

                <button
                  className="bg-transparent text-black-300 font-semibold hover:text-black py-2 px-4 border border-black-900"
                  onClick={handleOnClick}
                >
                  MAP
                </button>

                <button
                  className="bg-transparent text-black-300 font-semibold hover:text-black py-2 px-4 border border-black-900"
                  onClick={handleOnClick}
                >
                  LIST
                </button>
              </div>

              {sportList.map((sport) => {
                return (
                  <>
                    <div className="border-solid border-2">
                      <Link to={`sports/${sport._id}`}>
                        <div className="flex justify-start ml-3">
                          <div className="font-medium text-xl mt-5">
                            <h2>
                              {sport.venue.name}, {sport.venue.location.barrio}
                            </h2>
                          </div>
                        </div>
                      </Link>

                      <p className="flex justify-start ml-3">
                        {sport.date} @ {sport.time}
                      </p>
                      <p className="flex justify-start ml-3">
                        Attendees: {sport.players.length}/
                        {sport.numberOfPlayers}
                      </p>
                      <br />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <MultipleMap events={[sportList]}></MultipleMap>
          )}{" "}
        </>
      )}
    </div>
  );
}
export default SportsListPage;
