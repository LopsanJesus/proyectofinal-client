import React, { useRef, useState } from 'react';
import { connect } from "react-redux";
import { Alert, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import './Practice.scss';
import { GET_QUESTIONS } from "../../queries/practice";
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

const Practice = ({ user }) => {
  const params = useParams();
  const [view, setView] = useState("preview");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctArray, setCorrectArray] = useState([]);

  const translationsRef = useRef(null);

  const { loading, error, data } = useQuery(GET_QUESTIONS, {
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.id)
    }
  });

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error!</div>;

  // const importedTree = data.getTree.importedBy.find((importedTree) =>
  //   importedTree.userId.id === user.id
  // );

  const handleFinish = () => {
    var answersTemp = [];
    var correctAnswers = [];

    Array.from(translationsRef.current.childNodes).map((leaf) => {
      return answersTemp[leaf.childNodes[0].innerText] = leaf.childNodes[1].childNodes[0].value
    })

    var scoreCount = 0;

    leaves.map((leaf) => {
      if (answersTemp[leaf.name].toLowerCase() === leaf.translation.toLowerCase()) {
        scoreCount++;
        return correctAnswers[leaf.name] = true;
      } else {
        return correctAnswers[leaf.name] = false;
      }
    })

    setAnswers(answersTemp);
    setCorrectArray(correctAnswers);
    setScore(scoreCount);
    setView("score");
  }

  var leaves = [];

  data.getTree.branches.map((branch) => {
    return branch.leaves.map((leaf) => {
      return leaves = [...leaves, leaf];
    });
  });

  leaves = leaves.sort(() => Math.random() - 0.5).slice(0, 10);

  return (
    <>
      {view === "preview" &&
        <>
          <Button className="next-button" onClick={() => { setView("practiceForm") }}>Start Test!</Button>
        </>
      }
      {view === "practiceForm" &&
        <>
          <div>
            <h3 className="tree-header">Practice</h3>
            <Container className="Practice">
              <ListGroup ref={translationsRef}>
                {
                  leaves.map((leaf) => {
                    return (
                      <ListGroup.Item key={leaf.id}>
                        <Col className="leaf-name">{leaf.name}</Col>
                        <Col className="leaf-input">
                          <Form.Control
                            type="text"
                            required
                          />
                        </Col>
                      </ListGroup.Item>);
                  })
                }
              </ListGroup>

              <Row>
                <Col></Col>
                <Col><Button className="next-button" onClick={handleFinish}>Finish Test</Button></Col>
                <Col></Col>
              </Row>
            </Container>
          </div>
        </>
      }
      {
        view === "score" &&
        <>
          Score: {score}
          {
            answers.map((value, index) => <p><Alert></Alert>{value}</p>)}
          { correctArray.map((value, index) => <p><Alert></Alert>{value}</p>)
          }
        </>
      }
    </>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(Practice);
