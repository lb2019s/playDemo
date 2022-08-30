// import React, { Component, useState } from 'react';
// import ReactDOM from 'react-dom';
import React from './kreact/index'
import ReactDOM, { useState } from "./kreact/react-dom";
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
    const { color, children } = this.props
    return (
      <div style={{ color: color }}>
        <p>class 组件</p>
        {children}
      </div>
    )
  }
}

function FunctionComponent(props) {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div>函数组件: {props.name}</div>
      <button onClick={() => setCount(count + 1)}> {count} </button>
      {count % 2 ? <button>click</button> : null}
    </div>
  )
}

const jsx = (
  <div>
    <FunctionComponent className="border" name="function"></FunctionComponent>
    {/* <template>
      <h3>张三</h3>
      <h3>张三</h3>
    </template>
    <ClassComponent className="border" color="red">
      <FunctionComponent className="border" name="function"></FunctionComponent>
    </ClassComponent>
    <h3>哇哈哈</h3>
    <a href="http://www.baidu.com">百度一下</a>
    {[1, 2].map(item => <div>item</div>)}
    <>
      <h4>王五</h4>
    </> */}
  </div >
)

ReactDOM.render(jsx, document.getElementById('root'));
