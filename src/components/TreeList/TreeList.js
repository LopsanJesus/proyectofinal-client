import React from 'react';
import './TreeList.scss';
import TreeCard from "../TreeCard";
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TreeList = ({ user, trees, view }) => {
  const { t } = useTranslation();
  return <div className="TreeList">
    {trees && trees.length > 0 ? trees.map((tree) => {
      return <TreeCard key={tree.id} tree={tree} isCreatedByMe={user && tree.treeId.owner.email === user.email} view={view} />;
    }) :
      <Alert variant="info">{t('treeList.noTrees')}</Alert>
    }
  </div>;
};

export default TreeList;
