import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  
});


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const Progress = (props) => {
 return (
  <Styld.Container >
    <Styld.Heading>
      <span>{props.title}</span>        
    </Styld.Heading>
    <Styld.Body> 
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div
          ref={provided.innerRef}
          style={{minWidth:'330px', minHeight:'320px'}}
          {...provided.droppableProps}
          >
            {props.items && props.items.length>0 && props.items.map((item, index)=>(
              <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
              >
                {(provided, snapshot) => (
                  <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  // style={getItemStyle(
                  //   snapshot.isDragging,
                  //   provided.draggableProps.style
                  // )}
                  >
                    <TaskCard item={item} />
                  </div>
                )}
              </Draggable>              
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Styld.Body>
  </Styld.Container>
 );
}

const Styld = {
  Container: styled.div`
    background-color: rgb(244, 245, 247);
    max-width: 370px;
    min-width: 370px;
    margin-right: 25px;
  `,
  Heading: styled.div`
    height: 40px;
    padding-left: 10px;
    padding-top: 6px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    background-color: white;
    &:first-child {      
      color: black;
    }
  `,
  Body: styled.div`
    max-height: 450px;
    min-height: 350px;
    overflow-y: scroll;
    background-color: white;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  `,  
}
export default Progress