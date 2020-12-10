import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

import TreeList from "../TreeList";
import CreateTreeButton from "../CreateTreeButton";

import { GET_MY_FOREST } from "../../queries/forest";
import { useQuery } from "@apollo/client";

import { saveUserForest } from "../../actions/forest";

import "./MyForest.scss";

const MyForest = ({ user, trees, saveUserForest }) => {
  const { loading, error, data } = useQuery(GET_MY_FOREST, {
    fetchPolicy: "network-only"
  });

  if (loading) return <div>Haciendo crecer los árboles... (Sin materiales radiactivos)</div>
  if (error) return <div>ERROR. No podemos encontrar el bosque en el mapa.</div>

  saveUserForest(data.getMyForest)

  return (
    <Container fluid className="MyForest">
      <h2 className="header-title">Mi Bosque</h2>
      <TreeList user={user} trees={trees} view="myForest" />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyForest);
