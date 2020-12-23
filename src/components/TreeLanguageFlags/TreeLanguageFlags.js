import React from "react";

import { Image } from "react-bootstrap";

import "./TreeLanguageFlags.scss";

const TreeLanguageFlags = ({ sourceLangCode, targetLangCode }) => {
  return (
    <div className="TreeLanguageFlags">
      <Image
        src={"/" + sourceLangCode + ".png"}
        className="language-flag source-language-flag"
        title="Already known"
        roundedCircle
      />
      <span className="arrow">&#8680;</span>
      <Image
        src={"/" + targetLangCode + ".png"}
        className="language-flag target-language-flag"
        title="Learning"
        roundedCircle
      />
    </div>
  );
};

export default TreeLanguageFlags;
