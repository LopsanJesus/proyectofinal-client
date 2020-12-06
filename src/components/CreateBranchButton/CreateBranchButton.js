import React from 'react';
import { Card } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
//import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CreateBranchButton.scss';

const CreateBranchButton = () => {
  //const { t } = useTranslation();
  return (
    <Link to="/create-branch">
      <Card className="createTreeButton">
        <Card.Body>
          <PlusCircle size={30} className="plusIcon" />
          <Card.Title>Crear nueva rama</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CreateBranchButton;
