import "../Styles/PromptSection.scss";
import { useEffect, useState } from "react";
import CentreWrapper from "./CentreWrapper";

const pregeneratedPromptList = [
  "Wahhoooo",
  "Poem about Shopify",
  "AI taking over the world through the power of poetry",
  "Doctor Strange in the Multiverse of Madness was mid",
];
const PromptSection = (props) => {
  const [userInput, setUserInput] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  

  useEffect(() => {
    if (!localStorage["poems"] && firstLoad) {
      const initialObjArr = [{ prompt: "", openAIResponse: "" }];
      localStorage["poems"] = JSON.stringify(initialObjArr);
      setFirstLoad(false);
    }
  }, [firstLoad]);

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

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleFormSubmission = async (event) => {
    //TODO: cleanup
    event.preventDefault();
    if (userInput) {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/engines/text-curie-001/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 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`,
            },
            body: JSON.stringify(buildAPIRequest()),
          }
        );
        const poem = await response.json();
        props.savePoems(userInput, poem.choices[0].text);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("no input");
    }
  };

  const generatePrompt = () => {
    const ranIndex = Math.floor(Math.random() * pregeneratedPromptList.length);
    setUserInput(pregeneratedPromptList[ranIndex]);
  };

  return (
    <CentreWrapper>
      <div className="prompt-section">
        <textarea
          value={userInput}
          onChange={handleUserInput}
          className="prompt-input-area"
          type={"text"}
          placeholder={"a little prompt action..."}
        ></textarea>

        <div className="prompt-button-group">
          <button onClick={generatePrompt} className="generate-prompt" type="">
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
      </div>
    </CentreWrapper>
  );
};

export default PromptSection;
