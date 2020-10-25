import React, { Component, createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal } from 'antd';
import Progress from './Progress';
import TaskForm from './TaskForm';
import { getTaskList, getUserList} from '../api-calls';
import { AppContext, AppProvider } from '../context';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen':'white' ,

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver && 'lightblue',
    padding: grid,
    
});

const Board = () => {
    const [state, setState, getUpdatedTasks] = useContext(AppContext);  
    const [showModal, setShowModal] = useState(false);    
    const [todo, setTodo] = useState([]);
    const [progress, setProgress] = useState([]);
    const [done, setDone] = useState([]);
   
    const convertToObj = (list) => {
        const obj = {};
        list.map((item)=>{
            obj[item.id] = item;
        });
        return obj;
      }  

      useEffect(()=>{
        const taskObj = Object.assign({},state.taskObj);
        const tasks = state.tasks.slice();
        if(state.action ){
            if(state.action === 'create'){
                const tasks = state.tasks.slice();
                if(progress.length>0){
                    const progressObj = convertToObj(progress);
                    Object.keys(taskObj).map((key)=>{
                        if(progressObj[key]){
                            delete taskObj[key];
                        }
                    });
                }
                if(done.length>0){
                    const doneObj = convertToObj(done);
                    Object.keys(taskObj).map((key)=>{
                        if(doneObj[key]){
                            delete taskObj[key];
                        }
                    });
                }
                const newTodos = Object.values(taskObj);
                setTodo(newTodos);
                setState(state => ({...state, action:''}));
            }else if(state.action === 'update'){
                if(todo.length>0){
                    const todoObj = convertToObj(todo);
                    Object.values(taskObj).map((item)=>{
                        if(todoObj[item.id]){
                            todoObj[item.id] = item;
                        }
                    });
                    setTodo(Object.values(todoObj));
                }
                if(progress.length>0){
                    const progressObj = convertToObj(progress);
                    Object.values(taskObj).map((item)=>{
                        if(progressObj[item.id]){
                            progressObj[item.id] = item;
                        }
                    });
                    setProgress(Object.values(progressObj));
                }
                if(done.length>0){
                    const doneObj = convertToObj(done);
                    Object.values(taskObj).map((item)=>{
                        if(doneObj[item.id]){
                            doneObj[item.id] = item;
                        }
                    });
                    setDone(Object.values(doneObj));
                }

                setState(state => ({...state, action: ''}));
            }else if(state.action === 'delete'){
                const newProgress = progress.filter((item)=>{
                    if(taskObj[item.id]){
                        delete taskObj[item.id];
                        return true;
                    }
                });
        
                const newDone = done.filter((item)=>{
                    if(taskObj[item.id]){
                        delete taskObj[item.id];
                        return true;
                    }
                });
        
                console.log('task obj after deleting : ', taskObj);
                const newTasks = Object.values(taskObj);
                console.log('new progress : ', newProgress);
                console.log('new tasks : ', newTasks);
                setTodo(newTasks);
                setProgress(newProgress);
                setDone(newDone);
            }
            
        
        }else{
            setTodo(state.tasks);
        }
      },[state.tasks]);
      
  
  

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const id2List = {
        droppable: todo,
        droppable2: progress,
        droppable3: done,
    };

    const id2Setter = {
        droppable: setTodo,
        droppable2: setProgress,
        droppable3: setDone,
    }

    const getList = id => {
        const list = id2List[id];
        console.log('list getting : ',list);
        return list;
    }

    const getSetter = id => id2Setter[id];

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {    
                const list = getList(source.droppableId);
                const reorderedList = reorder(list, source.index, destination.index);
                const setterFunc = getSetter(source.droppableId);
                setterFunc(reorderedList);            
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
           
            const sourceSetter = getSetter(source.droppableId);
            const destSetter = getSetter(destination.droppableId);  
            sourceSetter(result[source.droppableId]);
            destSetter(result[destination.droppableId]);    
            
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    
    return (
        <Styld.Container>
            <Styld.AddBtn onClick={()=>setShowModal(true)} >Add Task</Styld.AddBtn>        
            <Styld.DragWrapper>        
            <DragDropContext onDragEnd={onDragEnd} >
                <Progress title="To Do" droppableId="droppable" items={todo}  />
                <Progress title="In Progress" droppableId="droppable2" items={progress}  />    
                <Progress title="Done" droppableId="droppable3" items={done} />
            </DragDropContext>
            <Modal
                title="Create Task"
                visible={showModal}      
                onCancel={() => setShowModal(false)}        
                footer={false}
            >
                <TaskForm  onCancel={() => setShowModal(false)}  />
            </Modal>
            </Styld.DragWrapper>
        </Styld.Container>
    );
    
}


const Styld = {
  DragWrapper: styled.div`
    display: flex;   
  `,
  Container: styled.div`
    width: 90%;
    margin: 0 auto;
  `,
  Drag: styled.div`
    border: 1px solid red;
  `,
  Drop: styled.div`
    border: 1px solid blue;
  `,
  AddBtn: styled.button`
    width: 100%;
    margin-bottom: 15px;
    background-color: white;
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
  `,
}

export default Board;