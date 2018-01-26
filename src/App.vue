<template>
  <div id="app">
    <h1 class="title">MY TODOS</h1>
    <div class="header">
      <input type="text" placeholder="请输入需要添加的任务" :value="todoValue" @input="valueInput($event)" @keydown.enter="addTodo">
    </div>
    <div class="list" v-show="todoList.length">
      <ul>
        <li class="item" v-for="(value, index) in todoList" @click="checkClick(index)" @mouseover="over(index)" @mouseout="out">
          <input type="checkbox" :checked="value.todoChecked" />
          <span :class="value.todoChecked ? 'on' : 'off'">{{ value.todoName }}</span>
          <div class="delete-todo" v-show="isShow == index"><button @click.stop="deleteTodo(index)">删除</button></div>
        </li>
      </ul>
    </div>
    <p>{{ error }}</p>   
    <p class="tishi" v-if="isLoading">加载中......</p>
    <p class="tishi" v-else v-show="todoList.length == 0">您目前没有需要完成的任务</p>
    <div class="footer item" v-show="totosCount">
      <input :checked="isChecked" type="checkbox" @click="checkAll" />
      <span>{{ todoCount }} / {{ totosCount }}</span>
      <div class="delete-all"><button @click="deleteAll">删除选中</button></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      isShow: null
    }
  },
  created() {
    this.$store.dispatch("getTodo");
  },
  computed: {
    ...mapGetters(['todoValue', 'todoList', 'todoCount', 'totosCount', 'isChecked', 'isLoading', 'error'])
  },
  methods: {
    ...mapActions(['addTodo', 'checkAll', 'deleteAll']),
    valueInput(e) {
      this.$store.dispatch('newValue', e.target.value.trim());
    },
    deleteTodo(index) {
      this.$store.dispatch('deleteTodo', index);
    },
    checkClick(index) {
      this.$store.dispatch('checkClick', index);
    },
    over(index) {
      this.isShow = index;
    },
    out(index) {
      this.isShow = null;
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    width: 500px;
    margin: 30px auto; 
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 2px 2px 6px #f0f0f0;
    padding: 15px;
  }
  .header input {
    width: 100%;
    height: 42px;
    line-height: 42px;
    text-indent: 10px;
    font-size: 16px;
    border: 1px solid #f2f2f2;
    border-radius: 6px;
    background: #f9f9f9;
    box-sizing: border-box
  }
  .title {
    padding: 0 0 10px 0;
    text-indent: 10px;
    font-size: 30px;
    font-weight: 500;
    border-bottom: 1px dashed #f5f5f5;
    margin-bottom: 15px;
  }
  .list {
    margin: 15px 0;
    background: #f9f9f9;
  }
  .item {
    display: flex;
    line-height: 40px;
    border-bottom: 1px dashed #e1e1e1;
  }
  .item input {
    flex: 0 1 40px;
    margin: 15px 0 0;
  }
  .item span {
    flex: 1;
  }
  .item .delete-todo {
    flex: 0 1 auto;
    margin: 0px 5px
  }
  .delete-todo button {
    height: 30px;
    padding: 0px 15px;
    background: #e1e1e1;
    color: #333;
    border: 0;
    cursor: pointer;
  }
  .delete-todo button:hover {
    background: #f60;
    color: #fff;
  }
  .item .delete-all {
    flex: 0 1 auto;
    margin: 0px 5px
  }
  .footer.item {
    border: 0;
  }
  .delete-all button {
    height: 30px;
    padding: 0px 15px;    
    background: #f60;
    color: #fff;
    border: 0;
    cursor: pointer;
  }
  ul li {
    list-style-type: none;
  }
  .off {
    text-decoration: none;
  }
  .on {
    text-decoration: line-through;
    color: #ccc;
  }
  .tishi {
    padding: 15px 0 0;
    text-indent: 5px;
    font-size: 16px;
    color: #f60;  
  }
</style>