import React from "react";
import { useDispatch } from "react-redux";
import "./searchBox.css";

import * as THUNK_ACTIONS_CREATORS from "../../store/actions/thunk";
import { Dispatch } from "redux";
import { Container, Row, Col, FormControl } from "react-bootstrap";

const SearchBox = () => {
  const dispatch = useDispatch();
  return (
    <Container fluid className="search-box-container">
      <Row className="justify-content-center">
        <span className="logo">מִצְלוֹל</span>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="6">
          <FormControl
            as="input"
            type="text"
            className="input form-control search-box"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              getWords(e, dispatch)
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

function getWords(
  e: React.KeyboardEvent<HTMLInputElement>,
  dispatch: Dispatch<any>
) {
  if (e.keyCode === 13) {
    dispatch(
      THUNK_ACTIONS_CREATORS.thunkGetMitzlolim(
        (e.currentTarget as HTMLInputElement).value
      )
    );
  }
}

export default SearchBox;
