import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BranchList from "../BranchList";
import CreateBranchButton from "../CreateBranchButton";
import Container from "react-bootstrap/Container";

import { GET_TREE, IMPORT_TREE } from "../../queries/forest";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import "./Tree.scss";
import { Button, Image } from "react-bootstrap";

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
      // console.log("Importado correctamente");
    },
  });

  if (loadingTree) return <div>Loading...</div>
  if (error) return <div>ERROR. Ese árbol no existe.</div>

  if (!checked && user && data.getTree.importedBy.filter((importedTree) => importedTree.userId.id === user.id).length > 0)
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
      <h3 className="tree-header">
        <Image
          src={"/" + data.getTree.sourceLang.code + ".png"}
          className="language-flag source-language-flag"
          title="Already known"
          roundedCircle
        />
        <span className="arrow">&#8680;</span>
        <Image
          src={"/" + data.getTree.targetLang.code + ".png"}
          className="language-flag target-language-flag"
          title="Learning"
          roundedCircle
        />
        {data.getTree.name}
        {user &&
          <span
            className={"fa fa-star " + checked}
            onClick={handleStarClick}
            title="Añadir a Mi Bosque"
          ></span>}
        {checked &&
          <Link to={"/practice/" + params.id}>
            <Button variant="primary">Practicar</Button>
          </Link>
        }
      </h3>
      <BranchList branches={data.getTree.branches} isImported={checked !== ""} />

      {user && data.getTree.owner.id === user.id && <CreateBranchButton treeId={params.id} />}
    </Container>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Tree);
