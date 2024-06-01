import styled from 'styled-components';

interface CustomScrollbarShadowsBaseProps {
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

export const CustomScrollbarShadowsBase = styled.div<CustomScrollbarShadowsBaseProps>`
  position: absolute;
  z-index: 10;
  width: ${({ verticalScrollSize }) =>
    verticalScrollSize ? `calc(100% - ${verticalScrollSize}px)` : `100%`};
  height: ${({ horizontalScrollSize }) =>
    horizontalScrollSize ? `calc(100% - ${horizontalScrollSize}px)` : `100%`};
  pointer-events: none;

  .table__left-scroll-shadow,
  .table__right-scroll-shadow,
  .table__top-scroll-shadow,
  .table__bottom-scroll-shadow {
    opacity: 0;
    background: linear-gradient(
      to right,
      rgba(244, 244, 246, 0) 0%,
      rgba(244, 244, 246, 1) 100%
    );
    position: absolute;
    pointer-events: none;
    z-index: 10;
    transition: opacity 0.1s ease-in;
  }

  .table__left-scroll-shadow {
    background: linear-gradient(
      to left,
      rgba(244, 244, 246, 0) 0%,
      rgba(244, 244, 246, 1) 100%
    );
    left: ${({ leftOffset }) => leftOffset || 0}px;
    top: 0;
    height: 100%;
    width: ${({ horizontalSize }) => horizontalSize};
    ${({ isHorizontalScrollOverflow, isLeftScrolled }) =>
      isHorizontalScrollOverflow && !isLeftScrolled && `opacity: 1;`}
  }

  .table__right-scroll-shadow {
    right: ${({ rightOffset }) => rightOffset || 0}px;
    top: 0;
    height: 100%;
    width: ${({ horizontalSize }) => horizontalSize};
    ${({ isHorizontalScrollOverflow, isRightScrolled }) =>
      isHorizontalScrollOverflow && !isRightScrolled && `opacity: 1;`}
  }

  .table__top-scroll-shadow {
    background: linear-gradient(
      to top,
      rgba(244, 244, 246, 0) 0%,
      rgba(244, 244, 246, 1) 100%
    );
    left: 0;
    top: ${({ topOffset }) => topOffset || 0}px;
    height: ${({ verticalSize }) => verticalSize};
    width: 100%;
    ${({ isTopScrolled, isVerticalScrollOverflow }) =>
      isVerticalScrollOverflow && !isTopScrolled && `opacity: 1;`}
  }

  .table__bottom-scroll-shadow {
    background: linear-gradient(
      to bottom,
      rgba(244, 244, 246, 0) 0%,
      rgba(244, 244, 246, 1) 100%
    );
    left: 0;
    bottom: ${({ bottomOffset }) => bottomOffset || 0}px;
    height: ${({ verticalSize }) => verticalSize};
    width: 100%;
    ${({ isBottomScrolled, isVerticalScrollOverflow }) =>
      isVerticalScrollOverflow && !isBottomScrolled && `opacity: 1;`}
  }

  ${({ sx }) => sx}
`;
