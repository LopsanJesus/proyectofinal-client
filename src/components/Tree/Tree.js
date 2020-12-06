import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import BranchList from "../BranchList";
import CreateBranchButton from "../CreateBranchButton";
import Container from "react-bootstrap/Container";

import { GET_TREE, IMPORT_TREE } from "../../queries/forest";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import "./Tree.scss";

const Tree = ({ user }) => {
  const params = useParams();
  const [checked, setChecked] = useState("");

  const { loading: loadingTree, error, data } = useQuery(GET_TREE, {
    fetchPolicy: "network-only",
    variables: { id: parseInt(params.id) }
  });

  const [importTreeMutation/*, { loadingimportTreeMutation }*/] = useMutation(IMPORT_TREE, {
    onError(error) {
      alert("Error al importar" + error);
    },
    onCompleted() {
      console.log("Importado correctamente");
    },
  });

  if (loadingTree) return <div>Loading...</div>
  if (error) return <div>ERROR. Ese árbol no existe.</div>

  if (!checked && data.getTree.importedBy.filter((importedTree) => importedTree.userId.id === user.id).length > 0)
    setChecked("checked");

  const handleStarClick = () => {
    if (checked === "") {
      setChecked("checked");
      importTreeMutation({
        variables: {
          id: parseInt(params.id)
        }
      });
    }
  }

  return (
    <Container fluid className="Tree">
      <h3>
        {data.getTree.name}
        <span
          className={"fa fa-star " + checked}
          onClick={handleStarClick}
          title="Añadir a Mi Bosque"
        ></span>
      </h3>
      {data.getTree.sourceLang.name}
      <BranchList branches={data.getTree.branches} isImported={checked !== ""} />

      {data.getTree.owner.id === user.id && <CreateBranchButton />}
    </Container>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Tree);
