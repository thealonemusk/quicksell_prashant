// File: src/utils/helpers.js

import {
  inProgress,
  done,
  cancelled,
  todo,
  backlog,
  noPriority,
  lowPriority,
  mediumPriority,
  highPriority,
  urgentPriority
} from '../assets/assetExport';

export const getIconForStatus = (status) => {
  switch (status.toLowerCase()) {
    case 'in progress':
      return inProgress;
    case 'done':
      return done;
    case 'cancelled':
      return cancelled;
    case 'todo':
      return todo;
    case 'backlog':
      return backlog;
    default:
      return null;
  }
};

export const getPriorityName = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
    default:
      return 'No priority';
  }
};

export const getPriorityIcon = (priority) => {
  switch (parseInt(priority)) {
    case 4:
      return urgentPriority;
    case 3:
      return highPriority;
    case 2:
      return mediumPriority;
    case 1:
      return lowPriority;
    case 0:
    default:
      return noPriority;
  }
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const generateInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};