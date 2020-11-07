import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import React, { forwardRef, useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../state/tasksSlice";
import { RootState } from "../state/reducers";

import homeStyles from "../styles/home.module.css";
import { CreateProjectModal } from "./project/create_project_modal";
import {
  Project,
  set_delete_project_modal_visibility,
  set_delete_project_model,
  set_project_modal_visibility,
  set_update_project_modal_visibility,
  set_update_project_model,
} from "../state/projectsSlice";
import { DeleteProjectModal } from "./project/delete_project_modal";
import { UpdateProjectModal } from "./project/update_project_modal";

const iconBtn = forwardRef(({ children, onClick }, ref) => {
  return (
    <a
      ref={ref as any}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Icon path={mdiDotsVertical} size={1} />
    </a>
  );
});
export function LoggedInHome() {
  const {
    projects,
    create_project_modal_visible,
    update_project_modal_visible,
    delete_project_modal_visible,
    update_project_model,
  } = useSelector((state: RootState) => state.projects);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const grouped_tasks = useMemo(() => {
    let grouped_tasks: GroupedTasks = {};
    for (var i = 0; i < projects.length; i++) {
      let project_id = projects[i].id;
      grouped_tasks[project_id] = tasks.filter((task) => {
        task.project == project_id;
      });
    }
    return grouped_tasks;
  }, [tasks, projects]);

  const delete_project = (project: Project) => {
    dispatch(set_delete_project_model(project));
    dispatch(set_delete_project_modal_visibility(true));
  };
  const update_project = (project: Project) => {
    dispatch(set_update_project_model(project));
    dispatch(set_update_project_modal_visibility(true));
  };
  return (
    <Container className={`${homeStyles.container} p-5 bg-dark m-0`}>
      <Row
        className={`justify-content-center justify-content-sm-center align-items-center h-100`}
      >
        <Col className={`col-12  w-100`}>
          <h1 className={`text-center text-wrap text-light font-weight-light`}>
            Your Projects
          </h1>
        </Col>
        <Col className={`col-1`}>
          <Row className={`justify-content-center align-items-center h-100`}>
            <Button
              className={`mx-3`}
              variant="secondary"
              onClick={(event) => dispatch(set_project_modal_visibility(true))}
            >
              Create
            </Button>
          </Row>
        </Col>
      </Row>
      <Row className={`justify-content-md-center`}>
        {/* Check if there are any projects the users has */}
        {projects.length > 0 ? (
          // If the users has projects output them
          projects.map((project, index) => (
            <Col className="col-sm-6  col-md-4" key={index}>
              <Row className={`justify-content-center`}>
                <Card
                  bg={`light`}
                  key={index}
                  text={`dark`}
                  style={{ width: "18rem" }}
                  className="m-3"
                >
                  <Card.Header>
                    <Row className="no-gutters justify-content-between">
                      <span>{project.title}</span>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={iconBtn}
                          id="dropdown-custom-components"
                        />
                        <Dropdown.Menu align="right">
                          <Dropdown.Item
                            onClick={(event) => update_project(project)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            className="text-danger"
                            onClick={(event) => delete_project(project)}
                          >
                            Delete Project
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{project.description}</Card.Text>
                  </Card.Body>
                  {grouped_tasks[project.id].length > 0 ? (
                    <ListGroup variant="flush">
                      {grouped_tasks[project.id].map((task) => {
                        <ListGroup.Item>{task.title}</ListGroup.Item>;
                      })}
                    </ListGroup>
                  ) : (
                    <Card.Footer>
                      <small className={`text-muted`}>No tasks yet</small>
                    </Card.Footer>
                  )}
                </Card>
              </Row>
            </Col>
          ))
        ) : (
          <Row className={`align-items-center`} style={{height: '50vh'}}>
            <h5 className="text-center text-wrap text-light font-weight-light">
             No projects yet, create one above 🗃️
            </h5>
          </Row>
        )}
      </Row>
      <CreateProjectModal visible={create_project_modal_visible} />
      <UpdateProjectModal visible={update_project_modal_visible} />
      <DeleteProjectModal visible={delete_project_modal_visible} />
    </Container>
  );
}

interface GroupedTasks {
  [key: number]: Array<Task>;
}
