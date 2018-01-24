import Vue from 'vue';
import Vuex from 'vuex'; 

Vue.use(Vuex);

const state = {
    todoText: '',
    todoList: [],
    isChecked: false
}

const mutations = {
    newValue(state, newValue) {
        state.todoText = newValue;
        mutations.checkFun(state);
    },
    addTodo(state){
        state.todoList.push({
            todoName: state.todoText,
            todoChecked: false
        })
        state.todoText = ''
        mutations.checkFun(state);
    },
    deleteTodo(state, index) {
        state.todoList.splice(index, 1)
        let trueCheck = state.todoList.filter(todo => todo.todoChecked).length;
        mutations.checkFun(state);
    },
    checkClick(state, index) {
        state.todoList[index].todoChecked = !state.todoList[index].todoChecked
        mutations.checkFun(state);
    },
    checkAll(state) {
        let trueCheck = state.todoList.filter(todo => todo.todoChecked).length;
        if (trueCheck != state.todoList.length || trueCheck == 0) {
            state.todoList.filter(todo => {
                if (!todo.todoChecked) {
                    todo.todoChecked = true;
                }
            })
            state.isChecked = true;
        }else {
            state.todoList.filter(todo => {
                if (todo.todoChecked) {
                    todo.todoChecked = false;
                }
            })
            state.isChecked = false;
        }
    },
    deleteAll(state) {
        state.todoList = state.todoList.filter(todo => {
            return !todo.todoChecked
        })
        mutations.checkFun(state);
    },
    checkFun(state) {
        var trueCheck = state.todoList.filter(todo => todo.todoChecked).length;
        if (trueCheck != state.todoList.length || trueCheck == 0) {
            state.isChecked = false;
        }else {
            state.isChecked = true;
        }
    } 
}

const actions = {
    newValue({commit}, newValue) {
        commit('newValue', newValue);
    },
    addTodo({commit}) {
        commit('addTodo')
    },
    deleteTodo({commit}, index) {
        commit('deleteTodo', index);
    },
    checkClick({commit}, index) {
        commit('checkClick', index);
    },
    checkAll({commit}) {
        commit('checkAll')
    },
    deleteAll({commit}) {
        commit('deleteAll')
    }
}

const getters = {
    todoValue(state) {
        return state.todoText;
    },
    todoList(state) {
        return state.todoList
    },
    todoCount(state) {
        return state.todoList.filter(todo => todo.todoChecked).length;
    },
    totosCount(state) {
        return state.todoList.length;
    },
    isChecked(state) {
        return state.isChecked;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})