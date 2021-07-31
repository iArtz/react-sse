import ReactTable from "react-table";
import { getInitialFlightData } from "./DataProvider";
import "react-table/react-table.css";
import React, { useEffect, useState, useMemo, useCallback } from "react";

function AppFunc() {
  const [data, setData] = useState(useMemo(() => getInitialFlightData(), []));
  const [columns] = useState([
    {
      Header: "Origin",
      accessor: "origin",
    },
    {
      Header: "Flight",
      accessor: "flight",
    },
    {
      Header: "Arrival",
      accessor: "arrival",
    },
    {
      Header: "State",
      accessor: "state",
    },
  ]);
  const eventSource = useMemo(
    () => new EventSource("http://localhost:5000/events"),
    []
  );

  useEffect(() => {
    eventSource.addEventListener("flightStateUpdate", (e) =>
      updateFlightState(JSON.parse(e.data))
    );
    eventSource.addEventListener("flightRemoval", (e) =>
      removeFlight(JSON.parse(e.data))
    );
    eventSource.addEventListener("closedConnection", () => stopUpdates());
  }, []);

  const updateFlightState = useCallback((flightState) => {
    const newData = data.map((item) => {
      if (item.flight === flightState.flight) {
        item.state = flightState.state;
      }
      return item;
    });

    setData(newData);
  }, []);

  const removeFlight = useCallback((flightInfo) => {
    const newData = data.filter((item) => item.flight !== flightInfo.flight);
    setData(newData);
  }, []);

  const stopUpdates = () => {
    eventSource.close();
  };

  return (
    <div className="App">
      <h1>Func</h1>
      <button onClick={() => stopUpdates()}>Stop updates</button>
      <ReactTable data={data} columns={columns} defaultPageSize={6} />
    </div>
  );
}

export default AppFunc;
