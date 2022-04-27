import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let root = ReactDOM.createRoot(document.getElementById('root'));
const render = ({ container }) => {
  root = ReactDOM.createRoot(container || document.getElementById('root'));
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
  console.log('[react18] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  root.unmount()
}