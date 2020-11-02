import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";

export const Footer: FunctionComponent<{}> = ({ children }) => {
  return (
    <>
      <Container fluid={true} className="pt-2 mx-0 bg-dark">
        <Row>
            <Col><small className="d-block mb-3 text-muted">Copyright &copy; 2020 Spizy. All rights reserved</small></Col>
        </Row>
      </Container>
    </>
  );
};
