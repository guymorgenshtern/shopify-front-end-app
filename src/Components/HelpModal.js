import Modal from "./Modal";

const HelpModal = (props) => {
  return (
    <Modal
      {...props}
      header={<h2>What makes a good prompt?</h2>}
      body={
        <>
          {" "}
          <p>
            The model can provide a response for a number of different things. A
            few examples are:
          </p>
          <ul>
            <li>Factual responses to objective questions</li>
            <li>Poems</li>
            <li>Jokes</li>
          </ul>
          <p>
            Ensure your prompt is clear through instructions and/or examples!{" "}
            <a
              href={
                "https://beta.openai.com/docs/guides/completion/prompt-design"
              }
            >
              Click here
            </a>{" "}
            for more info
          </p>
        </>
      }
    ></Modal>
  );
};

export default HelpModal;
