//import { useState } from "react";
import free from '../../assets/free.png'
import diamond from '../../assets/diamond.png'
import gold from '../../assets/gold.png'





const options = [
    {
        id: "free",
        label: "Free",
        src: free,
        details: [
            "Πρόσβαση σε περιορισμένο αριθμό κριτικών (10/ εβδομάδα)",
            "Βασική Watchlist (max 10 ταινίες)",
            "Προβολή διαφημίσεων πριν την ανάγνωση κριτικής",
            "Καθυστερημένη πρόσβαση σε νέες κριτικές (π.χ. 3 μέρες μετά τους Gold/Diamond)",
        ],
    },
    {
        id: "gold",
        label: "Gold",
        src: gold,
        details: [
            "Πλήρης πρόσβαση σε όλες τις κριτικές",
            "Προσωπικές προτάσεις ταινιών βάσει προφίλ",
            "Απεριόριστη Watchlist",
            "10% Village",
            "5% Efood",
            "Δυνατότητα σχολιασμού & αξιολόγησης ταινιών",
        ],
    },
    {
        id: "diamond",
        label: "Diamond",
        src: diamond,
        details: [
            " Πλήρης πρόσβαση σε όλες τις κριτικές",
            "Προσωπικές προτάσεις ταινιών βάσει προφίλ",
            "Απεριόριστη Watchlist",
            "20%  Village",
            "10% Efood",
            "Πρόσβαση σε αποκλειστικά events",
        ],
    },
];

export default function SelectSubscription({ selected, setSelected }) {
    // const [selected, setSelected] = useState("option1"); // default option

    const selectedOption = options.find(opt => opt.id === selected);

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Image radio options */}
            <div className="flex flex-wrap justify-center gap-4">
                {options.map((option) => (
                    <label
                        key={option.id}
                        className={`
              cursor-pointer
              border-2
              rounded-lg
              overflow-hidden
              transition
              transform
              hover:scale-105
              ${selected === option.id ? "border-[#D26D15]" : "border-transparent"}
            `}
                    >
                        <input
                            type="radio"
                            name="subscription"
                            value={option.id}
                            className="sr-only"
                            checked={selected === option.id}
                            onChange={() => setSelected(option.id)}
                        />
                        <img
                            src={option.src}
                            alt={option.label}
                            className="w-28 h-28 object-cover"
                        />
                        <p className="text-center mt-1 font-medium">{option.label}</p>
                    </label>
                ))}
            </div>

            {/* Details div below */}
            <div className="bg-stone-800 p-4 rounded-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-2">{selectedOption.label} Benefits:</h2>
                <ul className="list-disc list-inside space-y-1 text-slate-200">
                    {selectedOption.details.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
