<template>
  <ul class="todo-main">
    <TodoItem v-for="(todo,index) in todos" :key="index" :todo="todo" :index="index"></TodoItem>
  </ul>
</template>

<script>
  import TodoItem from './TodoItem.vue'

  export default {
    // 声明接手标签属性
    props: ['todos'], // 会成为uudangqian组件对象的属性，可以在模板中直接访问，也可以通过this来访问。

    components: {
      TodoItem
    }
  }
</script>

<style>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
