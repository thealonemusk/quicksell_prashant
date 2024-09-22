import PropTypes from "prop-types";
import * as icons from "../Assets/Icons";
import "../Styles/DisplayList.css";
import DisplayCard from "./displayCard";


const DisplayList = ({ groupValue, listTitle, priorityList, ticketDetails }) => {
  const getIcon = () => {
    const iconMap = {
      status: {
        Todo: icons.todo,
        Backlog: icons.backlog,
        "In progress": icons.inProgress,
        Done: icons.done,
        Cancelled: icons.cancelled,
      },
      priority: {
        0: icons.noPriority,
        1: icons.lowPriority,
        2: icons.mediumPriority,
        3: icons.highPriority,
        4: icons.UrgentPriorityColour,
      },
    };

    return iconMap[groupValue]?.[listTitle] || null;
  };

  const getTitle = () => {
    if (groupValue === "priority") {
      return priorityList?.find(p => p.priority === Number(listTitle))?.name || listTitle;
    }
    return listTitle;
  };

  const filteredTickets = ticketDetails.filter(ticket => {
    if (groupValue === "status") return ticket.status === listTitle;
    if (groupValue === "priority") return ticket.priority === Number(listTitle);
    if (groupValue === "user") return ticket.userObj.name === listTitle;
    return false;
  });

  // console.log(filteredTickets);
  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          {getIcon() && <img src={getIcon()} alt={getTitle()} className="list-icon" />}
          <h2 className="list-title">{getTitle()}</h2>
          <span className="list-count">{filteredTickets.length}</span>
        </div>
        <div className="list-header-right">
          <button className="list-add-item">
            <img src={icons.add} alt="Add" />
          </button>
          <button className="list-option-item">
            <img src={icons.dotMenu} alt="Options" />
          </button>
        </div>
      </div>
      <div className="list-card-items">
        {filteredTickets.map(ticket => (
          <DisplayCard key={ticket.id} cardDetails={ticket} />
        ))}
      </div>
    </div>
  );
};

DisplayList.propTypes = {
  groupValue: PropTypes.oneOf(["status", "user", "priority"]).isRequired,
  listTitle: PropTypes.string.isRequired,
  priorityList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  })),
  ticketDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DisplayList;