'use client'
import { useRef, useState } from "react";
import Button from "../ui/Button";
import CloseIcon from "../ui/icons/CloseIcon"
import SendIcon from "../ui/icons/SendIcon";
import { AIAvatarIcon } from "../ui/icons/AIAvatarIcon";
import { UserAvatarIcon } from "../ui/icons/UserAvatarIcon";
import StopIcon from "../ui/icons/StopIcon";

type MessageType = {
  role: 'user' | 'assistant',
  text: string
}
type ChatType = {
  isOpen: boolean,
  onClose: () => void
}
const Chat = ({ isOpen, onClose }: ChatType) => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [inputVal, setInputVal] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const abortRef = useRef<AbortController | null>(null);

  // ===== ai request (stream) =====
  const askAI = async (messageText: string) => {
    // створюємо контролер і передаємо signal у fetch
    const controller = new AbortController();
    abortRef.current = controller;

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: messageText }),
      signal: controller.signal,
    });

    if (!res.ok) {
      let errorMsg = "Request failed";

      try {
        const json = await res.json();
        if (json?.error) errorMsg = json.error;
      } catch { }

      setMessages(prev => {
        const copy = [...prev];
        const last = copy[copy.length - 1];

        if (last?.role === "assistant") {
          // замінюємо порожній ассистент на помилку
          copy[copy.length - 1] = {
            ...last,
            text: `⚠️ ${errorMsg}`,
          };
        } else {
          // запасний варіант, якщо раптом немає assistant
          copy.push({ role: "assistant", text: `⚠️ ${errorMsg}` });
        }

        return copy;
      });

      return; // DO NOT start streaming
    }

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;

        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role === 'assistant') {
            copy[copy.length - 1] = { ...last, text: acc };
          }
          return copy;
        });
      }

      const rest = decoder.decode();
      if (rest) {
        const finalText = acc + rest;
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role === 'assistant') {
            copy[copy.length - 1] = { ...last, text: finalText };
          }
          return copy;
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      if (err?.name !== 'AbortError') {
        console.error("AI stream error:", err);
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last?.role === 'assistant') {
            copy[copy.length - 1] = { ...last, text: last.text || '⚠️ Помилка отримання відповіді.' };
          }
          return copy;
        });
      }
    } finally {
      try { reader.releaseLock(); } catch { }
      abortRef.current = null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInputVal(e.target.value);

  if (!isOpen) return null;

  const sendMessage = async () => {
    if (isLoading) return; // захист від повторних відправлень

    const messageText = inputVal.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInputVal('');
    setLoading(true);

    // порожній assistant-бабл, який наповнюємо chunk'ами
    setMessages(prev => [...prev, { role: "assistant", text: "" }]);

    try {
      await askAI(messageText);
    } catch {
      // оброблено всередині askAI
    } finally {
      setLoading(false);
    }
  };

  // 👇 кнопка STOP
  const stopStreaming = () => {
    if (abortRef.current) {
      abortRef.current.abort();      // перериваємо fetch/стрім
      abortRef.current = null;
      setLoading(false);
      // (не обовʼязково) Позначити, що відповідь урвана:
      setMessages(prev => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === 'assistant' && last.text === '') {
          copy[copy.length - 1] = { ...last, text: '(stopped)' };
        }
        return copy;
      });
    }
  };
  console.log('messages: ', messages);

  return (
    <div className="absolute bottom-10 left-10 w-1/2 h-3/5 z-50 border border-border rounded-2xl flex flex-col bg-bg-secondary/95">
      <header className="flex justify-between items-center py-2 px-5 border border-border bg-amber-950/55 rounded-t-2xl">
        <p className="text-text-main font-semibold text-xl">Fitness AI assistant</p>
        <div className="flex gap-2">
          <Button variant='icon' onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
      </header>

      {/* messages */}
      <div className="flex-1 flex-col min-h-0 overflow-y-auto justify-end gap-3 p-3">
        {messages.map((message, i) => {
          const isAssistant = message.role === 'assistant';
          const isPendingAssistant = isAssistant && message.text === '' && isLoading;

          return (
            <div key={i} className={`flex ${message.role === 'user' ? 'flex-row-reverse' : ''} text-text-main items-start`}>

              {isAssistant ? (
                <AIAvatarIcon size={26} strokeWidth={1} className="text-text-light mr-2 flex-shrink-0 self-start" />
              ) : (
                <UserAvatarIcon size={26} strokeWidth={1} className="text-text-light ml-2 flex-shrink-0 self-start" />
              )}
              <span>
                {isPendingAssistant ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
                  </span>
                ) : (
                  message.text
                )}
              </span>

            </div>
          );
        })}
      </div>

      <div className="mt-auto w-full min-h-fit py-2 flex flex-row justify-between items-center border-t border-t-amber-400 bottom-0">
        <textarea
          value={inputVal}
          onChange={handleChange}
          className="w-full min-h-2 outline-none resize-none px-4 py-2 text-text-main leading-tight"
          placeholder="Ask something your assistant..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <div className="flex gap-2">
          {isLoading ?
            <Button variant="submit" onClick={stopStreaming}>
              <StopIcon />
            </Button>
            :
            <Button disabled={!inputVal.trim() || isLoading} variant="submit" onClick={sendMessage}>
              <SendIcon />
            </Button>}
        </div>
      </div>
    </div>
  );
};

export default Chat;