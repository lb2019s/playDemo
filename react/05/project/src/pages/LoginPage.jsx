import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../actions/user'

export default connect(
    ({ user }) => ({ isLogin: user.isLogin, loading: user.loading, err: user.err }),
    {
        login
    }
)(class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }
    handleChange = event => {
        const name = event.target.value
        this.setState({
            name
        })
    }
    render() {
        const { isLogin, location, login, loading, err } = this.props
        const { name } = this.state
        if (isLogin) {
            const { from = "/" } = location.state || {}
            return <Redirect to={from}></Redirect>
        }
        return (
            <div>
                <h3>Login Page</h3>
                <input type="text" value={name} onChange={this.handleChange} />
                <p className='red'>{err.msg}</p>
                <button onClick={() => login({ name })}>{loading ? 'loading...' : 'click'}</button>
            </div>
        )
    }
})