import React from "react";
import { useParams } from "react-router-dom";
import "./Branch.scss";

const Branch = () => {
  const params = useParams();

  return <div>Branch {params.id}</div>;
};

export default Branch;
