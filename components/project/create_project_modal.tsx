import React, { FunctionComponent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  create_project,
  ProjectDataPayload,
  set_project_modal_visibility,
} from "../../state/projectsSlice";
import { useThunkDispatch } from "../../state/store";

export const CreateProjectModal: FunctionComponent<{ visible: Boolean }> = ({
  visible,
}) => {
  const dispatch = useDispatch();
  const asyncDispatch = useThunkDispatch();

  const [newProject, setNewProject] = useState<ProjectDataPayload>({
    description: "",
    title: "",
  });
  const create_new = async () => {
    await asyncDispatch(create_project(newProject));
    dispatch(set_project_modal_visibility(false));
  };
  const close_modal = (clear: boolean = true) => {
    if (clear) {
      setNewProject({ description: "", title: "" });
    }
    dispatch(set_project_modal_visibility(false));
  };
  return (
    <>
      <Modal show={visible} centered onHide={() => close_modal()}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="input"
                minLength={1}
                required={true}
                placeholder="My project"
                onChange={(event) =>
                  setNewProject({ ...newProject, title: event.target.value })
                }
                value={newProject.title}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                minLength={1}
                required={true}
                rows={3}
                placeholder="A description of my project"
                onChange={(event) =>
                  setNewProject({
                    ...newProject,
                    description: event.target.value,
                  })
                }
                value={newProject.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={(event) => close_modal()}>
            Close
          </Button>
          <Button variant="primary" onClick={(event) => create_new()}>
            Create New
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
