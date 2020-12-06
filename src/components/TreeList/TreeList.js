import React from 'react';
import './TreeList.scss';
import TreeCard from "../TreeCard";

const TreeList = ({ user, trees, view }) => {
  return <div className="TreeList">
    {trees && trees.map((tree) => {
      return <TreeCard key={tree.id} tree={tree} isCreatedByMe={user && tree.treeId.owner.email === user.email} view={view} />;
    })}
  </div>;
};

export default TreeList;
