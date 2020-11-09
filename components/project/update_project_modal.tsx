import React, { FunctionComponent, useState } from "react";
import { Button, Form, Modal, Nav, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ProjectDataPayload,
  put_project,
  set_update_project_modal_visibility,
} from "../../state/projectsSlice";
import { RootState } from "../../state/reducers";
import { useThunkDispatch } from "../../state/store";
import { ProjectUpdateForm } from "./project_update_form";
import { TasksUpdateForm } from "./tasks_update_form";
import formStyles from "../../styles/form.module.css";
import { ProjectAccessUpdateForm } from "./projectaccess_update_form";

export const UpdateProjectModal: FunctionComponent<{ visible: Boolean }> = ({
  visible,
}) => {
  const [tab, setTab] = useState("project");
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
      <Modal
        show={visible}
        centered
        onHide={() => close_modal()}
        dialogClassName={
          tab == UpdateProjectDialogTabs.tasks
            ? formStyles.update_project_modal_task
            : formStyles.update_project_modal_project
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>

        <Tabs
          className={`m-1`}
          id="update-project-tabs"
          activeKey={tab}
          onSelect={(k) => setTab(k)}
        >
          <Tab eventKey="project" title="Project">
            <ProjectUpdateForm />
          </Tab>
          <Tab eventKey="tasks" title="Tasks">
            <TasksUpdateForm />
          </Tab>
          <Tab eventKey="access" title="Access">
            <ProjectAccessUpdateForm />
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
};

enum UpdateProjectDialogTabs {
  project = "project",
  tasks = "tasks",
}
