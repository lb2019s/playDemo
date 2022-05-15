import React from 'react'
import { ThemeProvider, UserProvider } from '../Context'
import ConsumerPage from './ConsumerPage'
import UserPage from './UserPage'

export default class ContextPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: {
                themeColor: 'red'
            },
            user: {
                name: 'lisi'
            }
        }
    }
    render() {
        const { theme, user } = this.state
        return (
            <div>
                <h3>ContextPage</h3>
                <ThemeProvider value={theme}>
                    <UserProvider value={user}>
                        <ConsumerPage></ConsumerPage>
                    </UserProvider>
                </ThemeProvider>
                <UserPage></UserPage>
            </div>
        )
    }
}