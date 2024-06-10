import React, { useEffect, useState } from 'react';

const useDrag = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ x: 0, y: 0 });
  const [draggingDirection, setDraggingDirection] = useState<string | null>(null);

  const startDragging = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent,
    direction: 'horizontal' | 'vertical',
  ) => {
    setIsDragging(true);
    setDraggingDirection(direction);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragStart({ x: clientX, y: clientY });
    setScrollStart({
      x: containerRef.current!.scrollLeft,
      y: containerRef.current!.scrollTop,
    });

    e.preventDefault();
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const container = containerRef.current!;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;

    if (draggingDirection === 'horizontal') {
      container.scrollLeft = scrollStart.x + dx * (container.scrollWidth / container.clientWidth);
    } else if (draggingDirection === 'vertical') {
      container.scrollTop = scrollStart.y + dy * (container.scrollHeight / container.clientHeight);
    }

    e.preventDefault();
  };

  const stopDragging = () => {
    setIsDragging(false);
    setDraggingDirection(null);
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        stopDragging();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', onDrag, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return {
    startDragging,
  };
};

export default useDrag;
