import React from 'react'
import { useNavigate } from "react-router-dom";

const Privacy = () => {
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
                <h1 className="text-2xl font-bold mb-4">Απόρρητο</h1>

                <p className="mb-4">
                    Σεβόμαστε την ιδιωτικότητά σας.
                    Στο ReelTalk συλλέγουμε μόνο τα απαραίτητα στοιχεία για τη λειτουργία του λογαριασμού σας και τη βελτίωση της εμπειρίας σας.
                    Δεν κοινοποιούμε προσωπικά δεδομένα σε τρίτους χωρίς τη συγκατάθεσή σας.
                    Για λεπτομέρειες σχετικά με την επεξεργασία δεδομένων και τα δικαιώματά σας, διαβάστε τους Όρους Χρήσης μας ή επικοινωνήστε μαζί μας..
                </p>
            </div>
        </div>


    )
}

export default Privacy