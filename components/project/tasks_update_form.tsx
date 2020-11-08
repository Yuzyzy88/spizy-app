import Icon from '@mdi/react';
import React, { FunctionComponent, useMemo, useState } from 'react';
import taskStyles from '../../styles/tasks.module.css';
import { RootState } from '../../state/reducers';
import { set_update_project_modal_visibility } from '../../state/projectsSlice';
import { useThunkDispatch } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  mdiCheck,
  mdiDelete,
  mdiPencil,
} from "@mdi/js";
import {
  Modal,
  Form,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import {
  create_task,
  delete_task,
  TaskCreateData,
} from "../../state/tasksSlice";

export const TasksUpdateForm: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const asyncDispatch = useThunkDispatch();
  const { update_project_model } = useSelector(
    (state: RootState) => state.projects
  );
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [newTask, setNewTask] = useState<TaskCreateData>({
    title: "",
    description: "",
    project: update_project_model.id,
  });
  const close_modal = () => {
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

  // Delete Mode
  const [deleteMode, setDeleteMode] = useState<{
    delete_task: null | TaskData;
    enabled: boolean;
  }>({
    enabled: false,
    delete_task: null,
  });
  async function deleteTask() {
    await asyncDispatch(delete_task({ id: deleteMode.delete_task.id }));
  }
  return (
    <>
      <Modal.Body>
        <Form className={`${taskStyles.tasks_container}`}>
          {project_tasks.map((task, idx) => (
            <Card
              key={idx}
              className={`m-3 ${taskStyles.task_card}`}
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>
                  <Row className={`m-0 justify-content-between`}>
                    <Col className={`m-0 p-0`}>{task.title}</Col>
                    <Col className={`col-3 m-0 p-0`}>
                      <Row className={`justify-content-end m-0`}>
                        <Icon path={mdiPencil} size={1} />
                      </Row>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Text className={`${taskStyles.task_description}`}>
                  {task.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row
                  className={`justify-content-between align-items-center m-0 p-0`}
                >
                  {deleteMode.enabled &&
                  deleteMode.delete_task.id == task.id ? (
                    <>
                      <Col className={`p-0`}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setDeleteMode({ enabled: false, delete_task: null })
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          className={`ml-1`}
                          onClick={() => deleteTask()}
                        >
                          Confirm
                        </Button>
                      </Col>
                    </>
                  ) : (
                    <a
                      onClick={() =>
                        setDeleteMode({ enabled: true, delete_task: task })
                      }
                    >
                      <Icon
                        className={`text-danger`}
                        path={mdiDelete}
                        size={1}
                      />
                    </a>
                  )}

                  {task.progress != 100 && <Icon path={mdiCheck} size={1} />}
                </Row>
              </Card.Footer>
            </Card>
          ))}
          <Card
            className={`m-3 ${taskStyles.task_card}`}
            style={{ width: "18rem" }}
          >
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
                    <Button onClick={() => add_task()}>Add</Button>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => close_modal()}>
          Close
        </Button>
        <Button variant="primary">Update</Button>
      </Modal.Footer>
    </>
  );
};
