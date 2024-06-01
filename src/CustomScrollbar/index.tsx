import React, { useRef } from 'react';
import {
  ScrollbarContainer,
  ScrollContent,
  VerticalScrollbarThump,
  HorizontalScrollbarThump,
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
          <VerticalScrollbarThump
            className={`${cssClassPrefix}__vertical-thump`}
            ref={verticalScrollbarRef}
            height={verticalThumbHeight}
            onMouseDown={(e: any) => startDragging(e, 'vertical')}
          />
        </VerticalScrollbarRoute>
      )}
      {showHorizontalScrollbar && (
        <HorizontalScrollbarRoute
          className={`${cssClassPrefix}__vertical-route`}
        >
          <HorizontalScrollbarThump
            className={`${cssClassPrefix}__horizontal-thump`}
            ref={horizontalScrollbarRef}
            width={horizontalThumbWidth}
            onMouseDown={(e: any) => startDragging(e, 'horizontal')}
          />
        </HorizontalScrollbarRoute>
      )}
    </ScrollbarContainer>
  );
};

export default CustomScrollbar;
