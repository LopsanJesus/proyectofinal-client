import React from "react";
import "./MyHistory.scss";
import { GET_MY_HISTORY } from "../../queries/practice";
import { Alert, Badge, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";

const MyHistory = () => {
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(GET_MY_HISTORY, {
    fetchPolicy: "network-only",
  });

  const getScoreColor = (score) => {
    if (score > 7) return "success";
    if (score > 4) return "warning";
    return "danger";
  };

  const getTimeSinceTest = (minutes) => {
    if (minutes / 60 > 23)
      return (
        <span>
          {t("history.daysAgo", { days: Math.floor(minutes / (60 * 24)) })}
        </span>
      );
    if (minutes > 59)
      return (
        <span>
          {t("history.hoursAgo", { hours: Math.floor(minutes / 60) })}
        </span>
      );
    if (minutes > 0)
      return (
        <span>{t("history.minutesAgo", { minutes: Math.floor(minutes) })}</span>
      );
    return <span>{t("history.rightNow")}</span>;
  };

  if (loading) return <div>Obteniendo resultados...</div>;
  if (error) return <div>ERROR. No podemos obtener los resultados.</div>;

  var testsHistory = data.getMyHistory;

  testsHistory = testsHistory.slice().sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  });

  return (
    <Container fluid className="MyHistory" as={Col} lg={{ span: 8, offset: 2 }}>
      <h2 className="header-title">{t("myHistory")}</h2>
      {testsHistory.length > 0 ? (
        testsHistory.map((test) => {
          var time = new Date(Date.now() - new Date(test.createdAt));
          return (
            <Row className="testHistoryElement">
              <Col>
                <strong>{test.importedTree.treeId.name} </strong>
              </Col>
              <Col>
                {t("history.score")}:{" "}
                <Badge pill variant={getScoreColor(test.score)}>
                  {test.score}
                </Badge>
                &nbsp;
              </Col>
              <Col>
                {t("history.total")}: {test.numberOfLeaves}
              </Col>
              <Col>{getTimeSinceTest(Math.floor(time / 60000))}</Col>
            </Row>
          );
        })
      ) : (
        <Alert variant="info">{t("history.noTests")}</Alert>
      )}
    </Container>
  );
};

export default MyHistory;
