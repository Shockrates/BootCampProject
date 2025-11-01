import React from 'react'
import { useNavigate } from "react-router-dom";

const Contact = () => {
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
                <h1 className="text-2xl font-bold mb-4">📞 Επικοινωνία</h1>

                <p className="mb-4">
                    Έχεις απορίες, προτάσεις ή θέλεις συνεργασία μαζί μας;
                    Στείλε μας email στο info@reeltalk.gr ή βρες μας στα social media.
                    Η ομάδα του ReelTalk είναι πάντα ανοιχτή σε feedback, ιδέες και προτάσεις συνεργασίας με brands ή κινηματογραφικές επιχειρήσεις.
                </p>
            </div>
        </div>


    )
}

export default Contact