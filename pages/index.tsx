import axios from "axios";
import { FormEvent, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  async function chat(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/chat", { question });

      setAnswers((currState) => [...currState, response.data.text]);

      setQuestion("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <main>
      <section>
        <form onSubmit={chat}>
          <label htmlFor="question">Questions</label>
          <input
            type="text"
            id="question"
            value={question}
            placeholder="Type your question here"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </form>
      </section>

      <section>
        {answers.map((answer, index) => (
          <p key={index}>{answer}</p>
        ))}
      </section>
    </main>
  );
}
