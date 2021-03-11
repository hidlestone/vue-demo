<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<TodoHeader @addTodo="addTodo"/>-->
      <TodoHeader ref="header"/>// 之前是传递函数，// <TodoHeader :addTodo="addTodo"/> 使用props 进行传递
      <TodoList :todos="todos"/>
      <TodoFooter>
        <input type="checkbox" v-model="checkAll" slot="checkAll"/>
        <span slot="size">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button class="btn btn-danger" v-show="completeSize" @click="deleteAllCompleted" slot="delete">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  import storageUtils from './utils/storageUtils'

  export default {
    data () {
      return {
        todos: storageUtils.readTodos()
        /* todos: [{
          title: 'inputTodo--001',
          complete: false
        }, {
          title: 'inputTodo--002',
          complete: false
        }] */
      }
    },
    mounted () {
      // 绑定自定义事件（addTodo）监听
      // this.$on('addTodo',  this.addTodo) 绑定监听的目标不对
      this.$refs.header.$on('addTodo', this.addTodo)
      // 订阅消息（deleteTodo）
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
    },
    computed: {
      completeSize () {
        return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
        // return 0
      },
      checkAll: {
        get () { // 决定是否勾选
          return this.completeSize === this.todos.length && this.completeSize > 0
          // return 0
        },
        set (value) { // 点击了全选checkbox，value即当前checkbox的选中状态（true/false）
          this.selectAll(value)
        }
      }
    },
    methods: {
      addTodo (todo) {
        this.todos.unshift(todo) // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
      },
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },
      // 删除所有已完成的
      deleteCompleteToodos () {
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      // 全选/全不选
      selectAll (isSelectAll) {
        this.todos.forEach(todo => {
          todo.complete = isSelectAll
        })
      },
      // 清除已完成
      deleteAllCompleted () {
        if (window.confirm('确定清除已完成的吗？')) {
          this.deleteCompleteToodos()
        }
      }
    },
    watch: {
      todos: {
        deep: true, // 深度监视
        /* handler: function (val) {
          // 将数据(json)保存到localStorage
          // localStorage.setItem('todos_key', JSON.stringify(val))
          storageUtils.saveTodos(val)
        } */
        // handler的值应该是一个函数, 且函数应该要有一个形参(接收todos最新的值)
        handler: storageUtils.saveTodos
        /* handler: function  (todos) {
          localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
        } */
      }
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
