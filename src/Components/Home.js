import { useEffect, useState } from "react";
import ResponseList from "./ResponseList";
import PromptSection from "./PromptSection";

const Home = () => {

  const [promptList, setPromptList] = useState([])

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem("prompts")) || [];
    setPromptList(savedPrompts);
  }, []);

  const savePoems = (userInput, poem) => {
    const newPoems = [
      { userInput: userInput, openAIResponse: poem },
      ...promptList
    ];
  
    setPromptList(newPoems);
    localStorage.setItem("prompts", JSON.stringify(newPoems));
  };

  return (
    <>
      <PromptSection savePoems={savePoems}></PromptSection>
      <ResponseList promptList={promptList || []}></ResponseList>
    </>
  );
};

export default Home;
