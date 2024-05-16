import type { RefObject } from "react";
import { useState, useEffect } from "react";
/**
 * Custom hook that tracks the scroll position of an HTMLElement and checks if it has scrolled beyond a specified limit.
 *
 * @param {RefObject<HTMLElement>} ref - A React ref object pointing to the target element to monitor for scroll events.
 * @param {number} limit - The pixel threshold after which `isScrolled` should return `true`.
 * @returns {{scrollPosition: number; isScrolled: boolean;}} A tuple where the first element is the current scroll position and the second element is a boolean indicating whether the scroll position has exceeded the specified limit.
 *
 * ### Example
 * ```tsx
 * import React, { useRef } from 'react';
 * import useScrolled from './useScrolled';
 *
 * const ScrollComponent: React.FC = () => {
 *   const scrollRef = useRef<HTMLDivElement>(null);
 *   const [scrollPosition, isScrolled] = useScrolled(scrollRef, 100);
 *
 *   return (
 *     <div ref={scrollRef} style={{ height: '200px', overflow: 'auto' }}>
 *       <div style={{ height: '500px' }}>
 *         Scroll down to see more content and check the scroll position!
 *       </div>
 *       <p>Scroll Position: {scrollPosition}px</p>
 *       {isScrolled && <p>You have scrolled more than 100 pixels!</p>}
 *     </div>
 *   );
 * }
 *
 * export default ScrollComponent;
 * ```
 */

function useScrolled(
  ref: RefObject<HTMLElement>,
  limit: number
): {
  scrollPosition: number;
  isScrolled: boolean;
} {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const newScrollPosition = ref.current.scrollTop;
        setScrollPosition(newScrollPosition);
        setIsScrolled(newScrollPosition > limit);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return { scrollPosition, isScrolled };
}

export default useScrolled;
