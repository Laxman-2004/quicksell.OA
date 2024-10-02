import React, { useEffect, useState } from "react";
import "./TopNav.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../Actions/DataAction";
import { Display, down } from '../../icons_FEtask'

// Helper function to retrieve group preference from localStorage (with optional logging)
const getGroup = () => {
  // console.log(localStorage.getItem("group"));  // Optional logging for debugging
  return localStorage.getItem("group") || "status"; // Default to "status" if not set
}

// Helper function to retrieve order preference from localStorage (with optional logging)
const getOrder = () => {
  // console.log(localStorage.getItem("order"));  // Optional logging for debugging
  return localStorage.getItem("order") || "priority"; // Default to "priority" if not set
}

const TopNav = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector(state => state.DataReducer);

  // Initialize group and order values from localStorage or default values
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());

  const handleGroupValue = (e, valueBool) => {
    if (valueBool) {
      setGroupValue(e.target.value);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("group", e.target.value);
    } else {
      setOrderValue(e.target.value);
      setDisplayOnClick(!displayOnClick);
      localStorage.setItem("order", e.target.value);
    }
  }

  useEffect(() => {
    // Dispatch action to fetch data based on group and order values
    if (groupValue === 'user') {
      dispatch(selectData(groupValue, { allTickets, allUser }, orderValue));
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="top-header" style={{ paddingLeft: "10px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <span className="iconD">
            <img src={Display} alt="display" />
          </span>
          Display
          <span className="iconD">
            <img src={down} alt="display" />
          </span>
        </button>
        {displayOnClick && (
          <>
            <div className="dropOnClick flex-gap-10 p-10">
              <div className="selectGroup flex-sb">
                <span>Grouping</span>
                <select
                  value={groupValue}
                  onChange={(e) => handleGroupValue(e, true)}
                  className="selectStyle"
                  name="group"
                  id="group"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="selectGroup flex-sb">
                <span>Ordering</span>
                <select
                  value={orderValue}
                  onChange={(e) => handleGroupValue(e, false)}
                  className="selectStyle"
                  name="order"
                  id="order"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNav;
