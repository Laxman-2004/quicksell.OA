import { createReducer } from "@reduxjs/toolkit";

// **Data Reducer**

export const DataReducer = createReducer({}, {
  // Action to handle data request
  DATA_REQUEST: (state) => {
    // Set loading state to true while data is being fetched
    state.loading = true;
  },
  // Action to handle successful data retrieval
  DATA_SUCCESS: (state, action) => {
    // Set loading state to false after successful response
    state.loading = false;
    // Update state with received data
    state.allTickets = action.payload.tickets;
    state.allUser = action.payload.users;
  },
  // Action to handle data fetching failure
  DATA_FAILURE: (state) => {
    // Set loading state to false after failure
    state.loading = false;
    // Reset state to empty arrays in case of failure
    state.allTickets = [];
    state.allUser = [];
  },
});

// **Select Data Reducer**

export const SelectDataReducer = createReducer({}, {
  // Action to handle select data request
  SELECT_DATA_REQUEST: (state) => {
    // Set loading state to true while processing selection
    state.loading = true;
    // Reset selected data to empty array initially
    state.selectedData = [];
  },
  // Action to handle successful selection
  SELECT_DATA_SUCCESS: (state, action) => {
    // Set loading state to false after successful selection
    state.loading = false;
    // Update state with selected data and user information
    state.selectedData = action.payload.selectedData;
    state.user = action.payload.user;
  },
  // Action to handle select data failure
  SELECT_DATA_FAILURE: (state, action) => {
    // Set loading state to false after failure
    state.loading = false;
    // Reset selected data to empty array and display error message
    state.selectedData = [];
    state.message = action.payload.message;
  },
});