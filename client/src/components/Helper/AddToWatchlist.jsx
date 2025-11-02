import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider";
import { bus } from "../../utils/eventBus"; // adjust path if needed

export default function AddToWatchlist({ movie }) {
    const { user, setUser } = useAuth();
    const [isWatched, setIsWatched] = useState(false);

    const movieId = movie?.id ?? movie?._id;

    // Check if movie is in user's watched list
    useEffect(() => {
        if (!user || !Array.isArray(user.watchedMovies) || !movieId) {
            setIsWatched(false);
            return;
        }

        const watched = user.watchedMovies.some(
            (m) => (m.id ?? m._id) === movieId
        );
        setIsWatched(watched);
    }, [user, movieId]);

    // Persist user change and notify others via bus
    const persistUserChange = (newUser) => {
        if (typeof setUser === "function") {
            setUser(newUser);
        } else {
            localStorage.setItem("user", JSON.stringify(newUser));
        }

        // emit an event so other components can react to the change
        bus.emit("userUpdated", newUser);
    };

    const handleToggle = (e) => {
        e.stopPropagation();
        if (!movieId) return;

        const newUser = { ...(user || {}) };
        const current = Array.isArray(newUser.watchedMovies)
            ? [...newUser.watchedMovies]
            : [];

        const index = current.findIndex((m) => (m.id ?? m._id) === movieId);

        if (index === -1) {
            // Add movie to watched list
            current.push(movie);
            setIsWatched(true);
        } else {
            // Remove movie from watched list
            current.splice(index, 1);
            setIsWatched(false);
        }

        newUser.watchedMovies = current;
        persistUserChange(newUser);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-pressed={isWatched}
            aria-label={isWatched ? "Remove from watched" : "Add to watched"}
            style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
            }}
        >
            <FaRegBookmark
                size={20}
                color={isWatched ? "#e0245e" : "#9ca3af"}
                style={{ transition: "color 0.3s ease" }}
            />
        </button>
    );
}
