import axios from 'axios';

// Fetches all data from the API and stores it in localStorage if successful
export const fetchAllData = () => async (dispatch) => {
  const value = localStorage.getItem('data');

  // Check if data is already cached in localStorage
  if (value !== null) {
    return dispatch({ type: 'DATA_SUCCESS', payload: JSON.parse(value) });
  }

  try {
    dispatch({ type: 'DATA_REQUEST' }); // Dispatch request action

    const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
    const data = response.data;

    localStorage.setItem('data', JSON.stringify(data)); // Store data in localStorage
    dispatch({ type: 'DATA_SUCCESS', payload: data }); // Dispatch success action
  } catch (error) {
    console.error('Error fetching data:', error.message);
    dispatch({ type: 'DATA_FAILURE' }); // Dispatch failure action
  }
};

// Selects data based on the provided grouping criteria and order
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch({ type: 'SELECT_DATA_REQUEST' }); // Dispatch request action

    let user = false;
    let mySet = new Set();
    let arr = [], selectedData = [];

    if (group === 'status') {
      // Define list of statuses
      const status_list = ["Todo", "In progress", "Backlog", "Done", "Cancelled"];

      // Add statuses to a Set to ensure uniqueness (optional)
      status_list.forEach((elem) => mySet.add(elem));

      // Convert Set back to an array
      arr = [...mySet];

      // Filter tickets based on status and create structured data
      arr.forEach((elem, index) => {
        arr = allTickets.filter((fElem) => fElem.status === elem);
        selectedData.push({
          [index]: {
            title: elem,
            value: arr,
          },
        });
      });
    } else if (group === 'user') {
      user = true; // Flag to indicate user grouping

      // Loop through all users and filter tickets for each user
      allTickets?.allUser?.forEach((elem, index) => {
        arr = allTickets?.allTickets?.filter((Felem) => Felem.userId === elem.id);
        selectedData.push({
          [index]: {
            title: elem.name,
            value: arr,
          },
        });
      });
    } else {
      // Define list of priorities (assuming priority is an integer)
      const prior_list = ["No Priority", "Low", "Medium", "High", "Urgent"];

      // Filter tickets based on priority and create structured data
      prior_list.forEach((elem, index) => {
        arr = allTickets.filter((fElem) => fElem.priority === index); // Assuming priority is an integer index
        selectedData.push({
          [index]: {
            title: elem,
            value: arr,
          },
        });
      });
    }

    // Sort data by title or priority if specified
    if (orderValue === "title") {
      selectedData.forEach((elem, index) => {
        elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    } else if (orderValue === "priority") {
      selectedData.forEach((elem, index) => {
        elem[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } }); // Dispatch success action
  } catch (error) {
    console.error('Error selecting data:', error.message);
    dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message }); // Dispatch failure action
  }
};