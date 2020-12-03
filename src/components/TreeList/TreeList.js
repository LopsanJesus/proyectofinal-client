import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";

import TreeCard from "../TreeCard";
import CreateTreeButton from "../CreateTreeButton";

import { GET_MY_FOREST } from "../../queries/forest";
import { useQuery } from "@apollo/client";

import { saveUserForest } from "../../actions/forest";

import "./TreeList.scss";

const TreeList = ({ trees, saveUserForest }) => {
  const { loading, error, data } = useQuery(GET_MY_FOREST, {
    fetchPolicy: "network-only"
  });

  if (loading) return <div>Loading...</div>
  //if (error) return <div>ERROR</div>

  console.log(data.getMyForest);
  //return <>{data}</>
  saveUserForest(data.getMyForest)

  return (
    <Container fluid className="TreeList">
      {trees && trees.map((tree) => {
        return <TreeCard key={tree.id} tree={tree} />;
      })}
      <CreateTreeButton />
    </Container>
  );
};

const mapStateToProps = ({ forest }) => {
  return {
    trees: forest.trees,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveUserForest: (trees) => dispatch(saveUserForest(trees)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
