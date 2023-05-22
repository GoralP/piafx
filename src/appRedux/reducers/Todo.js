import TodoState from '../states/Todo'
import {
  TODO_LIST_LOADED
} from "constants/ActionTypes";

const todos = (state , action) => {

  if (state === undefined) {
      return new TodoState ()
  }
  switch (action.type) {

    case TODO_LIST_LOADED:
      return {
        ...state,
        todoList: action.payload,
        state: "todosloaded"
      };
    default:
      return state;
  }
};

export default todos;
