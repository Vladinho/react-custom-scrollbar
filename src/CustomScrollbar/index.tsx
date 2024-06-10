import React, { useRef, useEffect } from 'react';
import {
  ScrollbarContainer,
  ScrollContent,
  VerticalScrollbarThumb,
  HorizontalScrollbarThumb,
  VerticalScrollbarRoute,
  HorizontalScrollbarRoute,
} from './styles';
import useDrag from '../hooks/useDrag';
import useScrollbar from '../hooks/useScrolbar';

interface CustomScrollbarProps {
  children: React.ReactNode;
  isVerticalHidden?: boolean;
  isHorizontalHidden?: boolean;
  sx?: any;
  deps?: any[];
  cssClassPrefix?: string;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  isVerticalHidden = false,
  isHorizontalHidden = false,
  sx,
  deps = [],
  cssClassPrefix = 'customScrollbar',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    verticalScrollbarRef,
    horizontalScrollbarRef,
    verticalThumbHeight,
    horizontalThumbWidth,
    showVerticalScrollbar,
    showHorizontalScrollbar,
  } = useScrollbar(isVerticalHidden, isHorizontalHidden, containerRef, deps);
  const { startDragging } = useDrag(containerRef);

  useEffect(() => {
    const container = containerRef.current!;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains(`${cssClassPrefix}__vertical-thumb`)) {
        startDragging(e, 'vertical');
      } else if (
        target.classList.contains(`${cssClassPrefix}__horizontal-thumb`)
      ) {
        startDragging(e, 'horizontal');
      }
    };

    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, [startDragging, cssClassPrefix]);

  return (
    <ScrollbarContainer className={cssClassPrefix} sx={sx}>
      <ScrollContent
        className={`${cssClassPrefix}__content`}
        ref={containerRef}
      >
        {children}
      </ScrollContent>
      {showVerticalScrollbar && (
        <VerticalScrollbarRoute className={`${cssClassPrefix}__vertical-route`}>
          <VerticalScrollbarThumb
            className={`${cssClassPrefix}__vertical-thumb`}
            ref={verticalScrollbarRef}
            height={verticalThumbHeight}
            onMouseDown={(e: React.MouseEvent) => startDragging(e, 'vertical')}
            onTouchStart={(e: React.TouchEvent) => startDragging(e, 'vertical')}
          />
        </VerticalScrollbarRoute>
      )}
      {showHorizontalScrollbar && (
        <HorizontalScrollbarRoute
          className={`${cssClassPrefix}__horizontal-route`}
        >
          <HorizontalScrollbarThumb
            className={`${cssClassPrefix}__horizontal-thumb`}
            ref={horizontalScrollbarRef}
            width={horizontalThumbWidth}
            onMouseDown={(e: React.MouseEvent) =>
              startDragging(e, 'horizontal')
            }
            onTouchStart={(e: React.TouchEvent) =>
              startDragging(e, 'horizontal')
            }
          />
        </HorizontalScrollbarRoute>
      )}
    </ScrollbarContainer>
  );
};

export default CustomScrollbar;
