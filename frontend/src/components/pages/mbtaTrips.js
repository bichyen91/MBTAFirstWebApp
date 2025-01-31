import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://api-v3.mbta.com/trips?page%5Blimit%5D=200&include=route&filter%5Brevenue%5D=NON_REVENUE%2CREVENUE"
      );
      setTrips(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {trips.map((trip) => {
        // Move the backgroundColor assignment inside the map function
        const backgroundColor = trip.relationships.route.data.id || "gray"; // Default to gray if undefined

        return (
          <Card
            key={trip.id}
            body
            outline
            color="success"
            className="mx-1 my-2"
            style={{
              width: "40rem",
              height: "12rem",
              color: "red",
              background: "pink",
            }}
          >
            <Card.Body>
              <Card.Title style={{ color: "Green", fontFamily: "Chalkduster" }}>
                Trips
              </Card.Title>
              <Card.Text>
                Head sign is {trip.attributes.header}
                <span
                  style={{
                    color: "Red",
                    fontFamily: "Matura MT Script Capitals",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {trip.attributes.headsign}
                </span>
              </Card.Text>
              <Card.Text style={{ backgroundColor }}>
                {trip.relationships.route.data.id} Line
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}

      <h1>Trips!</h1>
      {trips.map((trip) => (
        <div key={trip.id}>
          <h3>{trip.attributes.header}</h3>
          <p>{trip.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Trips;
