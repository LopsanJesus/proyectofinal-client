import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BranchList from "../BranchList";
import CreateBranchButton from "../CreateBranchButton";
import Container from "react-bootstrap/Container";
import TreeLanguageFlags from "../TreeLanguageFlags";

import { GET_TREE, IMPORT_TREE } from "../../queries/forest";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import "./Tree.scss";
import { Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Tree = ({ user }) => {
  const { t } = useTranslation();
  const params = useParams();
  const [checked, setChecked] = useState("");

  const { loading: loadingTree, error, data } = useQuery(GET_TREE, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(params.id) },
  });

  const [importTreeMutation] = useMutation(IMPORT_TREE, {
    onError(error) {
      alert("Error al importar" + error);
    },
    onCompleted() {},
  });

  if (loadingTree) return <div>Loading...</div>;
  if (error) return <div>ERROR. Ese árbol no existe.</div>;

  if (
    !checked &&
    user &&
    data.getTree.importedBy.filter(
      (importedTree) => importedTree.userId.id === user.id
    ).length > 0
  )
    setChecked("checked");

  const handleStarClick = () => {
    if (checked === "") {
      setChecked("checked");
      importTreeMutation({
        variables: {
          id: parseInt(params.id),
        },
      });
    }
  };

  return (
    <Container fluid className="Tree">
      {!user && <Alert variant="warning">{t("treeList.needToAccess")}</Alert>}
      {user && !checked && (
        <Alert variant="primary">{t("treeList.addToForestSuggestion")}</Alert>
      )}
      {!data.getTree.branches.find((branch) => {
        return branch.leaves.find((leaf) => {
          return leaf;
        });
      }) && <Alert variant="warning">{t("treeList.noLeavesNoPractice")}</Alert>}
      <h3 className="tree-header">
        <TreeLanguageFlags
          sourceLangCode={data.getTree.sourceLang.code}
          targetLangCode={data.getTree.targetLang.code}
        />
        {data.getTree.name}
        {user && (
          <span
            className={"fa fa-star " + checked}
            onClick={handleStarClick}
            title="Añadir a Mi Bosque"
          ></span>
        )}
        {checked && (
          <Link to={"/practice/" + params.id}>
            <Button
              variant="primary"
              disabled={
                data.getTree.branches.find((branch) => {
                  return branch.leaves.find((leaf) => {
                    return leaf;
                  });
                })
                  ? null
                  : "disabled"
              }
            >
              {t("branch.testTreeButton")}
            </Button>
          </Link>
        )}
      </h3>
      <BranchList
        branches={data.getTree.branches}
        isImported={checked !== ""}
      />

      {user && data.getTree.owner.id === user.id && (
        <CreateBranchButton treeId={params.id} />
      )}
    </Container>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Tree);
