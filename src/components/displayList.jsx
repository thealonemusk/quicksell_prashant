import { getIconForStatus, getPriorityIcon } from "../utils/helpers"; // Assuming we have these helper functions
import "../styles/DisplayList.css";
import DisplayCard from "./displayCard";
const DisplayList = (title, groupBy, items, priorities) => {
  const filteredItems = items.filter((item) => {
    if (groupBy === "status") return item.status === title;
    if (groupBy === "priority") return item.priority.toString() === title;
    if (groupBy === "user") return item.user.name === title;
    return false;
  });

  const getListIcon = () => {
    if (groupBy === "status") return getIconForStatus(title);
    if (groupBy === "priority") return getPriorityIcon(title);
    return null;
  };

  const getListTitle = () => {
    if (groupBy === "priority") {
      const priorityItem = priorities.find((p) => p.level.toString() === title);
      return priorityItem ? priorityItem.name : title;
    }
    return title;
  };

  return (
    <div className="list">
      <div className="list-header">
        <div className="list-header-left">
          {getListIcon() && (
            <img src={getListIcon()} alt={title} className="list-icon" />
          )}
          <h3 className="list-title">{getListTitle()}</h3>
          <span className="list-count">{filteredItems.length}</span>
        </div>
        <div className="list-header-right">
          <button className="add-item">+</button>
          <button className="list-options">⋮</button>
        </div>
      </div>
      <div className="list-items">
        {filteredItems.map((item) => (
          <DisplayCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DisplayList;
