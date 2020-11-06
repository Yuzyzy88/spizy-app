import React, { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_project,
  set_delete_project_modal_visibility,
} from "../../state/projectsSlice";
import { RootState } from "../../state/reducers";
import { useThunkDispatch } from "../../state/store";

export const DeleteProjectModal: FunctionComponent<{
  visible: Boolean;
}> = ({ visible }) => {
  const dispatch = useDispatch();
  const asyncDispatch = useThunkDispatch();
  const { delete_project_model: project } = useSelector(
    (state: RootState) => state.projects
  );
  const deleteProject = async () => {
    await asyncDispatch(delete_project(project));
    dispatch(set_delete_project_modal_visibility(false));
  };
  const close_modal = () => {
    dispatch(set_delete_project_modal_visibility(false));
  };
  return (
    <>
      <Modal show={visible} centered onHide={() => close_modal()}>
        <Modal.Header closeButton >
          <Modal.Title>DELETE Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete project:
            <mark>{project ? project.title : ""}</mark>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(event) => close_modal()}>
            Close
          </Button>
          <Button variant="danger" onClick={(event) => deleteProject()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
