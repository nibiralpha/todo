import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import ContextMenu from './ContextMenu';

const statusColors = {
  New: 'blue',
  Ongoing: 'orange',
  Done: 'green'
};

const TodoItem = ({ todo, index, onMove }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleMove = (newStatus) => {
    onMove(todo.id, newStatus);
    setShowMenu(false);
  };

  return (
    <Draggable draggableId={String(todo.id)} index={index}>
      {(provided) => (
        <div
          className="todo-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onContextMenu={handleContextMenu}
        >
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <span className="status" style={{ backgroundColor: statusColors[todo.status] }}>
            {todo.status}
          </span>
          {showMenu && (
            <ContextMenu
              x={menuPos.x}
              y={menuPos.y}
              currentStatus={todo.status}
              onSelect={handleMove}
              onClose={() => setShowMenu(false)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
