import Icon from "@mdi/react";
import React, { FunctionComponent, useMemo, useState } from "react";
import taskStyles from "../../styles/tasks.module.css";
import { RootState } from "../../state/reducers";
import { set_update_project_modal_visibility } from "../../state/projectsSlice";
import { useThunkDispatch } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { mdiCancel, mdiCheck, mdiClose, mdiDelete, mdiPencil } from "@mdi/js";
import {
  Modal,
  Form,
  Button,
  Card,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import {
  create_task,
  delete_task,
  put_task,
  Task,
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
    progress: 0,
  });
  const close_modal = () => {
    dispatch(set_update_project_modal_visibility(false));
  };

  // Filter out the tasks for the project specifically
  const project_tasks = useMemo(() => {
    return tasks.filter((task) => task.project == update_project_model.id);
  }, [tasks]);

  function getCardVariantFromProgress(task: Task) {
    if (task.progress == 0) return "";
    else if (task.progress == 100) return "success";
    else return "warning";
  }
  // Add a task
  async function add_task() {
    await asyncDispatch(create_task(newTask));
  }

  // Delete Mode
  const [deleteMode, setDeleteMode] = useState<{
    task: null | Task;
    enabled: boolean;
  }>({
    enabled: false,
    task: null,
  });
  async function deleteTask() {
    await asyncDispatch(delete_task({ id: deleteMode.task.id }));
    setDeleteMode({ enabled: false, task: null });
  }

  // Edit Mode
  const [editMode, setEditMode] = useState<{
    task: null | Task;
    enabled: boolean;
  }>({
    enabled: false,
    task: null,
  });
  function isTaskInEditMode(task: Task) {
    return editMode.enabled && editMode.task.id == task.id;
  }
  async function saveTask() {
    await asyncDispatch(put_task(editMode.task));
    setEditMode({ enabled: false, task: null });
  }
  async function completeTask(task: Task) {
    await asyncDispatch(put_task({ ...task, progress: 100 }));
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
              bg={getCardVariantFromProgress(task)}
              text={
                getCardVariantFromProgress(task) == "warning" ||
                getCardVariantFromProgress(task) == ""
                  ? "dark"
                  : "white"
              }
            >
              {isTaskInEditMode(task) ? (
                <Card.Body>
                  <Form.Group id="edit-title">
                    <Form.Control
                      type="input"
                      defaultValue={task.title}
                      onChange={(event) =>
                        setEditMode({
                          ...editMode,
                          task: {
                            ...editMode.task,
                            title: event.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group id="edit-description">
                    <Form.Control
                      as="textarea"
                      rows={7}
                      defaultValue={task.description}
                      onChange={(event) =>
                        setEditMode({
                          ...editMode,
                          task: {
                            ...editMode.task,
                            description: event.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group id="progess">
                    <Form.Label>Progress</Form.Label>
                    <Form.Control
                      type="range"
                      custom
                      defaultValue={task.progress}
                      onChange={(event) =>
                        setEditMode({
                          ...editMode,
                          task: {
                            ...editMode.task,
                            progress: Number(event.target.value),
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Card.Body>
              ) : (
                <Card.Body>
                  <Card.Title>
                    <Row className={`m-0 justify-content-between`}>
                      <Col className={`m-0 p-0`}>{task.title}</Col>
                      <Col className={`col-3 m-0 p-0`}>
                        <Row className={`justify-content-end m-0`}>
                          <a
                            onClick={(event) => {
                              isTaskInEditMode(task)
                                ? null
                                : setEditMode({ enabled: true, task: task });
                            }}
                          >
                            <Icon
                              path={isTaskInEditMode(task) ? null : mdiPencil}
                              size={1}
                            />
                          </a>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className={`${taskStyles.task_description}`}>
                    {task.description}
                  </Card.Text>
                  {task.progress !== 100 && (
                    <ProgressBar
                      className={`mt-3`}
                      animated
                      now={task.progress}
                      variant="dark"
                      label={`${task.progress}%`}
                    />
                  )}
                </Card.Body>
              )}

              <Card.Footer>
                {isTaskInEditMode(task) ? (
                  <Row
                    className={`justify-content-end align-items-center m-0 p-0`}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`ml-1`}
                      onClick={(e) =>
                        setEditMode({ enabled: false, task: null })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      className={`ml-1`}
                      onClick={(e) => saveTask()}
                    >
                      Save
                    </Button>
                  </Row>
                ) : (
                  <Row
                    className={`justify-content-between align-items-center m-0 p-0`}
                  >
                    {deleteMode.enabled && deleteMode.task.id == task.id ? (
                      <Col className={`p-0`}>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setDeleteMode({ enabled: false, task: null })
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
                    ) : (
                      <a
                        onClick={() =>
                          setDeleteMode({ enabled: true, task: task })
                        }
                      >
                        <Button variant="light" size="sm">
                          <Icon
                            className={`text-danger`}
                            path={mdiDelete}
                            size={1}
                          />
                        </Button>
                      </a>
                    )}

                    {task.progress != 100 && (
                      <a
                        onClick={(event) => {
                          completeTask(task);
                        }}
                      >
                        <Icon path={mdiCheck} size={1} />
                      </a>
                    )}
                  </Row>
                )}
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
              <Form.Group>
                <Form.Label>Progress</Form.Label>
                <Form.Control
                  type="range"
                  custom
                  onChange={(event) => {
                    setNewTask({
                      ...newTask,
                      progress: Number(event.target.value),
                    });
                  }}
                />
              </Form.Group>
              <Row className={`justify-content-end pr-3`}>
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
      </Modal.Footer>
    </>
  );
};
