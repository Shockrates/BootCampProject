import { Link, useSearchParams } from "react-router-dom"

const GENRES = [
  "action",
  "animation",
  "drama",
  "romance",
  "comedy",
  "thriller",
  "adventure",
  "crime"
]

export default function FilterBar() {
  const [params] = useSearchParams()
  const current = params.get("genre") // <--- THIS is where current comes from

  return (
    <nav className="flex justify-center gap-3 overflow-x-auto py-3 px-2 border-b border-neutral-800 no-scrollbar">
      {GENRES.map(g => (
        <Link
          key={g}
          to={`?genre=${g}`}
          relative="path"
          className={`capitalize px-3 py-1 rounded-2xl text-sm whitespace-nowrap 
            ${current === g ? "bg-white text-black font-semibold" : "bg-neutral-800 hover:bg-neutral-700"}
          `}
            >
          {g}
        </Link>
      ))}
    </nav>
  )
}
