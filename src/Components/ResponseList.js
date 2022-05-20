import CentreWrapper from "./CentreWrapper";
import Card from "./Card";
import "../Styles/ResponseList.scss";

const ResponseList = (props) => {
  return (
    <CentreWrapper>
      <div className="response-list">
        <h2>Responses</h2>
        {props.responseList.length === 0 ? (
          <p className="ghost-text">Submit a prompt above!</p>
        ) : (
          props.responseList?.map((response) => {
            return (
              <Card
                body={
                  <>
                    <div className="response-prompt">
                      {response?.userInput}
                    </div>
                    <div className="response-content">
                      {response?.openAIResponse}
                    </div>
                  </>
                }
                key={response?.userInput + response?.openAIResponse}
              ></Card>
            );
          })
        )}
      </div>
    </CentreWrapper>
  );
};

export default ResponseList;
