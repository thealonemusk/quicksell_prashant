import { useState } from 'react';
import PropTypes from 'prop-types';
import * as icons from "../Assets/Icons";
import "../Styles/Header.css";

const Navbar = ({ groupValue, orderValue, onGroupValueChange, onOrderValueChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

  const handleGroupChange = (e) => {
    onGroupValueChange(e.target.value);
    handleFilterToggle();
  };

  const handleOrderChange = (e) => {
    onOrderValueChange(e.target.value);
    handleFilterToggle();
  };

  return (
    <header className="header">
      <div className="header-container">
        <button className="display-button" onClick={handleFilterToggle}>
          <img src={icons.display} alt="Display" />
          <span>Display</span>
          <img src={icons.down} alt="Dropdown" className={isFilterOpen ? 'rotated' : ''} />
        </button>
        {isFilterOpen && (
          <div className="filter-dropdown">
            <div className="filter-option">
              <label htmlFor="grouping">Grouping</label>
              <select id="grouping" value={groupValue} onChange={handleGroupChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="filter-option">
              <label htmlFor="ordering">Ordering</label>
              <select id="ordering" value={orderValue} onChange={handleOrderChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

Navbar.propTypes = {
  groupValue: PropTypes.string.isRequired,
  orderValue: PropTypes.string.isRequired,
  onGroupValueChange: PropTypes.func.isRequired,
  onOrderValueChange: PropTypes.func.isRequired,
};

export default Navbar;