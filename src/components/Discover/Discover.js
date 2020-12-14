import React from 'react';
import { connect } from "react-redux";
import './Discover.scss';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import TreeList from "../TreeList";

import { GET_ALL_TREES } from "../../queries/forest";
import { useQuery } from "@apollo/client";

const Discover = ({ user }) => {
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(GET_ALL_TREES, {
    fetchPolicy: "network-only"
  });

  if (loading) return <div>Haciendo crecer los árboles... (Sin materiales radiactivos)</div>
  if (error) return <div>ERROR. No podemos encontrar el bosque en el mapa.</div>

  const trees = data.getAllTrees
    .filter((tree) => {
      if (user) {
        return (tree.owner.id !== user.id
          && !tree.importedBy.find((imported) => imported.userId.id === user.id))
      } else
        return true
    })
    .map((tree) => {
      return ({
        id: tree.id,
        customName: tree.name,
        treeId: {
          id: tree.id,
          owner: tree.owner,
          sourceLang: tree.sourceLang,
          targetLang: tree.targetLang,
          branches: tree.branches
        }
      });
    });

  return <>
    <h2 className="header-title">{t('discover.title')}</h2>
    <Container fluid className="Discover">
      <TreeList user={user} trees={trees} view="discover" />
    </Container>
  </>;
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Discover);
