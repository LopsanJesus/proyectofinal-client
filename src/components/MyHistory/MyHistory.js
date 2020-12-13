import React from 'react';
import { connect } from "react-redux";
import './MyHistory.scss';
import { GET_MY_HISTORY } from "../../queries/practice";
import { Badge, Container, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

const MyHistory = () => {
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(GET_MY_HISTORY, {
    fetchPolicy: "network-only"
  });

  const getScoreColor = (score) => {
    if (score > 7)
      return "success";
    if (score > 4)
      return "warning"
    return "danger"
  }

  const getTimeSinceTest = (minutes) => {
    if (minutes / 60 > 23)
      return <span>Hace {Math.floor(minutes / (60 * 24))} días</span>
    if (minutes > 59)
      return <span>Hace {Math.floor(minutes / 60)} horas</span>
    if (minutes > 0)
      return <span>Hace {Math.floor(minutes)} minutos</span>
    return <span>Justo ahora</span>
  }

  if (loading) return <div>Obteniendo resultados...</div>
  if (error) return <div>ERROR. No podemos obtener los resultados.</div>

  return (
    <Container fluid className="MyHistory">
      <h2 className="header-title">{t('my_history')}</h2>
      <ListGroup>
        {
          data.getMyHistory.map((test) => {
            var time = new Date(Date.now() - new Date(test.createdAt));
            return (
              <ListGroup.Item>
                Árbol: <strong>{test.importedTree.treeId.name} </strong>&nbsp;
                Score: <Badge pill variant={getScoreColor(test.score)}>{test.score}</Badge>&nbsp;
                Total: {test.numberOfLeaves}&nbsp;
                ({getTimeSinceTest(time / 60000)})
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </Container>
  );
};

export default MyHistory;
