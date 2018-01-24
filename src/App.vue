<template>
  <div id="app">
    <div class="header">
      <input type="text" :value="todoValue" @input="valueInput($event)" @keydown.enter="addTodo">
    </div>
    <div class="list">
      <ul>
        <li v-for="(value, index) in todoList">
          <input type="checkbox" :checked="value.todoChecked" @click="checkClick(index)" />
          <span :class="value.todoChecked ? 'on' : 'off'">{{ value.todoName }}</span>
          <button @click="deleteTodo(index)">删除</button>
        </li>
      </ul>
    </div>
    <div class="footer">
      <input :checked="isChecked" type="checkbox" @click="checkAll" />
      <span>{{ todoCount }} / {{ totosCount }}</span>
      <button @click="deleteAll">删除选中</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['todoValue', 'todoList', 'todoCount', 'totosCount', 'isChecked'])
  },
  methods: {
    ...mapActions(['addTodo', 'checkAll', 'deleteAll']),
    valueInput(e) {
      this.$store.dispatch('newValue', e.target.value)
    },
    deleteTodo(index) {
      this.$store.dispatch('deleteTodo', index)
    },
    checkClick(index) {
      this.$store.dispatch('checkClick', index)
    }
  }
}
</script>

<style scoped>
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
</style>