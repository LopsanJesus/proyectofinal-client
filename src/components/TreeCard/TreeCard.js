import React from "react";
import { Link } from "react-router-dom";

import TreeLanguageFlags from "../TreeLanguageFlags";
import { Card, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./TreeCard.scss";

const TreeCard = ({ tree, isCreatedByMe }) => {
  const { t } = useTranslation();
  return (
    <Link to={"/tree/" + tree.treeId.id}>
      <Card className="tree">
        <Card.Body className={isCreatedByMe ? "created-by-me" : ""}>
          <div className="tree-icon">
            <Card.Img variant="top" src="./tree-icon.png" />
          </div>
          <div className="title-and-flag">
            <Card.Title>
              <span className="title">{tree.customName}</span>
            </Card.Title>
            <TreeLanguageFlags
              sourceLangCode={tree.treeId.sourceLang.code}
              targetLangCode={tree.treeId.targetLang.code}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted" title={tree.treeId.owner.email}>
            {isCreatedByMe
              ? "Original"
              : t("treeList.createdBy") + ": " + tree.treeId.owner.name}
          </small>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default TreeCard;
