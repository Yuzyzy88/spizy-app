import React from "react";
import { Container, Row } from "react-bootstrap";

import homeStyles from "../styles/home.module.css";

export function AnonymouseHome() {
    return (
      <Container className={`${homeStyles.container} p-3`}>
        <Row className="justify-content-center">
          <h1 className="font-weight-light">Please login</h1>
        </Row>
      </Container>
    );
  }