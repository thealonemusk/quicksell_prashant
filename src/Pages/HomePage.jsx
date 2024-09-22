import  { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DisplayList from "../Components/DisplayList/DisplayList";
import Header from "../Components/Header/Header";
import "../Styles/Kanban.css"

const PRIORITY_NAMES = {
  0: "No priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent"
};

const STATUS_LIST = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

const KanbanBoard = () => {
  const [users, setUsers] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [groupValue, setGroupValue] = useState(() => 
    JSON.parse(localStorage.getItem("groupValue")) || "status"
  );
  const [orderValue, setOrderValue] = useState("title");
  const [ticketDetails, setTicketDetails] = useState([]);

  const orderDataByValue = useCallback((tickets) => {
    const sortedTickets = [...tickets].sort((a, b) => {
      if (orderValue === "priority") return b.priority - a.priority;
      return a.title.localeCompare(b.title);
    });
    setTicketDetails(sortedTickets);
  }, [orderValue]);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      processData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [groupValue, orderDataByValue]);

  useEffect(() => {
    localStorage.setItem("groupValue", JSON.stringify(groupValue));
    fetchData();
  }, [groupValue, orderDataByValue, fetchData]);

  const processData = (data) => {
    setUsers(data.users.map(user => user.name));

    const uniquePriorities = [...new Set(data.tickets.map(ticket => ticket.priority))];
    const sortedPriorities = uniquePriorities.sort((a, b) => b - a)
      .map(priority => ({ name: PRIORITY_NAMES[priority], priority }));
    setPriorityList(sortedPriorities);

    const MapedUsers = new Map(data.users.map(user => [user.id, user]));
    const processTicket = data.tickets.map(ticket => ({
      ...ticket,
      userObj: MapedUsers.get(ticket.userId),
    }));
    // console.log(processTicket);
    orderDataByValue(processTicket);
  };

  return (
    <>
      <Header
        groupValue={groupValue}
        orderValue={orderValue}
        onGroupValueChange={setGroupValue}
        onOrderValueChange={setOrderValue}
      />
      <section className="details-board">
        <div className="details-board-lists">
          {groupValue === "status" && STATUS_LIST.map(status => (
            <DisplayList
              key={status}
              groupValue="status"
              orderValue={orderValue}
              listTitle={status}
              ticketDetails={ticketDetails}
            />
          ))}
          {groupValue === "user" && users.map(user => (
            <DisplayList
              key={user}
              groupValue="user"
              orderValue={orderValue}
              listTitle={user}
              ticketDetails={ticketDetails}
            />
          ))}
          {groupValue === "priority" && priorityList.map(priority => (
            <DisplayList
              key={priority.priority}
              groupValue="priority"
              orderValue={orderValue}
              listTitle={priority.priority}
              priorityList={priorityList}
              ticketDetails={ticketDetails}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default KanbanBoard;