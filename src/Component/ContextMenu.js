import React, { useEffect, useState, useRef } from 'react';

const allStatuses = ['New', 'Ongoing', 'Done'];

const ContextMenu = ({ x, y, currentStatus, onSelect, onClose }) => {
  const menuRef = useRef(null);
  const [position, setPosition] = useState({ top: y, left: x });

  useEffect(() => {
    const adjustPosition = () => {
      const menu = menuRef.current;
      if (!menu) return;

      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menu;

      let adjustedX = x;
      let adjustedY = y;

      if (x + offsetWidth > innerWidth) {
        adjustedX = innerWidth - offsetWidth - 10;
      }
      if (y + offsetHeight > innerHeight) {
        adjustedY = innerHeight - offsetHeight - 10;
      }

      setPosition({ top: adjustedY, left: adjustedX });
    };

    adjustPosition();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [x, y, onClose]);

  return (
    <ul
      ref={menuRef}
      className="context-menu"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        listStyle: 'none',
        padding: '4px 0',
        margin: 0,
        minWidth: '150px',
      }}
    >
      {allStatuses
        .filter(status => status !== currentStatus)
        .map(status => (
          <li
            key={status}
            onClick={() => onSelect(status)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.target.style.backgroundColor = '#f5f5f5')}
            onMouseLeave={e => (e.target.style.backgroundColor = 'transparent')}
          >
            Move to {status}
          </li>
        ))}
    </ul>
  );
};

export default ContextMenu;
