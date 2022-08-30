// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import React from './kreact/index'
import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/component"
import './index.css'

class ClassComponent extends Component {
  static defaultProps = {
    color: 'pink'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{ color: this.props.color }}>class 组件</div>
    )
  }
}

function FunctionComponent(props) {
  return (
    <div>函数组件: {props.name}</div>
  )
}

const jsx = (
  <div>
    <h3>哇哈哈</h3>
    <a href="http://www.baidu.com">百度一下</a>
    <ClassComponent className="border" color="red">
      <FunctionComponent className="border" name="function"></FunctionComponent>
    </ClassComponent>
    {[1, 2].map(item => <div>item</div>)}
    <>
      <h3>张三</h3>
      <h3>张三</h3>
    </>
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'));
