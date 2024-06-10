import React, { useRef } from 'react';
import {
  ScrollbarContainer,
  ScrollContent,
  VerticalScrollbarThumb,
  HorizontalScrollbarThumb,
  VerticalScrollbarRoute,
  HorizontalScrollbarRoute,
} from './styles';
import useScrollbar from '../hooks/useScrolbar';
import useDrag from '../hooks/useDrag';

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
            onMouseDown={(e: React.MouseEvent | React.TouchEvent) => startDragging(e, 'vertical')}
            onTouchStart={(e: React.MouseEvent | React.TouchEvent,) => startDragging(e, 'vertical')}
          />
        </VerticalScrollbarRoute>
      )}
      {showHorizontalScrollbar && (
        <HorizontalScrollbarRoute
          className={`${cssClassPrefix}__vertical-route`}
        >
          <HorizontalScrollbarThumb
            className={`${cssClassPrefix}__horizontal-thumb`}
            ref={horizontalScrollbarRef}
            width={horizontalThumbWidth}
            onMouseDown={(e: React.MouseEvent | React.TouchEvent) => startDragging(e, 'horizontal')}
            onTouchStart={(e: React.MouseEvent | React.TouchEvent,) => startDragging(e, 'horizontal')}
          />
        </HorizontalScrollbarRoute>
      )}
    </ScrollbarContainer>
  );
};

export default CustomScrollbar;
