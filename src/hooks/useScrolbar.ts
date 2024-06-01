import { useEffect, useState, useRef } from 'react';

const useScrollbar = (
  isVerticalHidden: boolean,
  isHorizontalHidden: boolean,
  externalContainerRef: React.RefObject<HTMLDivElement> | null = null,
  deps: any[] = [],
) => {
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || internalContainerRef;
  const verticalScrollbarRef = useRef<HTMLDivElement>(null);
  const horizontalScrollbarRef = useRef<HTMLDivElement>(null);
  const [verticalThumbHeight, setVerticalThumbHeight] = useState(0);
  const [horizontalThumbWidth, setHorizontalThumbWidth] = useState(0);
  const [showVerticalScrollbar, setShowVerticalScrollbar] = useState(false);
  const [showHorizontalScrollbar, setShowHorizontalScrollbar] = useState(false);

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;

    const updateThumbSizeAndVisibility = () => {
      const { clientHeight, scrollHeight, clientWidth, scrollWidth } =
        container;

      const newVerticalThumbHeight =
        (clientHeight / scrollHeight) * clientHeight;
      const newHorizontalThumbWidth = (clientWidth / scrollWidth) * clientWidth;

      setVerticalThumbHeight(newVerticalThumbHeight);
      setHorizontalThumbWidth(newHorizontalThumbWidth);

      setShowVerticalScrollbar(
        !isVerticalHidden && scrollHeight > clientHeight,
      );
      setShowHorizontalScrollbar(
        !isHorizontalHidden && scrollWidth > clientWidth,
      );
    };

    const handleScroll = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth,
      } = container;

      if (showVerticalScrollbar) {
        const verticalThumbPosition = (scrollTop / scrollHeight) * clientHeight;
        if (verticalScrollbarRef.current) {
          verticalScrollbarRef.current.style.top = `${verticalThumbPosition}px`;
        }
      }

      if (showHorizontalScrollbar) {
        const horizontalThumbPosition =
          (scrollLeft / scrollWidth) * clientWidth;
        if (horizontalScrollbarRef.current) {
          horizontalScrollbarRef.current.style.left = `${horizontalThumbPosition}px`;
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateThumbSizeAndVisibility);
    });
    resizeObserver.observe(container);

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateThumbSizeAndVisibility);

    updateThumbSizeAndVisibility();
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateThumbSizeAndVisibility);
      resizeObserver.unobserve(container);
      resizeObserver.disconnect();
    };
  }, [
    isVerticalHidden,
    isHorizontalHidden,
    showVerticalScrollbar,
    showHorizontalScrollbar,
    ...deps,
  ]);

  return {
    containerRef,
    verticalScrollbarRef,
    horizontalScrollbarRef,
    verticalThumbHeight,
    horizontalThumbWidth,
    showVerticalScrollbar,
    showHorizontalScrollbar,
  };
};

export default useScrollbar;
