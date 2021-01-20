import React from "react";
import { Link } from "react-router-dom";

import TreeLanguageFlags from "../TreeLanguageFlags";
import { Card } from "react-bootstrap";

import "./TreeCard.scss";
import { useTranslation } from "react-i18next";

const TreeCard = ({ tree, isCreatedByMe }) => {
  const { t } = useTranslation();

  const importedTimes = tree.treeId.importedBy.length;

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
          <small className="text-muted">
            <span title={tree.treeId.owner.email}>
              {isCreatedByMe ? "Original" : tree.treeId.owner.name}
            </span>
            <span
              className="imported-by"
              title={
                t("treeList.imported") +
                " " +
                importedTimes +
                " " +
                t("treeList.times")
              }
            >
              <span className="fa fa-star checked"></span>
              {importedTimes}
            </span>
          </small>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default TreeCard;
