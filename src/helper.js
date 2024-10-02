// Import SVG icons used for task visualization
import {
    todo,
    Backlog,
    HighPriority,
    LowPriority,
    MediumPriority,
    UrgentPrioritycolour,
    inprogress,
    Nopriority,
    UrgentPrioritygrey,
    Cancelled,
    Done,
  } from './icons_FEtask';
  
  // Define an array of icon objects for easier management
  export const icons = [
    {
      type: 'Todo', // Task type
      value: todo, // Corresponding SVG icon
    },
    {
      type: 'In progress', // Task type
      value: inprogress, // Corresponding SVG icon
    },
    // ... (similar entries for other task types)
    {
      type: 'No priority', // Task type
      value: Nopriority, // Corresponding SVG icon
    },
  ];
  
  // Function to assign an icon based on task type
  export const assignIcon = (type) => {
    // Find the icon object matching the provided task type
    const icon = icons.find((icon) => icon.type === type);
    if (icon) {
      return icon.value; // Return the SVG icon if found
    } else {
      // Handle cases where the type is not found (optional: provide a default icon)
      console.warn(`Icon not found for type: ${type}`);
      return null; // Or return a placeholder icon
    }
  };
  
  // Function to assign a priority icon based on priority level (can be improved)
  export const priorityIcon = (priority) => {
    // This implementation can be improved by using a switch statement or a lookup table
    // for better readability and maintainability.
    if (priority === 0) {
      return Nopriority;
    }
    if (priority === 1) {
      return LowPriority;
    }
    // ... (similar checks for other priority levels)
    if (priority === 4) {
      return UrgentPrioritygrey;
    }
  };
  
  // Function to check user availability based on task ID (assuming data structure)
  export const getAvailabilityById = (taskId, allTickets, allUser) => {
    // Find the task object with the matching ID from the tickets data
    const task = allTickets.find((task) => task.id === taskId);
  
    // Check if the task has a user ID assigned
    if (!task?.userId) {
      console.warn(`Task with ID: ${taskId} does not have a user assigned.`);
      return false; // Or return a default value (optional)
    }
  
    // Find the user object with the matching ID from the user data
    const user = allUser.find((user) => user.id === task?.userId);
  
    // Return the user's availability if found, otherwise false
    return user?.available ?? false; // Use nullish coalescing for a default value
  };