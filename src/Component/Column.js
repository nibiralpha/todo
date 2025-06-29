import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Droppable } from "@hello-pangea/dnd";
import AddTodoModal from "./AddTodoModal";

const Column = ({ title, status, todos, onAdd, onMove }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="column">
      <div className="title">
        <h2>{title}</h2>
        {status === "New" && (
          <img
            onClick={() => setModalOpen(true)}
            src="add.png"
            height="40px"
            width="40px"
            className="add"
          ></img>
        )}
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="todo-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos
              .filter((todo) => todo.status === status)
              .map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onMove={onMove}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTodoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          onAdd({ ...data, id: Date.now(), status: "New" });
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default Column;
