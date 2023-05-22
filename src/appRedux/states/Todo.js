class TodoState {

    constructor () {
        
        this.todoList = []
        this.totalrecord = 0
        this.todoDetails = {}
        this.state = 'initial';
        this.page = 0;
        
    }
    setTodoList (todoList) {
        this.todoList = todoList
    }

    setState (state) {
        this.state = state
    }
    setTodoTotalRecord(totalrecord){
        this.totalrecord = totalrecord
    }
}
export default TodoState