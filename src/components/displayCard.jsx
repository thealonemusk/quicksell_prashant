import * as icons from "../assets/assetExport";
import '../styles/DisplayCard.css';

const DisplayCard = (cardDetails) => {
  const getIconForStatus = (status) => {
    switch (status) {
      case "In progress":
        return icons.inProgress;
      case "Done":
        return icons.done;
      case "Cancelled":
        return icons.cancelled;
      case "Todo":
        return icons.todo;
      case "Backlog":
        return icons.backlog;
      default:
        return null;
    }
  };

  return (
    <div className="card__container">
      <div className="cardID__wrapper">
        <div className="cardID">{cardDetails.id}</div>
        <div className="card__profile">
          <div className="card__profile-initial">
            {cardDetails.userObj.name.slice(0, 2)}
          </div>
          <div
            className={
              cardDetails.userObj.available
                ? "card__profile-available card__profile__available-true"
                : "card__profile-available"
            }
          ></div>
        </div>
      </div>
      <div className="card__heading">
        <div className="card__icon">
          <img
            src={getIconForStatus(cardDetails.status)}
            style={{ width: "1.5em" }}
            alt="status icon"
          />
        </div>
        <div className="card__title">{cardDetails.title}</div>
      </div>
      
      <div className="card__tag">
        {/* Priority icon */}
        <div className="card__tag-icon">
          <img
            src={icons[['noPriority', 'lowPriority', 'mediumPriority', 'highPriority', 'urgentPriorityGrey'][cardDetails.priority]]}
            style={{ width: "1.5em" }}
            alt={`priority-${cardDetails.priority}`}
          />
        </div>
        
        {/* Tags */}
        {cardDetails.tag.map((tag) => (
          <div key={tag} className="card__tag-box">
            <div className="card__tag-title">{tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCard;