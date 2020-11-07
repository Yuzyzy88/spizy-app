import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Accordion,
  Card,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { set_update_project_modal_visibility } from "../../state/projectsSlice";
import { RootState } from "../../state/reducers";
import { useThunkDispatch } from "../../state/store";
import { create_task, TaskData } from "../../state/tasksSlice";

export const TasksUpdateForm: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const asyncDispatch = useThunkDispatch();
  const { update_project_model } = useSelector(
    (state: RootState) => state.projects
  );
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [newTask, setNewTask] = useState<TaskData>({
    title: "",
    description: "",
    project: update_project_model.id,
  });
  const close_modal = (clear: boolean = true) => {
    dispatch(set_update_project_modal_visibility(false));
  };

  // Filter out the tasks for the project specifically
  const project_tasks = useMemo(() => {
    return tasks.filter((task) => task.project == update_project_model.id);
  }, [tasks]);

  // Add a task
  async function add_task() {
    await asyncDispatch(create_task(newTask));
  }
  return (
    <>
      <Modal.Body>
        <Form>
          <Row
            className={"justify-content-center justify-content-md-start mb-3"}
          >
            {project_tasks.map((task, idx) => (
              <Col>
                <Card key={idx} className={`m-3`} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col>
              <Card  className={`m-3`} style={{ width: "18rem" }}>
                <Card.Body>
                  <Form.Group id="new-task-title">
                    <Form.Control
                      type="input"
                      placeholder="New Task Title"
                      minLength={3}
                      required={true}
                      value={newTask.title}
                      onChange={(event) =>
                        setNewTask({ ...newTask, title: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group id="new-task-description">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="New Task Description"
                      minLength={0}
                      required
                      value={newTask.description}
                      onChange={(event) =>
                        setNewTask({
                          ...newTask,
                          description: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Row className={`justify-content-end pr-3`}>
                    <Col>
                      {/* <ToggleButtonGroup
                      type="radio"
                      name="options"
                      defaultValue={1}
                    >
                      <ToggleButton value={1} variant="light">
                        Not Started
                      </ToggleButton>
                      <ToggleButton value={2} variant="light">
                        In Progress
                      </ToggleButton>
                      <ToggleButton value={3} variant="light">
                        Done
                      </ToggleButton>
                    </ToggleButtonGroup> */}
                    </Col>
                    <Col className={`col-1`}>
                      <Row className={`justify-content-end`}>
                        <Button onClick={(event) => add_task()}>Add</Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={(event) => close_modal()}>
          Close
        </Button>
        <Button variant="primary">Update</Button>
      </Modal.Footer>
    </>
  );
};
