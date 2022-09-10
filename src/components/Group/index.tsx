import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { InitialState } from "../../store/slices/types";
import "./Group.scss";

import Add from "../../assets/icon/Add.svg";
import TimeAgo from "timeago-react";
import Button from "../Button";

const Group: FC<InitialState> = ({ taskData }) => {
  return (
    <React.Fragment>
      {taskData.map((group, index) => (
        <Draggable
          key={group.groupId}
          draggableId={group.groupId}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              className="group__item"
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div className="group__main">
                <div className="group__title" {...provided.dragHandleProps}>
                  <span>{group.groupName}</span>
                </div>
                <div className="group__remove">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.502675 13C0.436901 13.0004 0.371699 12.9878 0.310807 12.9629C0.249916 12.938 0.194532 12.9013 0.147833 12.855C0.10099 12.8085 0.0638093 12.7532 0.0384363 12.6923C0.0130633 12.6314 0 12.5661 0 12.5001C0 12.4341 0.0130633 12.3687 0.0384363 12.3078C0.0638093 12.2469 0.10099 12.1916 0.147833 12.1451L12.1425 0.147023C12.2366 0.0528856 12.3642 0 12.4973 0C12.6304 0 12.7581 0.0528856 12.8522 0.147023C12.9463 0.24116 12.9991 0.368837 12.9991 0.501967C12.9991 0.635096 12.9463 0.762773 12.8522 0.85691L0.857517 12.855C0.810817 12.9013 0.755434 12.938 0.694543 12.9629C0.633651 12.9878 0.568449 13.0004 0.502675 13Z"
                      fill="white"
                    />
                    <path
                      d="M12.4973 13C12.4316 13.0004 12.3663 12.9878 12.3055 12.9629C12.2446 12.938 12.1892 12.9013 12.1425 12.855L0.147835 0.85691C0.0537248 0.762773 0.000854491 0.635096 0.000854492 0.501966C0.000854493 0.368837 0.0537248 0.241159 0.147835 0.147022C0.241945 0.0528855 0.369585 9.91894e-10 0.502676 0C0.635768 -9.91894e-10 0.763408 0.0528855 0.857518 0.147022L12.8522 12.1451C12.899 12.1916 12.9362 12.2469 12.9616 12.3078C12.9869 12.3687 13 12.4341 13 12.5001C13 12.5661 12.9869 12.6314 12.9616 12.6923C12.9362 12.7532 12.899 12.8085 12.8522 12.855C12.8055 12.9013 12.7501 12.938 12.6892 12.9629C12.6283 12.9878 12.5631 13.0004 12.4973 13Z"
                      fill="white"
                    />
                  </svg>
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
              <div className="group__info">
                <div className="add__item">
                  <Button
                    text="Новая задача"
                    color="#444444"
                    type="add"
                    backgroundColor="#d9d9d9"
                  />
                </div>
                <div className="time">
                  <TimeAgo
                    opts={{ minInterval: 15 }}
                    datetime={group.groupCreatedAt}
                  ></TimeAgo>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
      <div className="group__add">
        <Button
          text="Добавить доску"
          color="#EDEDED"
          type="remove"
          backgroundColor="#434343"
        />
      </div>
    </React.Fragment>
  );
};

export default Group;
