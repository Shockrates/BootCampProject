import React from 'react'

const StarRating = ({value, onChange}) => {
  return (
       <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((num) => (
            <label
            key={num}
            className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer border transition
                ${
                value === String(num)
                    ? "bg-indigo-500 border-indigo-400 text-white"
                    : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                }`}
            >
            <input
                type="radio"
                name="rating"
                value={num}
                checked={value === String(num)}
                onChange={(e) => onChange(e.target.value)}
                className="hidden"
            />
            {num}
            </label>
        ))}
        </div>
  )
}

export default StarRating