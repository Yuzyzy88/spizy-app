import React, { FormEvent, FunctionComponent } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { RootState } from "../state/reducers";
import { useSelector } from "react-redux";
import { logout_user } from "../state/userSlice";
import { store } from "../state/store";
import { useRouter } from "next/router";

export const NavigationBar: FunctionComponent<{}> = ({ children }) => {
  const router = useRouter();
  const { username, first_name, last_name, logged_in } = useSelector(
    (state: RootState) => state.user
  );
  function logout(event: FormEvent<HTMLFormElement>) {
    store.dispatch(logout_user({}));
    router.push('/')
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link>Home</Nav.Link>
            </Nav.Item>
          </Nav>
          {logged_in ? (
            // Logged in View
            <Nav>
              <NavDropdown
                title={`${first_name}`}
                id="collasible-nav-dropdown"
                alignRight={true}
              >
                <NavDropdown.Item>Setting</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(e) => logout(e)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            // Logged out view
            <Nav>
              <Nav.Item>
                <Link href="/signup">
                  <a className="nav-link">Sign Up</a>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/login">
                  <a className="nav-link">Login</a>
                </Link>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
