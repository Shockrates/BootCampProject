import React from 'react'
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-[calc(100vh-20rem)]">
            <div className="flex-grow max-w-4xl mx-auto mt-12 px-6 text-slate-100 leading-relaxed">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                    ← Επιστροφή
                </button>
                <h1 className="text-2xl font-bold mb-4">🎞️ Ποιοι Είμαστε</h1>

                <p className="mb-4">
                    Το ReelTalk είναι η ελληνική κοινότητα των σινεφίλ.
                    Δημιουργήθηκε από λάτρεις του κινηματογράφου με στόχο να προσφέρει αληθινές κριτικές, αναλύσεις και επιβραβεύσεις για όσους αγαπούν τις ταινίες.
                    Συνδέσου με ανθρώπους που βλέπουν τις ταινίες όπως εσύ — με πάθος!
                </p>
            </div>
        </div>


    )
}

export default AboutUs