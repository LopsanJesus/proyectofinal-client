import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./Practice.scss";
import { GET_QUESTIONS, RECORD_TEST } from "../../queries/practice";
import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import appConfig from "../../config/app";
import { useTranslation } from "react-i18next";

const Practice = ({ user }) => {
  const { t } = useTranslation();
  const params = useParams();
  const [view, setView] = useState("preview");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const translationsRef = useRef(null);

  const { loading, error, data } = useQuery(GET_QUESTIONS, {
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.id),
    },
  });

  const [recordTestMutation] = useMutation(RECORD_TEST, {
    onError(error) {
      console.log(error);
    },
    onCompleted() {},
  });

  if (loading) return <div>{t("practice.loadingQuestions")}</div>;
  if (error) return <div>Error!</div>;

  const importedTree = data.getTree.importedBy.find(
    (importedTree) => importedTree.userId.id === user.id
  );

  const handleFinish = () => {
    var answersTemp = [];
    var correctAnswers = [];

    Array.from(translationsRef.current.childNodes).map((leaf) => {
      return (answersTemp = [
        ...answersTemp,
        {
          name: leaf.childNodes[0].innerText,
          translation: leaf.childNodes[1].childNodes[0].value.trim(),
        },
      ]);
    });

    var scoreCount = 0;

    leaves.map((leaf) => {
      var hit = false;
      var attempt = "";

      answersTemp.map((answer) => {
        if (answer.name === leaf.name) {
          attempt = answer.translation;
          if (
            answer.translation.toLowerCase().trim() ===
            leaf.translation.toLowerCase().trim()
          ) {
            hit = true;
            scoreCount++;
          }
        }
        return null;
      });

      return (correctAnswers = [
        ...correctAnswers,
        {
          name: leaf.name.trim(),
          translation: leaf.translation.trim(),
          correct: hit,
          answer: attempt,
        },
      ]);
    });

    recordTestMutation({
      variables: {
        score: scoreCount,
        numberOfLeaves: correctAnswers.length,
        names: correctAnswers.map(({ name }) => name),
        hits: correctAnswers.map(({ correct }) => {
          if (correct) return "correct";
          return "incorrect";
        }),
        importedTreeId: importedTree.id,
      },
    });

    setAnswers(correctAnswers);
    setScore(scoreCount);
    setView("score");
  };

  var leaves = [];

  data.getTree.branches.map((branch) => {
    return branch.leaves.map((leaf) => {
      return (leaves = [...leaves, leaf]);
    });
  });

  leaves = leaves
    .sort(() => Math.random() - 0.5)
    .slice(0, appConfig.testNumberOfQuestions);

  window.scrollTo(0, 0);

  return (
    <>
      {view === "preview" && (
        <>
          <h2 className="header-title">
            {t("practice.previewTitle") + " " + data.getTree.name}
          </h2>
          <p>{t("practice.getReady")}</p>
          <p>{t("practice.goodLuck")}</p>
          <Button
            className="next-button"
            onClick={() => {
              setView("practiceForm");
            }}
          >
            {t("practice.startTestButton")}
          </Button>
        </>
      )}
      {view === "practiceForm" && (
        <>
          <div>
            <h3 className="tree-header">{data.getTree.name}</h3>
            <Container className="Practice">
              <ListGroup ref={translationsRef}>
                {leaves.map((leaf) => {
                  return (
                    <ListGroup.Item key={leaf.id}>
                      <Col className="leaf-name">{leaf.name}</Col>
                      <Col className="leaf-input">
                        <Form.Control type="text" required />
                      </Col>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>

              <Row>
                <Col></Col>
                <Col>
                  <Button className="next-button" onClick={handleFinish}>
                    {t("practice.finishTestButton")}
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </div>
        </>
      )}
      {view === "score" && (
        <div className="practice-score">
          <h1 className="score-title">
            {t("practice.score")}: {score}
          </h1>
          {answers.length > 0 ? (
            answers.map((answer) => {
              return (
                <Alert variant={answer.correct ? "success" : "danger"}>
                  <Row>
                    <Col>
                      {answer.name}: <strong>{answer.translation}</strong>
                    </Col>
                    <Col>
                      <span className="try">
                        {t("practice.yourTry")}: {answer.answer}
                      </span>
                    </Col>
                  </Row>
                </Alert>
              );
            })
          ) : (
            <div>No hay respuestas</div>
          )}
          <Link to={"/tree/" + params.id}>
            <Button variant="primary">{t("practice.goBackButton")}</Button>
          </Link>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Practice);
