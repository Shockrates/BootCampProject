import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Generic Carousel
 *
 * Props:
 *  - items: array of data items to render
 *  - visibleCount: number of visible items at once (default 5)
 *  - children: render function (mapItem, index) => JSX
 *
 * Important: children MUST be a function. Each rendered child will only receive
 * the two arguments: (mapItem, index).
 */
const Carousel = ({ items = [], visibleCount = 5, children }) => {
    if (typeof children !== 'function') {
        throw new Error('Carousel children must be a function: (mapItem, index) => JSX');
    }

    // initial start so last items visible
    const initialStart = useMemo(() => Math.max(0, (items?.length || 0) - visibleCount), [items, visibleCount]);
    const [startIndex, setStartIndex] = useState(initialStart);

    // refs for track and first item measurement
    const trackRef = useRef(null);
    const firstItemRef = useRef(null);
    const [offsetPx, setOffsetPx] = useState(0);
    const TRANSITION_MS = 400;

    // measure item width + gap
    useEffect(() => {
        function measure() {
            const track = trackRef.current;
            const item = firstItemRef.current;
            if (!track || !item) return;

            const itemRect = item.getBoundingClientRect();
            const itemW = Math.round(itemRect.width);

            // computed gap for flex
            const cs = getComputedStyle(track);
            const gapStr = cs.gap || cs.columnGap || '0px';
            const gapPx = parseFloat(gapStr) || 0;

            setOffsetPx(itemW + gapPx);
        }

        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [items, visibleCount]);

    // keep startIndex in bounds when items change
    useEffect(() => {
        const maxStart = Math.max(0, (items?.length || 0) - visibleCount);
        if (startIndex > maxStart) setStartIndex(maxStart);
    }, [items, visibleCount, startIndex]);

    if (!items || items.length === 0) return <p className="text-sm text-slate-400">No items to show.</p>;

    const canPrev = startIndex > 0;
    const canNext = startIndex + visibleCount < items.length;

    function handlePrev() {
        if (!canPrev) return;
        setStartIndex(prev => Math.max(0, prev - visibleCount));
    }

    function handleNext() {
        if (!canNext) return;
        setStartIndex(prev => Math.min(Math.max(0, items.length - visibleCount), prev + visibleCount));
    }

    const translateX = -(startIndex * offsetPx);

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={handlePrev}
                    disabled={!canPrev}
                    aria-label="Previous"
                    className="px-3 py-1 rounded shadow-sm border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </button>

                <div className="text-sm text-slate-400">
                    {items.length > 0 ? `Showing ${startIndex + 1}–${Math.min(startIndex + visibleCount, items.length)} of ${items.length}` : ''}
                </div>

                <button
                    onClick={handleNext}
                    disabled={!canNext}
                    aria-label="Next"
                    className="px-3 py-1 rounded shadow-sm border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            {/* Viewport */}
            <div className="overflow-hidden">
                {/* Track contains ALL items and is translated */}
                <div
                    ref={trackRef}
                    className="flex gap-[var(--gap)]"
                    role="list"
                    aria-label="Carousel track"
                    style={{
                        transform: `translateX(${translateX}px)`,
                        transition: `transform ${TRANSITION_MS}ms ease`,
                        willChange: 'transform',
                    }}
                >
                    {items.map((item, i) => (
                        <div
                            key={item?.id ?? item?._id ?? i}
                            // attach ref only to first rendered item (for measurement)
                            ref={i === 0 ? firstItemRef : null}
                            className="flex-shrink-0"
                            style={{
                                minWidth: '240px',
                                flex: '0 0 240px',
                            }}
                            role="listitem"
                        >
                            {/* Render via provided render-function; only pass mapItem and index */}
                            {children(item, i)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
