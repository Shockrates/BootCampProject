import React from 'react'
import MoviesTable from './MoviesTable'

/**
 * Dashboard component.
 * - Serves as the main landing page for authenticated users.
 * - Currently renders the MoviesTable component to display a list of movies.
 * - Will later include additional components such as search, filters, or stats.
 */

export default function Dashboard() {
    return (
        <div>
            <h1>Movies Dashboard</h1>
            <MoviesTable />
        </div>
    )
}