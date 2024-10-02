import React from "react";
import { useSelector } from "react-redux";
import "./DashView.css";
import { add, dotmenu } from "../../icons_FEtask";
import Card from "../Card/Card";
import { assignIcon, priorityIcon } from "../../helper";
import { getAvailabilityById } from "../../helper";

const DashView = () => {
  // Access data from Redux store
  const { selectedData, user } = useSelector((state) => state.SelectDataReducer);
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  return (
    // Render only if selected data exists
    selectedData && (
      <div className="dashContainer">
        {/* Loop through each group in selected data */}
        {selectedData.map((elem, index) => {
          const icon = assignIcon(elem[index]?.title); // Get icon based on title

          return (
            <div key={index} className="dashCardContainer">
              <div className="dashCardHeading flex-sb"> {/* Card heading with flexbox */}
                <div className="leftView">
                  {/* Display user image or icon based on grouping */}
                  {!user ? (
                    <span className="icon">
                      <img src={icon} alt="" />
                    </span>
                  ) : (
                    <span className="imageContainer relative" style={{ width: "15px", height: "15px", display: 'inline-block' }}>
                      <img
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        src="https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"
                        alt="UserImage"
                      />
                      {/* Display online status based on helper function */}
                      <div className={`${getAvailabilityById(elem.id, allTickets, allUser) && 'online'} userStatus`} />
                    </span>
                  )}
                  <span style={{ fontSize: "small" }}> {/* Display group title and count */}
                    {elem[index]?.title} {elem[index]?.value?.length}
                  </span>
                </div>
                <div className="rightView"> {/* Add and menu icons */}
                  <img src={add} alt="add" />
                  <img src={dotmenu} alt="dotmenu" />
                </div>
              </div>

              <div className="dashList flex-gap-10"> {/* List of items within the group */}
                {elem[index]?.value?.map((elem, ind) => (
                  <Card
                    key={ind}
                    id={elem.id}
                    title={elem.title}
                    tag={elem.tag}
                    status={getAvailabilityById(elem.id, allTickets, allUser)}
                    priority={priorityIcon(elem.priority)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default DashView;
