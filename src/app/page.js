"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState("")
  const [messages, setMessages] = useState([''])

  const submitForm = (e) => {
    e.preventDefault();
    setMessage(data)
    setMessage("")
    setData("")
  }

  useEffect(() => {
    const fetched = async () => {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ role: "user", content: message }),
        headers: { "Content-Type": "application/json" },
      });
      const { message: dat } = (await response.json())
      if(dat) setMessages((prev) => [{...prev, ...dat}])
    };
    fetched();
  }, [message]);
  return (
    <div style={{ backgroundColor: "red", height: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center", height: 100 }}>
        <form onSubmit={submitForm} id="form-data">
          <input
            form="form-data"
            placeholder="hello world"
            onChange={(e) => setData(e.target.value)}
          ></input>
        </form>
        <div>{messages.map(k => k)}</div>
      </div>
    </div>
  );
}
