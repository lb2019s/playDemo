// import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useHistory, useParams, useLocation } from 'react-router-dom'
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useLocation, useParams, useRouteMatch, withRouter, Prompt } from './k-react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import _404Page from './pages/_404Page'

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>
        <Link to="/prompt">Prompt</Link>

        <Switch>
          <Route exact path="/"
            // children={() => <Children></Children>} 
            component={HomePage}
            render={() => <Render></Render>}
          >
          </Route>
          <Route path="/login" component={LoginPage}></Route>
          {/* <Route path="/product/:id" component={Product}></Route> */}
          <Route path="/product/:id" render={() => <Product />}></Route>
          <Route path="/prompt" render={() => <PromptWrap />}></Route>
          <Route component={_404Page}></Route>
        </Switch>
      </Router>
    </div>
  );
}

function Children() {
  return (
    <div>
      Children
    </div>
  )
}

function Render() {
  return (
    <div>render</div>
  )
}

// function Product(props) {
//   console.log('props', props);
//   // const { match } = props
//   const match = useRouteMatch()
//   const history = useHistory()
//   const location = useLocation()
//   const _params = useParams()
//   console.log('match', match)
//   console.log('history', history)
//   console.log('location', location)
//   console.log('_params', _params)
//   const { params, url } = match
//   const { id } = params
//   return (
//     <div>
//       <h4>Product {id}</h4>
//       <Link to={url + '/detail'}>详情</Link>
//       <Route path={url + '/detail'} component={Detail}></Route>
//     </div>

//   )
// }

@withRouter
class Product extends React.Component {
  render() {
    console.log('this.props', this.props)
    const { match } = this.props
    const { params, url } = match
    const { id } = params
    return (
      <div>
        <h4>Product {id}</h4>
        <Link to={url + '/detail'}>详情</Link>
        <Route path={url + '/detail'} component={Detail}></Route>
      </div>

    )
  }
}

function PromptWrap() {
  const [confirm, setConfirm] = useState(true)
  return (
    <div>
      <h3>Prompt</h3>
      <button onClick={() => setConfirm(false)}>change </button>
      <Link to="/">go home</Link>
      <Prompt when={confirm} message="确定要离开吗？"></Prompt>
    </div>
  )
}

function Detail() {
  return (
    <div>detail</div>
  )
}

export default App;
