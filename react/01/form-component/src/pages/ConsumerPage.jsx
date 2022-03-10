import React from 'react'
import { ThemeConsumer, UserConsumer } from '../Context'

export default class ConsumerPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h3>ConsumerPage</h3>
                <ThemeConsumer>
                    {themeContext => <div className={themeContext.themeColor}>consumer
                        <UserConsumer>
                            {userContext => <div>{userContext.name}</div>}
                        </UserConsumer>
                    </div>}
                </ThemeConsumer>
            </div>
        )
    }
}