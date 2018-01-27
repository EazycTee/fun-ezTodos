Page({
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false
  },

  save: function () {
    wx.setStorageSync('todo_list', this.data.todos)
  },

  load: function () {
    var todos = wx.getStorageSync('todo_list')
    if (todos) {
      var leftCount = todos.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ todos: todos, leftCount: leftCount })
    }
  },

  onLoad: function () {
    this.load()
  },

  removeInputHandle: function() {
    this.setData({
      input: ''
    })
  },

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var todos = this.data.todos
    todos.unshift({ name: this.data.input, completed: false })
    this.setData({
      input: '',
      todos: todos,
      leftCount: this.data.leftCount + 1
    })
    this.save()
  },

  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1)
    })
    this.save()
  },

  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1)
    })
    this.save()
  },
  
  clearCompletedHandle: function (e) {
    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    this.setData({ todos: remains})
    this.save()
  }
})
