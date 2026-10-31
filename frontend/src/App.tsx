
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

function App() {
    const [message, setMessage] = useState<string>("");
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        socket.on("backend-message", (backendMessage) => {
            setHistory((prev) => [...prev, backendMessage]);
        });

        return () => {
            socket.off("backend-message");
        };
    }, []);

    useEffect(() => {
        console.log(history);
    }, [history]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
    }

    function handleSend() {
        if (!message.trim()) return;

        socket.emit("user-message", message);
        setMessage("");
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-black m-4">
                Chat Application
            </h1>

            <input
                className="border-2 border-black rounded-lg p-1 m-4 mr-1"
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={handleInputChange}
            />

            <button
                className="border-2 border-black rounded-lg p-1 m-4 ml-1"
                onClick={handleSend}
            >
                Send
            </button>

            <div>
                {history.map((m, index) => (
                    <div key={index}>
                        <p>{m}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
