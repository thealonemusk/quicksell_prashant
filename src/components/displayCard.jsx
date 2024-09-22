import PropTypes from "prop-types";
import * as icons from "../Assets/Icons";
import "../Styles/DisplayCard.css"

const PRIORITY_ICONS = {
  0: icons.noPriority,
  1: icons.lowPriority,
  2: icons.mediumPriority,
  3: icons.highPriority,
  4: icons.UrgentPriorityColour,
};

const STATUS_ICONS = {
  "In progress": icons.inProgress,
  Done: icons.done,
  Cancelled: icons.cancelled,
  Todo: icons.todo,
  Backlog: icons.backlog,
};

const DisplayCard = ({ cardDetails }) => {
  const { id, userObj, title, status, priority, tag } = cardDetails;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <div className="card-user-avatar">
          {userObj.name.slice(0, 2)}
          <span className={`user-status ${userObj.available ? 'available' : 'unavailable'}`}></span>
        </div>
      </div>
      <h3 className="card-title">
        {STATUS_ICONS[status] && <img src={STATUS_ICONS[status]} alt={status} className="card-status-icon" />}
        {title}
      </h3>
      <div className="card-footer">
        {PRIORITY_ICONS[priority] && (
          <img src={PRIORITY_ICONS[priority]} alt={`Priority ${priority}`} className="card-priority-icon" />
        )}
        {tag.map((t, index) => (
          <span key={index} className="card-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

DisplayCard.propTypes = {
  cardDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userObj: PropTypes.shape({
      name: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    tag: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DisplayCard;