import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_BRANCH } from "../../queries/forest";
import { useQuery } from "@apollo/client";
import "./Branch.scss";
import {
  Alert,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Branch = ({ user }) => {
  const { t } = useTranslation();
  const params = useParams();

  const { loading, error, data } = useQuery(GET_BRANCH, {
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.id),
    },
  });

  if (loading) return <Spinner />;
  if (error) return <div>ERROR!</div>;

  return (
    <div>
      <h3 className="tree-header">{data.getBranch.name}</h3>
      <Container>
        {data.getBranch.leaves <= 0 ? (
          <Alert variant="info">{t("branch.noLeaves")}</Alert>
        ) : (
          <Row>
            <Col>
              <ListGroup>
                {data.getBranch.leaves.map((leaf) => {
                  return (
                    <ListGroup.Item key={leaf.id}>{leaf.name}</ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                {data.getBranch.leaves.map((leaf) => {
                  return (
                    <ListGroup.Item key={leaf.id}>
                      <strong>{leaf.translation}</strong>
                      {leaf.leafRecords.filter(
                        (record) =>
                          user &&
                          record.isApple &&
                          record.importedTree.userId.id === user.id
                      ).length > 0 && (
                        <Image
                          src="/full-apple.png"
                          className="appleLeaf"
                          title="You learnt this word!"
                        />
                      )}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Branch);
