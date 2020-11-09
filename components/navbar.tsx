import React, { FunctionComponent, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { RootState } from "../state/reducers";
import { useSelector } from "react-redux";
import { logout_user } from "../state/userSlice";
import { useThunkDispatch } from "../state/store";
import { useRouter } from "next/router";

export const NavigationBar: FunctionComponent<{}> = ({ children }) => {
  const router = useRouter();
  const asyncDispatch = useThunkDispatch();
  const { username, first_name, last_name, logged_in } = useSelector(
    (state: RootState) => state.user
  );
  const [collapsed, setCollapsed] = useState(true);
  async function logout() {
    setCollapsed(false);
    await asyncDispatch(logout_user());
    router.push("/");
  }
  return (
    <>
      <Navbar
        collapseOnSelect={true}
        expanded={collapsed}
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Toggle
          onClick={(e) => setCollapsed(!collapsed)}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link href="/">
                <a className="nav-link" onClick={(e) => setCollapsed(false)}>
                  {process.env.NEXT_PUBLIC_SITE_NAME}
                </a>
              </Link>
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
                <NavDropdown.Item>
                  <Link href="/">
                    <a className="dropdown-item p-0">Projects</a>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(e) => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            // Logged out view
            <Nav>
              <Nav.Item>
                <Link href="/signup">
                  <a className="nav-link" onClick={(e) => setCollapsed(false)}>
                    Sign Up
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/login">
                  <a className="nav-link" onClick={(e) => setCollapsed(false)}>
                    Login
                  </a>
                </Link>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
