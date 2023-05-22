import {
    LOADTODOTABLE,
    TODO_LIST_LOADED
  } from "constants/ActionTypes";

export const LoadTodoTable = () => {
    
    return {
        type: LOADTODOTABLE,
    };
};    
export const PutTodoTable = (data) => {
    return {
        type: TODO_LIST_LOADED,
        payload : data
    };
}


