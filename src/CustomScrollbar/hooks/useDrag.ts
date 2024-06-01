import { useEffect, useState } from 'react';

const useDrag = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const [draggingDirection, setDraggingDirection] = useState<string | null>(
    null,
  );

  const startDragging = (
    e: React.MouseEvent,
    direction: 'horizontal' | 'vertical',
  ) => {
    setIsDragging(true);
    setDraggingDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
    setScrollStart({
      x: containerRef.current!.scrollLeft,
      y: containerRef.current!.scrollTop,
    });
    e.preventDefault();
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging) return;

    const container = containerRef.current!;
    // const container = containerRef.current!.children[0];
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    if (draggingDirection === 'horizontal') {
      container.scrollLeft =
        scrollStart.x + dx * (container.scrollWidth / container.clientWidth);
    } else if (draggingDirection === 'vertical') {
      container.scrollTop =
        scrollStart.y + dy * (container.scrollHeight / container.clientHeight);
    }
    e.preventDefault();
  };

  const stopDragging = () => {
    setIsDragging(false);
    setDraggingDirection(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    }

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging]);

  return {
    startDragging,
  };
};

export default useDrag;
