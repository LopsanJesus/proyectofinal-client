import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

import TreeCard from "../TreeCard";
import CreateTreeButton from "../CreateTreeButton";

import { GET_MY_FOREST } from "../../queries/forest";
import { useQuery } from "@apollo/client";

import { saveUserForest } from "../../actions/forest";

import "./TreeList.scss";

const TreeList = ({ user, trees, saveUserForest }) => {
  const { loading, error, data } = useQuery(GET_MY_FOREST, {
    fetchPolicy: "network-only"
  });

  if (loading) return <div>Haciendo crecer los árboles... (Sin Plutonio)</div>
  if (error) return <div>ERROR</div>

  saveUserForest(data.getMyForest)

  return (
    <Container fluid className="TreeList">
      {trees && user && trees.map((tree) => {
        return <TreeCard key={tree.id} tree={tree} isCreatedByMe={tree.treeId.owner.email === user.email} />;
      })}
      <CreateTreeButton />
    </Container>
  );
};

const mapStateToProps = ({ userInfo, forest }) => {
  return {
    user: userInfo.user,
    trees: forest.trees,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveUserForest: (trees) => dispatch(saveUserForest(trees)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
