import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { InitialState } from "../../store/slices/types";
import "./Group.scss";

const Group: FC<InitialState> = ({ taskData }) => {
  return (
    <React.Fragment>
      {taskData.map((group, index) => (
        <Draggable
          key={group.groupId}
          draggableId={group.groupId}
          index={index}
        >
          {(provided) => (
            <div
              className="group__item"
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="group__title" {...provided.dragHandleProps}>
                <span>{group.groupName}</span>
              </div>
              <Droppable droppableId={String(index)} type="item">
                {(provided) => (
                  <div
                    className="group__content"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {group.tasks.map((task, index) => (
                      <Draggable
                        key={task.dragId}
                        draggableId={task.dragId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div
                              className="item__title"
                              {...provided.dragHandleProps}
                            >
                              {task.text}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </Draggable>
      ))}
    </React.Fragment>
  );
};

export default Group;
