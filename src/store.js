import { configureStore } from '@reduxjs/toolkit';
import { DataReducer, SelectDataReducer } from './Reducers/DataReducer';

// Create the Redux store configuration
const store = configureStore({
  // Combine reducers into a single object
  reducer: {
    DataReducer,
    SelectDataReducer,
  },
});

// Export the store for use in other parts of the application
export default store;