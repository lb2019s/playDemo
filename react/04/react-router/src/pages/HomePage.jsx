import React from 'react'
import { Redirect } from '../k-react-router-dom'

export default class HomePage extends React.Component {
    render() {
        return <Redirect to="/welcome"></Redirect>
        return (
            <div>
                <h3>Home Page</h3>
            </div>
        )
    }
}