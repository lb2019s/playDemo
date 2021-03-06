import React from 'react'
import { connect } from 'react-redux'

@connect(
    ({ user }) => ({ user })
)
export default class UserPage extends React.Component {
    render() {
        const { user } = this.props
        const { id, name, score } = user.userInfo
        return (
            <div>
                <h3>UserPage</h3>
                <p>id:{id}</p>
                <p>name:{name}</p>
                <p>score:{score}</p>
            </div>
        )
    }
}