import { useEffect, useState } from "react";
import ResponseList from "./ResponseList";
import PromptSection from "./PromptSection";
import HelpModal from "./HelpModal";
import "../Styles/Home.scss";

const Home = () => {
  const [promptList, setPromptList] = useState([]);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem("prompts")) || [];
    setPromptList(savedPrompts);
  }, []);

  const savePoems = (userInput, poem) => {
    const newPoems = [
      { userInput: userInput, openAIResponse: poem },
      ...promptList,
    ];

    setPromptList(newPoems);
    localStorage.setItem("prompts", JSON.stringify(newPoems));
  };

  return (
    <>
      <HelpModal
        visible={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      ></HelpModal>
      <div className={"page-body" + (helpModalOpen ? "-blur" : "")}>
        <PromptSection
          savePoems={savePoems}
          onHelp={() => setHelpModalOpen(true)}
        ></PromptSection>
        <ResponseList promptList={promptList || []}></ResponseList>
      </div>
    </>
  );
};

export default Home;
