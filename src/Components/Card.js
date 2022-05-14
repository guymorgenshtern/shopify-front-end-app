import "../Styles/Card.scss";
//TODO: make more generic -> Card component with Header, Body, Footer
const Card = (props) => {
  return (
    <div className="card">
      <div className="card-title">
        <h3>{props.header}</h3>
      </div>
      <div  className="card-body">{props.body}</div>
      {props.footer && <div className="card-footer">{props.footer}</div>}
    </div>
  );
};

export default Card;
