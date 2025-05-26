import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, ListGroup, Badge } from "react-bootstrap";
import { FaEdit, FaCheck, FaTrash, FaUndo, FaSave } from "react-icons/fa";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (!newTask.trim()) return;
    const timestamp = new Date().toLocaleString();
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        editing: false,
        createdAt: timestamp
      }
    ]);
    setNewTask("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditToggle = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, editing: !task.editing } : task
      )
    );
  };

  const handleEditChange = (id, value) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: value } : task
      )
    );
  };

  const handleEditSave = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, editing: false } : task
      )
    );
  };

  return (
    <Container className="mt-5 gradient-custom-2">
      <Row>
        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <h3 className="mb-4 text-center">To-Do List</h3>
          <Form onSubmit={e => { e.preventDefault(); handleAdd(); }}>
            <Form.Group controlId="taskInput" className="d-flex flex-column flex-sm-row gap-2">
              <Form.Control
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                style={{ minWidth: 0 }}
              />
              <Button variant="primary" type="submit" style={{ flexShrink: 0 }}>
                Add Task
              </Button>
            </Form.Group>
          </Form>

          <ListGroup className="mt-4">
            {tasks.length === 0 && (
              <p className="text-muted text-center">You have no active tasks.</p>
            )}
            {tasks.map(task => (
              <ListGroup.Item
                key={task.id}
                className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3"
              >
                <div style={{ flex: 1, minWidth: 0, wordBreak: "break-word" }}>
                  {task.editing ? (
                    <Form.Control
                      type="text"
                      value={task.text}
                      onChange={e => handleEditChange(task.id, e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleEditSave(task.id)}
                      style={{ minWidth: 0 }}
                    />
                  ) : (
                    <>
                      <span style={{
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.text}
                        {task.completed && (
                          <Badge bg="success" className="ms-2">Done</Badge>
                        )}
                      </span>
                      <br />
                      <small className="text-muted">Added: {task.createdAt}</small>
                    </>
                  )}
                </div>

                <div className="mt-2 mt-sm-0 d-flex flex-wrap gap-2 justify-content-sm-end" style={{ minWidth: 0 }}>
                  {task.editing ? (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleEditSave(task.id)}
                      style={{ flexShrink: 0 }}
                    >
                      <FaSave />
                    </Button>
                  ) : (
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleEditToggle(task.id)}
                      style={{ flexShrink: 0 }}
                    >
                      <FaEdit />
                    </Button>
                  )}
                  <Button
                    variant={task.completed ? "outline-secondary" : "outline-success"}
                    size="sm"
                    onClick={() => handleComplete(task.id)}
                    style={{ flexShrink: 0 }}
                  >
                    {task.completed ? <FaUndo /> : <FaCheck />}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                    style={{ flexShrink: 0 }}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
