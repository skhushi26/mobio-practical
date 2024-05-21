import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </>
  );
}
