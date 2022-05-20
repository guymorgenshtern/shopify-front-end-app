import { useEffect, useState } from "react";
import ResponseList from "./ResponseList";
import PromptSection from "./PromptSection";
import HelpModal from "./HelpModal";
import "../Styles/Home.scss";

const Home = () => {
  const [responseList, setResponseList] = useState([]);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem("responses")) || [];
    setResponseList(savedPrompts);
  }, []);

  const saveResponses = (userInput, openAIResponse) => {
    const newResponses = [
      { userInput: userInput, openAIResponse: openAIResponse },
      ...responseList,
    ];

    setResponseList(newResponses);
    localStorage.setItem("responses", JSON.stringify(newResponses));
  };

  return (
    <>
      <HelpModal
        visible={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      ></HelpModal>
      <div className={"page-body" + (helpModalOpen ? "-blur" : "")}>
        <PromptSection
          saveResponses={saveResponses}
          onHelp={() => setHelpModalOpen(true)}
        ></PromptSection>
        <ResponseList responseList={responseList || []}></ResponseList>
      </div>
    </>
  );
};

export default Home;
