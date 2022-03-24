import React from 'react';
import styles from './layout.css';

export default function Page(props) {
  return (
    <div>
      <h1 className={styles.title}>Page product/layout</h1>
      {props.children}
    </div>
  );
}
