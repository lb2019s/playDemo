import React, { useContext } from 'react'
import { UserContext } from '../Context'
export default function UserPage(props) {
    const context = useContext(UserContext)
    return (
        <div>
            <h3>UserPage</h3>
            <p>{context.name}</p>
        </div>
    )
}