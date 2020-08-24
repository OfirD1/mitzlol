import React from "react";
import { useSelector } from "react-redux";
import { If, Then } from "react-if-elseif-else-render";
import { ApplicationState } from "../../store";
import { Container, Row, Col, Card } from "react-bootstrap";

const Spinner = () => {
  const isWaiting = useSelector(
    (state: ApplicationState) => state.mitzlol.loading
  );
  return (
    <div>
      <If condition={isWaiting}>
        <Then>
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col className="col-md-8">
                <Card>
                  <Card.Body>
                    <Card className="my-2">
                      <Card.Header>
                        {/* hourglass */}
                        <span>&#8987;</span>
                      </Card.Header>
                    </Card>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Then>
      </If>
    </div>
  );
};
export default Spinner;
