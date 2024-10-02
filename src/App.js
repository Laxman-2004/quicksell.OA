import React, { useEffect } from 'react';
import './App.css';
import TopNav from './components/TopNav/TopNav';
// import Card from './components/Card/Card';
import DashView from './components/DashBoard/DashView';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from './Actions/DataAction';

const App = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector(state => state.DataReducer);

  // Fetch all data on component mount
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  // Render DashView if data is available, otherwise render Loading component
  return allTickets &&(
    <div style={{ paddingTop: "10px" }}>
      <TopNav />
      <hr style={{ marginTop: "10px" }} />
      <DashView />
    </div>
  )
};

export default App;