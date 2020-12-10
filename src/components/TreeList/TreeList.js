import React from 'react';
import './TreeList.scss';
import TreeCard from "../TreeCard";
import { Alert } from 'react-bootstrap';

const TreeList = ({ user, trees, view }) => {
  return <div className="TreeList">
    {trees && trees.length > 0 ? trees.map((tree) => {
      return <TreeCard key={tree.id} tree={tree} isCreatedByMe={user && tree.treeId.owner.email === user.email} view={view} />;
    }) :
      <Alert variant="info">No hay árboles que mostrar</Alert>
    }
  </div>;
};

export default TreeList;
