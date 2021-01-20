import React from "react";
import { Image } from "react-bootstrap";
import "./Flag.scss";

const Flag = ({ src }) => {
  return (
    <Image
      src={"/" + src + ".png"}
      className="language-flag target-language-flag"
      title="Learning"
      roundedCircle
    />
  );
};

export default Flag;
