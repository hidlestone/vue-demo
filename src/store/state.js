/*
状态对象模块
 */
import storageUtils from '../utils/storageUtils.js'

export default {
  todos: storageUtils.readTodos()
}
