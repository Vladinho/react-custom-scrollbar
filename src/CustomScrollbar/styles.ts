import styled from 'styled-components';

interface ScrollbarContainerProps {
  sx?: any;
}

interface ScrollbarProps {
  height?: number;
  width?: number;
}

export const ScrollbarContainer = styled.div<ScrollbarContainerProps>`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-right: 20px;
    padding-bottom: 20px;

    @media (pointer: coarse) {
        padding-right: 30px;
        padding-bottom: 30px;
    }
    
    ${({ sx }) => sx}
`;

export const ScrollContent = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

export const VerticalScrollbarRoute = styled.div<ScrollbarProps>`
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 20px);
    background: #ccc;
    border-radius: 4px;
    width: 12px;

    @media (pointer: coarse) {
        height: calc(100% - 30px);
        width: 20px; /* Increase width on touch devices */
    }
`;

export const HorizontalScrollbarRoute = styled.div<ScrollbarProps>`
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% - 20px);
    background: #ccc;
    border-radius: 4px;
    height: 12px;

    @media (pointer: coarse) {
        width: calc(100% - 30px);
        height: 20px; /* Increase height on touch devices */
    }
`;

export const VerticalScrollbarThumb = styled.div<ScrollbarProps>`
    position: absolute;
    right: 2px;
    top: 0;
    width: 8px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    height: ${({ height }) => `${height}px`};

    @media (pointer: coarse) {
        border-radius: 20px;
        width: 16px; /* Increase width on touch devices */
    }
`;

export const HorizontalScrollbarThumb = styled.div<ScrollbarProps>`
    position: absolute;
    bottom: 2px;
    left: 0;
    height: 8px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    width: ${({ width }) => `${width}px`};

    @media (pointer: coarse) {
        border-radius: 20px;
        height: 16px; /* Increase height on touch devices */
    }
`;
