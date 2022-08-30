import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import _404Page from '../pages/_404Page'

// export default function Routes() {
//     return (
//         <Router>
//             <Link to="/">Home</Link>
//             <Link to="/user">用户中心</Link>
//             <Link to="/login">登录</Link>

//             <Switch>
//                 <Route exact path="/" component={HomePage}></Route>
//                 {/* <Route path="/user" component={UserPage}></Route> */}
//                 <PrivateRoute path="/user" component={UserPage}></PrivateRoute>
//                 <Route path="/login" component={LoginPage}></Route>
//                 <Route component={_404Page}></Route>
//             </Switch>
//         </Router>
//     )
// }

export const routes = [
    {
        path: "/",
        exact: true,
        component: HomePage
    },
    {
        path: "/user",
        component: UserPage,
        auth: PrivateRoute
    },
    {
        path: "/login",
        component: LoginPage
    },
    {
        component: _404Page
    }
];

export default function Routes(props) {
    return (
        <Router>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Link to="/login">登录</Link>

            <Switch>
                {routes.map(Route_ =>
                    Route_.auth ? (
                        <Route_.auth key={Route_.path + "route"} {...Route_} />
                    ) : (
                        <Route key={Route_.path + "route"} {...Route_} />
                    )
                )}
            </Switch>
        </Router>
    );
}