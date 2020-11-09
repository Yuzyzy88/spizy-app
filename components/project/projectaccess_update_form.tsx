import { mdiCancel, mdiClose, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import React, { FunctionComponent, useMemo, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Access,
  CreateAccessPayload,
  create_access,
  delete_access,
} from "../../state/projectsAccessSlice";
import { RootState } from "../../state/reducers";
import { useThunkDispatch } from "../../state/store";

export const ProjectAccessUpdateForm: FunctionComponent = () => {
  const { all_access, loading_create } = useSelector(
    (state: RootState) => state.access
  );
  const { update_project_model, projects } = useSelector(
    (state: RootState) => state.projects
  );
  const asyncDispatch = useThunkDispatch();

  // Get Access For this Project Only
  const project_access_levels = useMemo(() => {
    return all_access.filter(
      (access) => access.project == update_project_model.id
    );
  }, [all_access, projects]);
  const membership_level_output = {
    1: "Owner",
    2: "Member",
  };

  // Create
  const [newAccess, setNewAccess] = useState<CreateAccessPayload>({
    membership_level: 2,
    user: "",
    project: update_project_model.id,
  });
  async function addAccess() {
    asyncDispatch(create_access(newAccess)).then(() => {
      setNewAccess({
        ...newAccess,
        user: "",
      });
    });
  }

  // Delete
  async function deleteAccess(access: Access) {
    asyncDispatch(delete_access(access));
  }
  return (
    <>
      <Modal.Body>
        <Form>
          {project_access_levels.map((access, idx) => (
            <Form.Group key={idx}>
              <InputGroup className="mb-3">
                <Form.Control defaultValue={access.user} disabled={true} />
                <InputGroup.Append>
                  <InputGroup.Text>
                    {membership_level_output[access.membership_level]}
                  </InputGroup.Text>
                </InputGroup.Append>
                <InputGroup.Append>
                  <InputGroup.Text>
                    <a onClick={(event) => deleteAccess(access)}>
                      <Icon
                        path={mdiClose}
                        size={0.9}
                        className={`text-danger`}
                      ></Icon>
                    </a>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          ))}
        </Form>
        <Form>
          <Form.Row className="align-items-center justify-content-center">
            <Col xs="12" sm={true}>
              <Form.Control
                placeholder="Add Username"
                value={newAccess.user}
                onChange={(event) => {
                  setNewAccess({ ...newAccess, user: event.target.value });
                }}
              />
            </Col>
            <Col xs={true} sm="auto" className="my-1">
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                value={newAccess.membership_level}
                onChange={(event) => {
                  setNewAccess({
                    ...newAccess,
                    membership_level: Number(event.target.value),
                  });
                }}
              >
                <option value={1}>Owner</option>
                <option value={2}>Member</option>
              </Form.Control>
            </Col>
            <Col xs="auto" className="my-1">
              <Button
                onClick={(event) => {
                  addAccess();
                }}
                disabled={loading_create}
              >
                {loading_create ? `Adding` : "Add"}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
};
