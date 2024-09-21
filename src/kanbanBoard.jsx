import  { useState, useEffect, useCallback } from 'react';
import Navbar from './components/navbar';
import axios from 'axios';
import DisplayList from './components/displayList';
import { getPriorityName } from './utils/helpers';
import './styles/kanbanBoard.css';

const KanbanBoard = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [orderBy, setOrderBy] = useState('title');

  const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      const { tickets, users } = response.data;
      
      setUsers(users);
      setPriorities(Array.from(new Set(tickets.map(t => t.priority)))
        .sort((a, b) => b - a)
        .map(p => ({ level: p, name: getPriorityName(p) })));
      
      const itemsWithUsers = tickets.map(ticket => ({
        ...ticket,
        user: users.find(u => u.id === ticket.userId)
      }));
      
      setItems(itemsWithUsers);
      orderItems(itemsWithUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  const orderItems = useCallback((itemsToOrder) => {
    const orderedItems = [...itemsToOrder].sort((a, b) => {
      if (orderBy === 'priority') return b.priority - a.priority;
      return a.title.localeCompare(b.title);
    });
    setItems(orderedItems);
  }, [orderBy]);

  const handleGroupChange = (value) => {
    setGroupBy(value);
  };

  const handleOrderChange = (value) => {
    setOrderBy(value);
    orderItems(items);
  };

  const getGroupedLists = () => {
    switch (groupBy) {
      case 'status':
        return statuses.map(status => (
          <DisplayList
            key={status}
            title={status}
            groupBy={groupBy}
            items={items}
            priorities={priorities}
          />
        ));
      case 'user':
        return users.map(user => (
          <DisplayList
            key={user.id}
            title={user.name}
            groupBy={groupBy}
            items={items}
            priorities={priorities}
          />
        ));
      case 'priority':
        return priorities.map(priority => (
          <DisplayList
            key={priority.level}
            title={priority.level.toString()}
            groupBy={groupBy}
            items={items}
            priorities={priorities}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="kanban-board">
      <Navbar
        groupBy={groupBy}
        orderBy={orderBy}
        onGroupChange={handleGroupChange}
        onOrderChange={handleOrderChange}
      />
      <div className="board-lists">
        {getGroupedLists()}
      </div>
    </div>
  );
};

export default KanbanBoard;