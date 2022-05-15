import React from 'react'
import { observable, reaction } from 'mobx';
import { observer } from 'mobx-react'
const data = observable({ value: 0 });
const dispose = reaction(
    () => data.value,
    (cur, prev) => {
        console.log(cur, prev);
        if (cur > 3) {
            dispose();
            alert('不再追踪 data');
        }
    });

export default observer(function Mobx() {
    const onChange = () => {
        data.value++;
    };
    return (
        <button onClick={onChange}>改变 data {data.value}</button>
    )
})
