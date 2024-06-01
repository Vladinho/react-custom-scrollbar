import React from 'react';
import { CustomScrollbarShadowsBase } from './styles';

interface CustomScrollbarShadowsProps {
  verticalScrollSize?: number;
  horizontalScrollSize?: number;
  leftOffset?: number;
  rightOffset?: number;
  topOffset?: number;
  bottomOffset?: number;
  horizontalSize?: string;
  verticalSize?: string;
  isHorizontalScrollOverflow?: boolean;
  isLeftScrolled?: boolean;
  isRightScrolled?: boolean;
  isTopScrolled?: boolean;
  isVerticalScrollOverflow?: boolean;
  isBottomScrolled?: boolean;
  sx?: any;
}

const CustomScrollbarShadows: React.FC<CustomScrollbarShadowsProps> = ({
  verticalScrollSize,
  horizontalScrollSize,
  leftOffset,
  rightOffset,
  topOffset,
  bottomOffset,
  horizontalSize,
  verticalSize,
  isHorizontalScrollOverflow,
  isLeftScrolled,
  isRightScrolled,
  isTopScrolled,
  isVerticalScrollOverflow,
  isBottomScrolled,
  sx,
}) => {
  return (
    <CustomScrollbarShadowsBase
      verticalScrollSize={verticalScrollSize}
      horizontalScrollSize={horizontalScrollSize}
      leftOffset={leftOffset}
      rightOffset={rightOffset}
      topOffset={topOffset}
      bottomOffset={bottomOffset}
      horizontalSize={horizontalSize}
      verticalSize={verticalSize}
      isHorizontalScrollOverflow={isHorizontalScrollOverflow}
      isLeftScrolled={isLeftScrolled}
      isRightScrolled={isRightScrolled}
      isTopScrolled={isTopScrolled}
      isVerticalScrollOverflow={isVerticalScrollOverflow}
      isBottomScrolled={isBottomScrolled}
      sx={sx}
    >
      {/* Shadows */}
      <div className="table__left-scroll-shadow" />
      <div className="table__right-scroll-shadow" />
      <div className="table__top-scroll-shadow" />
      <div className="table__bottom-scroll-shadow" />
    </CustomScrollbarShadowsBase>
  );
};

export default CustomScrollbarShadows;
