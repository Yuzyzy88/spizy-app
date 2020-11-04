import React, { useMemo } from "react";
import {
  Card,
  CardDeck,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Task } from "../state/projectsSlice";
import { RootState } from "../state/reducers";
import { Tasks } from "../state/tasksSlice";

import homeStyles from "../styles/home.module.css";

export function LoggedInHome() {
  const { projects } = useSelector((state: RootState) => state.projects);
  const { tasks } = useSelector((state: RootState) => state.tasks);
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

  return (
    <Container className={`${homeStyles.container} p-5 bg-dark m-0`}>
      <Row className={`justify-content-center`}>
        <h1 className={`text-center text-wrap text-light font-weight-light`}>
          Your Projects
        </h1>
      </Row>
      <Row className={`justify-content-md-center`}>
        {/* Check if there are any projects the users has */}
        {projects.length > 0 ? (
          // If the users has projects output them
          projects.map((project, index) => (
            <Col className="col-sm-6  col-md-4">
              <Row className={`justify-content-center`}>
                <Card
                  bg={`light`}
                  key={index}
                  text={`dark`}
                  style={{ width: "18rem" }}
                  className="m-3"
                >
                  <Card.Header>{project.title}</Card.Header>
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
          <h1 className="text-center">No Projects Yet</h1>
        )}
      </Row>
    </Container>
  );
}

interface GroupedTasks {
  [key: number]: Array<Task>;
}
