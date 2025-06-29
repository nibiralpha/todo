import React, { useState } from "react";
import Column from "./Component/Column";
import { DragDropContext } from "@hello-pangea/dnd";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const moveTodo = (id, newStatus) => {
    const move = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );

    setTodos(move);
  };

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    setTodos((prevTodos) => {
      const draggedItemId = Number(draggableId);
      const draggedItem = prevTodos.find((todo) => todo.id === draggedItemId);
      if (!draggedItem) return prevTodos;

      const updatedTodos = [...prevTodos];

      const filtered = updatedTodos.filter((todo) => todo.id !== draggedItemId);

      const destinationTodos = filtered.filter(
        (todo) => todo.status === destination.droppableId
      );

      const updatedItem = { ...draggedItem, status: destination.droppableId };
      destinationTodos.splice(destination.index, 0, updatedItem);

      const others = filtered.filter(
        (todo) => todo.status !== destination.droppableId
      );
      return [...others, ...destinationTodos];
    });
  };

  return (
    <div className="app">
      <h1>Kanban Todo List</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {["New", "Ongoing", "Done"].map((status) => (
            <Column
              key={status}
              title={status}
              status={status}
              todos={todos.filter((todo) => todo.status === status)}
              onAdd={addTodo}
              onMove={moveTodo}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;

