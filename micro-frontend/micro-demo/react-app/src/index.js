import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root
const render = ({ container }) => {
  root = ReactDOM.createRoot(container.querySelector('#root') || document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {
  console.log('[react18] react app bootstraped');
}

export async function mount(props) {
  console.log('[react18] props from main framework mount');
  render(props);
}

export async function unmount(props) {
  console.log('[react18] react app unmount');
  root.unmount()
}