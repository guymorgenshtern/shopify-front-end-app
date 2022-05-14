import CentreWrapper from "./CentreWrapper";
import Card from "./Card";
import "../Styles/PoemList.scss";

const PoemList = (props) => {
  return (
    <CentreWrapper>
      <div className="response-list">
        <h2>Responses</h2>
        {props.promptList.length === 0 ? (
          <p className="ghost-text">Submit a prompt above!</p>
        ) : (
          props.promptList?.map((prompt) => {
            return (
              <Card
                header={"TODO"}
                body={
                  <>
                    <div className="poem-prompt">{prompt?.userInput}</div>
                    <div className="poem-content">{prompt.openAIResponse}</div>
                  </>
                }
                key={prompt?.userInput + prompt?.openAIResponse}
              ></Card>
            );
          })
        )}
      </div>
    </CentreWrapper>
  );
};

export default PoemList;
