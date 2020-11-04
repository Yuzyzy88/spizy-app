import Link from "next/link";
import React, { FormEvent, FunctionComponent, useMemo, useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { store, useThunkDispatch } from "../state/store";
import {
  login_user,
  set_first_name,
  set_last_name,
  set_logged_in,
  set_username,
} from "../state/userSlice";
import signupStyles from "../styles/form.module.css";
import { useRouter } from "next/router";
import { get_projects } from "../state/projectsSlice";
export const LoginPage: FunctionComponent<{}> = ({}) => {
  const router = useRouter();
  const dispatch = useThunkDispatch()

  // Form states
  const [formState, setFormstate] = useState({
    username: "",
    password: "",
  });

  // Validate form
  const formIsValid = useMemo(() => {
    return formState.password != "" && formState.username != "";
  }, [formState]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    event.preventDefault();
    event.stopPropagation();

    // Check if the form is valid before logging in
    if (formIsValid) {
      // Dispatch login
      dispatch(login_user(formState)).then((data: any) => {
        // Check if there was an error during logging in
        if (data.error) {
        }
        // Else - no errors
        else {
          router.push('/')
        }
        console.log(data);
      });
    }
  };
  return (
    <Container className={`m-0 p-0 ${signupStyles.container}`}>
      <Row
        className={`${signupStyles.back_page} m-0 align-items-center justify-content-center`}
      >
        <Form
          className={`m-5 p-3 ${signupStyles.form}`}
          onSubmit={(event) => login(event)}
        >
          <Form.Row>
            <Col className="m-3">
              <h3
                className={`text-center ${signupStyles.heading} font-weight-normal`}
              >
                Welcome
              </h3>
            </Col>
          </Form.Row>

          <Form.Row className="p-2 justify-content-center">
            <Col xs={12}>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formState.username}
                onChange={(e) =>
                  setFormstate({ ...formState, username: e.target.value })
                }
              />
            </Col>
          </Form.Row>
          <Form.Row className="p-2 justify-content-center">
            <Col xs={12}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formState.password}
                onChange={(e) =>
                  setFormstate({ ...formState, password: e.target.value })
                }
              />
            </Col>
          </Form.Row>

          <Form.Row className="justify-content-center m-3">
            <Button
              className="btn-block"
              type={"submit"}
              disabled={!formIsValid}
            >
              Sign In
            </Button>
          </Form.Row>
          <Form.Row className="justify-content-center m-3">
            <h6 className="font-weight-light">
              <span>Don't have an account? </span>
              <Link href="/signup">
                <a>Create a Spizy Account </a>
              </Link>
            </h6>
          </Form.Row>
        </Form>
      </Row>
    </Container>
  );
};
export default LoginPage;
