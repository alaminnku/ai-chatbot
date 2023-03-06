import axios from "axios";
import Image from "next/image";
import { TbSend } from "react-icons/tb";
import { FaRobot } from "react-icons/fa";
import styles from "@/styles/Bot.module.css";
import { FormEvent, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Bot() {
  // Hooks
  const [question, setQuestion] = useState("");
  const [showChatForm, setShowChatForm] = useState(false);
  const [conversations, setConversations] = useState<
    { type: string; content: string }[]
  >([
    {
      type: "answer",
      content: "Hi 👋, what would you like to know about Johnny Depp?",
    },
  ]);

  // Scroll to top
  useEffect(() => {
    // Get the conversation box
    const conversationBox = document.getElementById("conversations");

    // Scroll heigh amount to the top
    if (conversationBox) {
      conversationBox.scrollTop = conversationBox.scrollHeight;
    }
  }, [conversations]);

  // Chat
  async function chat(e: FormEvent) {
    e.preventDefault();

    try {
      // Update states
      setQuestion("");
      setConversations((currState) => [
        ...currState,
        { type: "question", content: question },
      ]);

      // Make request to the backend
      const response = await axios.post("/api/chat", { question });

      // Update state
      setConversations((currState) => [
        ...currState,
        { type: "answer", content: response.data.text },
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!showChatForm && (
        <div className={styles.bot}>
          <FaRobot onClick={() => setShowChatForm(true)} />
        </div>
      )}

      {showChatForm && (
        <div className={styles.chat_form}>
          <div className={styles.chat_form_top}>
            <div className={styles.agent_details}>
              <Image
                src="/chat-agent.jpg"
                width={400}
                height={400}
                alt="Chat agent image"
              />

              <div>
                <p>Chat with</p>
                <p>John Doe</p>
              </div>
            </div>

            <MdKeyboardArrowDown />
          </div>

          <div className={styles.conversations} id="conversations">
            {conversations.map((conversation, index) => (
              <p
                className={
                  conversation.type === "answer"
                    ? styles.answer
                    : styles.question
                }
                key={index}
              >
                {conversation.content}
              </p>
            ))}
          </div>

          <form onSubmit={chat}>
            <input
              type="text"
              id="question"
              value={question}
              placeholder="Type your question here"
              onChange={(e) => setQuestion(e.target.value)}
            />

            <button disabled={!question} onClick={chat}>
              <TbSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
