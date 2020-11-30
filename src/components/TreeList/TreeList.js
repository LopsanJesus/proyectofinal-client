import React from "react";

import Container from "react-bootstrap/Container";

import TreeCard from "../TreeCard";
import CreateTreeButton from "../CreateTreeButton";

import { GET_MY_FOREST } from "../../queries/trees";
import { useQuery } from "@apollo/client";

import "./TreeList.scss";

const treeList = [
  { id: 1, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 2, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 3, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 4, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 5, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 6, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 7, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 8, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 9, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 10, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 11, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 12, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 13, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 14, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 15, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 16, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 17, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 18, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 19, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 20, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 21, name: "Titulo tree3", owner: "cris", language: "FR" },
  { id: 22, name: "Titulo tree1", owner: "jesus", language: "GB" },
  { id: 23, name: "Titulo tree2", owner: "curro", language: "ES" },
  { id: 24, name: "Titulo tree3", owner: "cris", language: "FR" },
];

const TreeList = () => {
  const { loading, error, data } = useQuery(GET_MY_FOREST);

  if (loading) return <div>Loading...</div>

  return (
    <Container fluid className="TreeList">
      {data.getMyForest.map((tree) => {
        return <TreeCard key={tree.id} tree={tree} />;
      })}
      <CreateTreeButton />
    </Container>
  );
};

export default TreeList;
