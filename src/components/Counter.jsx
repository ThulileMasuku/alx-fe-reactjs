import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        border: "2px solid #333",
        borderRadius: "8px",
        padding: "20px",
        margin: "20px auto",
        width: "250px",
        textAlign: "center",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h2 style={{ color: "navy" }}>Counter App</h2>
      <p style={{ fontSize: "18px", margin: "10px 0" }}>
        Current Count: <span style={{ fontWeight: "bold" }}>{count}</span>
      </p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
