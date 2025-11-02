import { useState, useMemo, useRef, useEffect } from 'react'
import FeedListItem from '../CommunityFeed/FeedListItem'
import ReviewModal from '../Review/ReviewModal';
import { useAuth } from '../Auth/AuthProvider'

const VISIBLE = 4; // number of visible items in carousel
const TRANSITION_MS = 500; // animation duration

const FeedListCarusel = ({ reviews, isProfile = false, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [review, setReview] = useState({});
    const { user } = useAuth();

    // start so the last element is visible (show last VISIBLE items)
    const initialStart = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        return Math.max(0, reviews.length - VISIBLE);
    }, [reviews]);

    const [startIndex, setStartIndex] = useState(initialStart);

    // refs for measurement & track
    const trackRef = useRef(null);
    const itemRef = useRef(null); // attach to first item to measure
    const [offsetPx, setOffsetPx] = useState(0); // pixels to move per index

    // compute and set offsetPx (item width + gap)
    useEffect(() => {
        function measure() {
            const itemEl = itemRef.current;
            const trackEl = trackRef.current;
            if (!itemEl || !trackEl) return;

            // measured item width (includes padding/border)
            const itemRect = itemEl.getBoundingClientRect();
            const itemW = Math.round(itemRect.width);

            // gap — modern browsers expose gap for flex via getComputedStyle().gap
            const cs = getComputedStyle(trackEl);
            // gap may be reported as '16px' or empty string; parseFloat fallback to 0
            const gapStr = cs.gap || cs.columnGap || '0px';
            const gapPx = parseFloat(gapStr) || 0;

            setOffsetPx(itemW + gapPx);

        }

        // measure after paint
        measure();
        // measure again on resize
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [reviews]);

    // Keep startIndex in bounds if reviews change length
    useEffect(() => {
        const maxStart = Math.max(0, (reviews?.length || 0) - VISIBLE);
        if (startIndex > maxStart) setStartIndex(maxStart);
    }, [reviews, startIndex]);

    function openModal(selectedReview) {
        setReview(selectedReview)
        setIsOpen(true);
    }

    function closeModal() {
        setReview({});
        setIsOpen(false)
    }

    if (!reviews || reviews.length === 0) return <p>No reviews available.</p>

    const canPrev = startIndex > 0;
    const canNext = startIndex + VISIBLE < reviews.length;

    function handlePrev() {
        if (!canPrev) return;
        setStartIndex(prev => Math.max(0, prev - 1));
    }

    function handleNext() {
        if (!canNext) return;
        setStartIndex(prev => Math.min(Math.max(0, reviews.length - 1), prev + 1));
    }

    // compute translate based on startIndex * offsetPx
    const translateX = -(startIndex * offsetPx);

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={handlePrev}
                    disabled={!canPrev}
                    className="px-3 py-1 rounded shadow-sm border disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous"
                >
                    Prev
                </button>

                <div className="text-sm text-slate-400">
                    {reviews.length > 0 ? `Showing ${startIndex + 1}–${Math.min(startIndex + VISIBLE, reviews.length)} of ${reviews.length}` : ''}
                </div>

                <button
                    onClick={handleNext}
                    disabled={!canNext}
                    className="px-3 py-1 rounded shadow-sm border disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next"
                >
                    Next
                </button>
            </div>

            {/* Carousel viewport */}
            <div className="overflow-hidden">
                {/* track: full list, will be translated */}
                <div
                    ref={trackRef}
                    className="flex gap-[var(--gap)]"
                    role="list"
                    aria-label="Reviews carousel"
                    style={{
                        transform: `translateX(${translateX}px)`,
                        transition: `transform ${TRANSITION_MS}ms ease`,
                        // prevent subpixel blurry edges by using will-change
                        willChange: 'transform',
                    }}
                >
                    {reviews.map((r, i) => (
                        <div
                            key={r._id ?? i}
                            ref={i === 0 ? itemRef : null}
                            className="flex-shrink-0"
                            style={{
                                minWidth: '240px',
                                flex: '0 0 240px',
                            }}
                        >
                            <FeedListItem review={r} onOpen={openModal} isProfile={isProfile} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal (unchanged) */}
            <ReviewModal
                isOpen={isOpen}
                onClose={closeModal}
                review={review}
                user={review.userId}
                authUser={user}
            />
        </div>
    )
}

export default FeedListCarusel
