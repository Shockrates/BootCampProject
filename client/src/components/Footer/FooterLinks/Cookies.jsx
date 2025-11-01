import React from 'react'
import { useNavigate } from "react-router-dom";

const Cookies = () => {
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
                <h1 className="text-2xl font-bold mb-4">🍪 Προτιμήσεις Cookies</h1>

                <p className="mb-4">
                    Το ReelTalk χρησιμοποιεί cookies για να βελτιώσει την εμπειρία σας και να παρέχει προσωποποιημένες προτάσεις ταινιών.
                    Μπορείτε να επιλέξετε ποια cookies αποδέχεστε μέσω των ρυθμίσεων προτιμήσεων.
                    Η συνέχιση της περιήγησής σας σημαίνει αποδοχή των cookies σύμφωνα με την πολιτική μας.
                </p>
            </div>
        </div>


    )
}

export default Cookies