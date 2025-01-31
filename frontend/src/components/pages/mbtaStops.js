import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Stops() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://api-v3.mbta.com/stops?page%5Blimit%5D=100&sort=platform_name&filter%5Bdirection_id%5D=1"
      );
      setStops(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {stops.map((stop) => (
        <Card
          body
          outline
          color="success"
          className="mx-1 my-2"
          style={{
            width: "40rem",
            height: "10rem",
            color: "red",
            background: "#c692d1",
          }}
        >
          <Card.Body>
            <Card.Title style={{ color: "Green" }}>Stop</Card.Title>
            <Card.Text>
              {stop.attributes.header}
              {stop.attributes.name}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

      <h1>Stops!</h1>
      {stops.map((stop) => (
        <div key={stop.id}>
          <h3>{stop.attributes.header}</h3>
          <p>{stop.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Stops;
