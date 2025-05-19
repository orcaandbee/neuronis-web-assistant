
import { useState } from "react";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Здравствуйте. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col font-sans relative">
      <div className="p-4 text-2xl font-bold tracking-widest">NEURONIS</div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 bg-black/70 p-4 flex flex-col">
          <div className="flex gap-2 mb-4">
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">Новый чат</button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">История чатов</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-black/50 rounded">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={\`p-3 rounded \${msg.from === "ai" ? "bg-gray-900" : "bg-gray-800 self-end"}\`}
              >
                [{msg.from === "ai" ? "Ассистент" : "Вы"}]: {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              className="flex-1 p-2 rounded-l bg-gray-800 border-none focus:outline-none"
              placeholder="Введите сообщение…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-blue-700 px-4 rounded-r" onClick={sendMessage}>Отправить</button>
          </div>
        </div>
        <div className="w-1/2 bg-black/80 p-4 flex flex-col relative">
          <p className="text-sm text-gray-400 mb-2">Разговор с ассистентом</p>
          <div className="flex-1 bg-gray-900 rounded p-4 mb-4">
            <div dangerouslySetInnerHTML={{
              __html: `<elevenlabs-convai agent-id="agent_01jvb09p78e25v1q7m16sjykqn" webhook-url="https://primary-production-4f72e.up.railway.app/webhook-test/a33ad234-1d69-488f-9617-3237b9422c6f"></elevenlabs-convai>`
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
