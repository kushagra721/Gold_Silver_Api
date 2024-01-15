import Header from "./Components/Header";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Main from "./Components/Main";

function App() {
  

  return (
    <>
      <Header />
      <Main/>
     
    </>
  );
}

export default App;
