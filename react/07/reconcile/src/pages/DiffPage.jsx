import React from "../kreact";
import { useState } from "../kreact/react-dom";

// old 1 3 2 5
// new 0 1 2 3 4

// 新增 0 4
// 复用 1 2 3
// 移动 3
export default function DiffPage() {
    const [count, setCount] = useState(0);

    return (
        <div className="border">
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                {count}
            </button>
            {count % 2 === 0
                ?
                <ul>
                    <li key="0">0</li>
                    <li key="2">2</li>
                    <li key="3">3</li>
                    <li key="4">4</li>
                </ul>
                :
                <ul>
                    <li key="0">0</li>
                    <li key="1">1</li>
                    <li key="2">2</li>
                    <li key="3">3</li>
                    <li key="4">4</li>
                </ul>
            }
        </div>
    );
}
