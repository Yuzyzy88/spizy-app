import React, { FormEvent, FunctionComponent, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import signupStyles from "../styles/form.module.css";
import { store } from "../state/store";
import { signup_user } from "../state/userSlice";
import { useRouter } from "next/router";

export const SignUpPage: FunctionComponent<{}> = () => {
  const router = useRouter();

  // Form states
  const [formState, setFormstate] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password1: "",
    password2: "",
    agree: false,
  });

  // Validate form
  const formIsValid = useMemo(() => {
    return (
      formState.password1 == formState.password2 &&
      formState.password1 !== "" &&
      formState.agree
    );
  }, [formState]);

  const signup = async (event: FormEvent<HTMLFormElement>) => {
    // Prevent the form from submitting
    event.preventDefault();
    event.stopPropagation();

    // Check if the form is valid before signing up
    if (formIsValid) {
      // Dispatch a sign up action
      store.dispatch(signup_user(formState)).then((data: any) => {
        // Check if it was an error
        if (data.error) {
          let alert_message = "";
          Object.keys(data.payload).forEach((key) => {
            alert_message += `${key}: ${data.payload[key]} \n`;
          });
          // Alert the user of the erro
          alert(alert_message);
        }
        // Else - was successful
        else {
          router.push("/login");
        }
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
          onSubmit={(event) => signup(event)}
        >
          <Form.Row>
            <Col className="m-3">
              <h3 className={`text-center ${signupStyles.heading}`}>Sign Up</h3>
            </Col>
          </Form.Row>
          <Form.Row className="p-2 justify-content-center">
            <Col xs={12} sm={6} className="mb-3 mb-sm-0">
              <Form.Control
                type="input"
                placeholder="First Name"
                value={formState.first_name}
                onChange={(e) =>
                  setFormstate({ ...formState, first_name: e.target.value })
                }
                required={true}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Form.Control
                type="input"
                placeholder="Last Name"
                value={formState.last_name}
                onChange={(e) =>
                  setFormstate({ ...formState, last_name: e.target.value })
                }
                required={true}
              />
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
                required={true}
              />
            </Col>
          </Form.Row>
          <Form.Row className="p-2 justify-content-center">
            <Col xs={12}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={formState.password1}
                onChange={(e) =>
                  setFormstate({ ...formState, password1: e.target.value })
                }
                required={true}
              />
            </Col>
          </Form.Row>
          <Form.Row className="p-2 justify-content-center">
            <Col xs={12}>
              <Form.Control
                type="password"
                placeholder="Repeat Password"
                value={formState.password2}
                onChange={(e) =>
                  setFormstate({ ...formState, password2: e.target.value })
                }
                required={true}
              />
            </Col>
          </Form.Row>
          <Form.Row className="p-2 justify-content-center">
            <Form.Check
              custom
              type={"checkbox"}
              label={"Agree to terms and conditions"}
              id={"agree"}
              required={true}
              value={formState.agree ? "checked" : ""}
              onChange={(e) =>
                setFormstate({ ...formState, agree: !formState.agree })
              }
            />
          </Form.Row>
          <Form.Row className="justify-content-center m-3">
            <Button type={"submit"} disabled={!formIsValid}>
              Create Account
            </Button>
          </Form.Row>
        </Form>
      </Row>
    </Container>
  );
};
export default SignUpPage;
