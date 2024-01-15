import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../App.css";

const Main = () => {
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {


    // // Connect to the socket server
    // const socket = io('http://wssc.datakick.in:6003');

    // // Emit 'room' event to join the room
    // socket.emit('room', 'rate_SkyLive');

    // // Listen for 'LiveData' events in the specific room
    // socket.on('LiveData', (data) => {
    //     setLiveData((prevData) => [...prevData, data]);
    //     console.log('Received LiveData:', data);
    // });

    // // Clean up the socket connection on component unmount
    // return () => {
    //     socket.disconnect();
    // };

    const socket = io("http://goldapi.dialerp.com/");

    socket.on("LiveData", (data) => {
      const parsedData = data.map((item) => JSON.parse(item));
      setLiveData((prevData) => [parsedData, ...prevData.slice(0, 4)]);
     // console.log("Received LiveData:", parsedData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("live", liveData);

  return (
    <div>
    <div style={{ margin: 23, fontSize: 40 }}>
      Get Live Gold & Silver Prices..
    </div>

    <div className="row" style={{margin:25}}>
      {liveData[0]?.map((data, i) => (
        <div key={i} style={{width:"18.5rem"}}  className="col-md-2 mb-4">
          <div className="card">
            <img
              src="https://th.bing.com/th/id/R.6c5c433591a535626a0074ac7806b281?rik=jWJlWuOOChOhHg&riu=http%3a%2f%2fbeverlyhillsmagazine.com%2fwp-content%2fuploads%2fGold-and-Silver-Investments.jpg&ehk=jUAr0go1I9y0uXo8RaY6YHsSlxgeXaydXBkJrrMCeY0%3d&risl=&pid=ImgRaw&r=0"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Name: {data.symbol.toUpperCase()}</h5>
              <p style={{ color: "green" }} className="card-text">
                Bid: {data.Bid}₹ | Ask: {data.Ask}₹
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{"LTP"} {" : "} {data.LTP}{"₹"}</li>
              <li className="list-group-item">High: {data.High}₹</li>
              <li className="list-group-item">Low: {data.Low}₹</li>
              <li className="list-group-item">Time: {data.Time}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Main;
