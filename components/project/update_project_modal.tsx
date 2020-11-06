import React, { FunctionComponent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ProjectDataPayload,
  put_project,
  set_update_project_modal_visibility,
} from "../../state/projectsSlice";
import { RootState } from "../../state/reducers";
import { useThunkDispatch } from "../../state/store";

export const UpdateProjectModal: FunctionComponent<{ visible: Boolean }> = ({
  visible,
}) => {
  const dispatch = useDispatch();
  const asyncDispatch = useThunkDispatch();
  const { update_project_model } = useSelector(
    (state: RootState) => state.projects
  );

  const [updatedProject, setUpdatedProject] = useState<ProjectDataPayload>({
    description: update_project_model.description,
    title: update_project_model.title,
  });
  const update_project = async () => {
    await asyncDispatch(
      put_project({ id: update_project_model.id, project_data: updatedProject })
    );
    close_modal();
  };
  const close_modal = (clear: boolean = true) => {
    if (clear) {
      setUpdatedProject({ description: "", title: "" });
    }
    dispatch(set_update_project_modal_visibility(false));
  };
  return (
    <>
      <Modal show={visible} centered onHide={() => close_modal()}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
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
                  setUpdatedProject({
                    ...updatedProject,
                    title: event.target.value,
                  })
                }
                defaultValue={update_project_model.title}
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
                  setUpdatedProject({
                    ...updatedProject,
                    description: event.target.value,
                  })
                }
                defaultValue={update_project_model.description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={(event) => close_modal()}>
            Close
          </Button>
          <Button variant="primary" onClick={(event) => update_project()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
