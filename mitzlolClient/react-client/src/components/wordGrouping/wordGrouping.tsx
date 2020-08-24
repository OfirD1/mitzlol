import React from "react";
import { useSelector } from "react-redux";
import { If, Then } from "react-if-elseif-else-render";
import { ApplicationState } from "../../store";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./wordGrouping.css";

const WordGrouping = () => {
  const isWaiting = useSelector((state: ApplicationState) => {
    return state.mitzlol.loading;
  });
  const total = useSelector((state: ApplicationState) => state.mitzlol.total);
  const mitzlolim = useSelector(
    (state: ApplicationState) => state.mitzlol.mitzlolim
  );
  return (
    <div>
      <If condition={!isWaiting}>
        <Then>
          <Container fluid>
            <If condition={total === 0}>
              <Then>
                <Row className="justify-content-md-center">
                  <Col md="8" style={{ marginTop: "10px" }}>
                    <Card>
                      <Card.Body>
                        <Card className="my-2">
                          <Card.Header>לא נמצאו תוצאות</Card.Header>
                        </Card>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Then>
            </If>
            <If condition={total > 0}>
              <Then>
                {mitzlolim.map((wordGroup: any, i: number) => (
                  <If key={i} condition={wordGroup.words.length}>
                    <Then>
                      <Row className="justify-content-md-center">
                        <Col md="8" className="word-grouping">
                          <Card>
                            <Card.Body>
                              <Card className="my-2">
                                <Card.Header>{wordGroup.title}</Card.Header>
                                <Card.Body>
                                  <Card.Text>
                                    {wordGroup.words.join(", ")}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Then>
                  </If>
                ))}
              </Then>
            </If>
          </Container>
        </Then>
      </If>
    </div>
  );
};

export default WordGrouping;
