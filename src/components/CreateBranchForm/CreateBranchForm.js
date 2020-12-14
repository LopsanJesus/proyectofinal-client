import React, { useRef, useState } from 'react';
import { connect } from "react-redux";
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import EmptyLine from '../EmptyLine';

import { useMutation } from "@apollo/client";
import { CREATE_BRANCH } from "../../queries/forest";

import './CreateBranchForm.scss';

const CreateBranchForm = ({ user }) => {
  const { t } = useTranslation();
  const params = useParams();
  let history = useHistory();

  const nameRef = useRef(null);
  const leavesList = useRef(null);
  const [validated] = useState(false);
  const [formError, setFormError] = useState("");
  const [fields, setFields] = useState([{ word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }, { word: "", translation: "" }]);

  const [createBranchMutation, { loading }] = useMutation(CREATE_BRANCH, {
    onError(error) {
      setFormError(error.message);
    },
    onCompleted() {
      history.push("/tree/" + params.treeId);
    },
  });

  const HandleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFormError("");

    if (fields.filter((_, index) => {
      if (leavesList.current.childNodes[index].childNodes[0].childNodes[0].value === "" ||
        leavesList.current.childNodes[index].childNodes[1].childNodes[0].value === "") {
        return true
      }
      return false
    }).length > 0) {
      setFormError(t('branch.noEmptyFields'));
      return false;
    }

    const confirmation = window.confirm(t('branch.createBranchConfirm'));
    if (!confirmation)
      return confirmation
    else {
      createBranchMutation({
        variables: {
          tree: parseInt(params.treeId),
          name: nameRef.current.value,
          names: getLeaves(),
          translations: getLeavesTranslation()
        },
      });
    }
  };

  const getLeaves = () => {
    let array = [];
    fields.map((_, index) => {
      return array.push(leavesList.current.childNodes[index].childNodes[0].childNodes[0].value);
    });
    return array;
  }

  const getLeavesTranslation = () => {
    let array = [];
    fields.map((_, index) => {
      return array.push(leavesList.current.childNodes[index].childNodes[1].childNodes[0].value);
    })
    return array;
  }

  function addNewLine() {
    const newLine = { word: "", translation: "" }
    setFields([...fields, newLine]);
  };

  return (
    <Container as={Col} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>

      <Form noValidate validated={validated} onSubmit={HandleSubmit}>
        {formError && <Alert variant="danger">{formError}</Alert>}

        <Form.Group as={Row} controlId="formBasicName">
          <Form.Label>{t('branch.newBranchName')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('branch.branchNamePlaceholder')}
            ref={nameRef}
            required
          />
          <Form.Control.Feedback type="invalid">
            {t('branch.validNameFeedback')}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Button variant="primary" onClick={() => addNewLine()}>{t('branch.addLine')}</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicName">
          <Form.Label as={Col}>{t('leaf.word')}</Form.Label>
          <Form.Label as={Col}>{t('leaf.translation')}</Form.Label>
        </Form.Group>

        <Form.Group ref={leavesList}>
          {
            fields.map((_, index) => {
              return <EmptyLine key={index} number={index} />
            })
          }
        </Form.Group>

        <Form.Group>
          <Button variant="primary" type="submit">
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
                <div>{t('branch.createBranch')}</div>
              )}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ userInfo }) => {
  return {
    user: userInfo.user,
  };
};

export default connect(mapStateToProps, null)(CreateBranchForm);