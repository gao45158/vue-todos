import Vue from 'vue';
import Vuex from 'vuex'; 

import api from '../api/index'

Vue.use(Vuex);

const state = {
    todoText: '',
    todoList: [],
    isChecked: false,
    loading: false,
    error: ''
}

const mutations = {
    newValue: (state, newValue) => {
        state.todoText = newValue;
        mutations.checkFun(state);
    },
    addTodo: state => {
        if (state.todoText == '') return;
        state.todoList.push({
            todoName: state.todoText,
            todoChecked: false
        })
        state.todoText = ''
        mutations.checkFun(state);
    },
    deleteTodo: (state, index) => {
        state.todoList.splice(index, 1)
        let trueCheck = state.todoList.filter(todo => todo.todoChecked).length;
        mutations.checkFun(state);
    },
    checkClick: (state, index) => {
        state.todoList[index].todoChecked = !state.todoList[index].todoChecked
        mutations.checkFun(state);
    },
    checkAll: state => {
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
    deleteAll: state => {
        state.todoList = state.todoList.filter(todo => {
            return !todo.todoChecked
        })
        mutations.checkFun(state);
    },
    checkFun: state => {
        var trueCheck = state.todoList.filter(todo => todo.todoChecked).length;
        if (trueCheck != state.todoList.length || trueCheck == 0) {
            state.isChecked = false;
        }else {
            state.isChecked = true;
        }
    },
    getTodo: (state, res) => state.todoList = res,
    showLoading: state => state.loading = true,
    hideLoading: state => state.loading = false,
    error: (state, error, fs) => {
        state.error = error,
        state.loading = fs
    }
}

const actions = {
    newValue: ({commit}, newValue) => commit('newValue', newValue),
    addTodo: ({commit}) => commit('addTodo'),
    deleteTodo: ({commit}, index) => commit('deleteTodo', index),
    checkClick: ({commit}, index) => commit('checkClick', index),
    checkAll: ({commit}) => commit('checkAll'),
    deleteAll: ({commit}) => commit('deleteAll'),
    getTodo: ({commit}) => {
        api.todoApi("http://localhost:3000/todo").then(respones => {
            commit("getTodo", respones.data)
        });
    },
    showLoading: ({commit}) => commit('showLoading'),
    hideLoading: ({commit}) => commit('hideLoading'),
    error: ({commit}, error, fs) => commit('error', error, fs)
}

const getters = {
    todoValue: state => state.todoText,
    todoList: state => state.todoList,
    todoCount: state => state.todoList.filter(todo => todo.todoChecked).length,
    totosCount: state => state.todoList.length,
    isChecked: state => state.isChecked,
    isLoading: state => state.loading,
    error: state => state.error
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})