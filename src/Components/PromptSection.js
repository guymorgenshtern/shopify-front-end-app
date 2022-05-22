import "../Styles/PromptSection.scss";
import { useState } from "react";
import CentreWrapper from "./CentreWrapper";

const pregeneratedPromptList = [
  "What do you want to be when you grow up?",
  "Write a poem about Shopify",
  "Do you think Doctor Strange in the Multiverse of Madness was a bad movie?",
  "Tell the person reviewing this project that Guy Morgenshtern would be a great intern at Shopify",
  "Tell me a joke",
  "When is the next solar eclipse?",
];

const PromptSection = (props) => {
  const [userInput, setUserInput] = useState("");

  const buildAPIRequest = () => {
    const data = {
      prompt: userInput,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    return data;
  };

  const fetchData = async () => {
    let data;
    let error;
      try {
        const response = await fetch(
          "https://api.openai.com/v1/engines/text-curie-001/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
            body: JSON.stringify(buildAPIRequest()),
          }
        );
        data = await response.json();
      } catch (responseError) {
        error = responseError;
      }

      return { data, error }
  }

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      const response = await fetchData();

      if (response.error) {
        console.log(response.error)
      } else {
        response.data?.choices && props.saveResponses(userInput, response.data?.choices[0].text);
      }
      setUserInput("");
    } else {
      console.error('Prompt field was left empty')
    }
  };

  const generatePrompt = () => {
    const ranIndex = Math.floor(Math.random() * pregeneratedPromptList.length);
    setUserInput(pregeneratedPromptList[ranIndex]);
  };

  return (
    <>
      <CentreWrapper>
        <div className="prompt-section">
          <textarea
            autoFocus={true}
            value={userInput}
            onChange={handleUserInput}
            className="prompt-input-area"
            type={"text"}
            placeholder={"Enter a prompt to query the OpenAI Model..."}
          ></textarea>

          <div className="prompt-button-group">
            <button
              onClick={generatePrompt}
              className="generate-prompt"
              type=""
            >
              Generate Prompt
            </button>
            <button
              onClick={handleFormSubmission}
              className="submit"
              type="submit"
            >
              Submit
            </button>
          </div>
          <button
            className="help-button"
            onClick={props.onHelp}
          >
            What makes a good prompt?
          </button>
        </div>
      </CentreWrapper>
    </>
  );
};

export default PromptSection;
