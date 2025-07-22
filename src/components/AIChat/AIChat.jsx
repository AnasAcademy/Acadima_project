"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Send from "@/assets/admin/send.svg";
import UserMessage from "@/components/AIChat/UserMSg";
import AiMessage from "@/components/AIChat/AIMsg";

export default function AIChat({
  minHeight = "265px",
  maxHeight = "400px",
  heightClass = "h-80",
  externalMessage,
  setMessage,
}) {
  const t = useTranslations("techSupport");
  const ts = useTranslations("AiAssistant");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


   useEffect(() => {
   
    if (setMessage){
      if(messages.length > 0){

      setMessage(false);

      } else{

          setMessage(true);
      }
    }



   }, [messages]);
  

  useEffect(() => {

    

    if (externalMessage) {
      // Add external user message to chat
      setMessages((prev) => [...prev, { type: "user", text: externalMessage }]);

      // Immediately send it to the API
      const sendExternalMessage = async () => {
        try {
          const response = await fetch("https://ai.lxera.net/query", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: externalMessage }),
          });

          const data = await response.json();

          if (data?.answer) {
            setMessages((prev) => [
              ...prev,
              {
                type: "ai",
                text: data.answer,
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                type: "ai",
                text: ts("generic-response"),
              },
            ]);
          }
        } catch (error) {
          console.error("API error:", error);
          setMessages((prev) => [
            ...prev,
            {
              type: "ai",
              text: ts("generic-response"),
            },
          ]);
        }
      };

      sendExternalMessage();
    }
  }, [externalMessage]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    setMessages((prev) => [...prev, { type: "user", text: userInput }]);
    setInput("");

    try {
      const response = await fetch("https://ai.lxera.net/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await response.json();

      if (data?.answer) {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: data.answer,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: ts("generic-response"),
          },
        ]);
      }
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: ts("generic-response"),
        },
      ]);
    }
  };

  return (
    <div
      className={`d-flex flex-column justify-content-between ${heightClass}`}
    >
      {/* Chat Area */}
      <div
        className="chat-body p-4 d-flex flex-column gap-3 overflow-auto flex-grow-1"
        style={{ maxHeight, minHeight }}
      >
        {messages.map((msg, index) =>
          msg.type === "user" ? (
            <UserMessage key={index} message={msg.text} />
          ) : (
            <AiMessage key={index} message={msg.text} />
          )
        )}
      </div>

      {/* Input */}
      <div className="chat-input p-3 d-flex align-items-center gap-3">
        <div
          className="rounded-pill bg-body-tertiary p-2 cursor-pointer"
          onClick={handleSend}
        >
          <Send width={24} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control rounded-4 border px-3 py-2 bg-body-tertiary"
          placeholder={t("send-placeholder")}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
      </div>
    </div>
  );
}
