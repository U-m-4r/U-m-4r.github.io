import React, { useState, useRef, useEffect } from 'react';

export function Window({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  isActive,
  isVisible,
  zIndex,
  bringToFront,
  initialPosition = { x: 80, y: 60 },
  initialSize = { width: 560, height: 400 },
  noContentPadding = false,
}) {
  const [pos, setPos]   = useState(initialPosition);
  const [maximized, setMaximized] = useState(false);
  const [dragging, setDragging]   = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef  = useRef(null);

  // Focus the window element when it becomes active
  useEffect(() => {
    if (isActive && isVisible && windowRef.current) {
      windowRef.current.focus();
    }
  }, [isActive, isVisible]);

  // ── Dragging ────────────────────────────────────────────────────────────────
  const startDrag = (e) => {
    if (maximized) return;
    if (!e.target.closest('.title-bar-text') && !e.currentTarget.classList.contains('title-bar')) return;
    e.preventDefault();
    bringToFront();
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const nx = e.clientX - dragOffset.current.x;
      const ny = Math.max(0, e.clientY - dragOffset.current.y);
      setPos({ x: nx, y: ny });
    };
    const onUp = () => setDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  // Touch drag support
  const startTouchDrag = (e) => {
    if (maximized) return;
    const touch = e.touches[0];
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    bringToFront();
    const onMove = (ev) => {
      const t = ev.touches[0];
      setPos({
        x: t.clientX - dragOffset.current.x,
        y: Math.max(0, t.clientY - dragOffset.current.y),
      });
    };
    const onEnd = () => {
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd);
  };

  const style = maximized
    ? {
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex,
        display: isVisible ? 'flex' : 'none',
        border: 'none',
        borderRadius: 0,
      }
    : {
        position: 'absolute',
        top: pos.y,
        left: pos.x,
        width: initialSize.width,
        height: initialSize.height,
        zIndex,
        display: isVisible ? 'flex' : 'none',
      };

  return (
    <div
      ref={windowRef}
      className="window"
      style={style}
      onMouseDown={() => bringToFront()}
      tabIndex={-1}
      role="dialog"
      aria-label={title}
      aria-modal="true"
    >
      {/* Title bar */}
      <div
        className={`title-bar${isActive ? '' : ' inactive'}`}
        onMouseDown={startDrag}
        onTouchStart={startTouchDrag}
        onDoubleClick={() => setMaximized(m => !m)}
      >
        <div className="title-bar-text" aria-hidden="true">
          {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
          {title}
        </div>
        <div className="title-bar-controls">
          <button
            className="title-bar-button minimize"
            aria-label={`Minimize ${title}`}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            _
          </button>
          <button
            className="title-bar-button maximize"
            aria-label={maximized ? `Restore ${title}` : `Maximize ${title}`}
            onClick={(e) => { e.stopPropagation(); setMaximized(m => !m); }}
          >
            {maximized ? '❐' : '□'}
          </button>
          <button
            className="title-bar-button close"
            aria-label={`Close ${title}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="window-content"
        style={noContentPadding ? { padding: 0 } : {}}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
