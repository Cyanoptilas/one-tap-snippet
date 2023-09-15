import { useState } from "react";

export const useMail = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const send = async () => {
    // Validation
    if (!name || !address || !message) {
      return { success: false, error: "All fields are required." };
    }

    // Email address validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(address)) {
      return { success: false, error: "Invalid email format." };
    }

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        body: `
名前
${name}

アドレス
${address}

お問い合わせ内容
${message}
`,
      });

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
        };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          "There was a problem with the fetch operation: " + error.message
        );
      } else {
        console.error(
          "There was a problem with the fetch operation: " + String(error)
        );
      }
      return { success: false, error: "Failed to send email." };
    }

    return { success: true };
  };

  return {
    setName,
    setAddress,
    setMessage,
    send,
  };
};
