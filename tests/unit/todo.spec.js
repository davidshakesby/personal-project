import { createStore } from 'vuex'
import todoModule from '@/store/modules/todo'

describe('Vuex Todo Module', () => {
  let store

  /* This resets the store instance before each test is run */
  beforeEach(() => {
    store = createStore({
      modules: {
        todo: {
          ...todoModule,
          namespaced: true,
          state: { // Reset state for each test
            tasks: [],
            newTask: '',
            errorMessage: '',
            editingTaskIndex: null,
            editingTaskText: ''
          }
        }
      }
    })
  })

  /* This tests adding a new task to the array */
  it('adds a new task', () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    expect(store.state.todo.tasks).toHaveLength(1)
    expect(store.state.todo.tasks[0].text).toBe('Test Task')
  })

  /* This test tries to add the same task twice, it will succeed the first time and fail the second */
  it('prevents duplicate tasks', () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    expect(store.state.todo.tasks).toHaveLength(1) // Only one task should be added
  })

  /* This test adds a new task, toggles it as complete, and then toggles it again to reset it */
  it("toggles a task's completion status", () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    store.dispatch('todo/toggleTask', 0)
    expect(store.state.todo.tasks[0].completed).toBe(true)

    store.dispatch('todo/toggleTask', 0)
    expect(store.state.todo.tasks[0].completed).toBe(false)
  })

  /* This test adds a new task, then removes it from the array */
  it('removes a task', () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    store.dispatch('todo/removeTask', 0)
    expect(store.state.todo.tasks).toHaveLength(0)
  })

  /* This test sets a task for editing */
  it('sets a task for editing', () => {
    store.commit('todo/SET_NEW_TASK', 'Task to Edit')
    store.dispatch('todo/addTask')

    store.dispatch('todo/setEditingTask', { index: 0, text: 'Task to Edit' })
    expect(store.state.todo.editingTaskIndex).toBe(0)
    expect(store.state.todo.editingTaskText).toBe('Task to Edit')
  })

  /* This test updates an existing task */
  it('updates a task', () => {
    store.commit('todo/SET_NEW_TASK', 'Initial Task')
    store.dispatch('todo/addTask')

    store.dispatch('todo/setEditingTask', { index: 0, text: 'Updated Task' })
    store.dispatch('todo/updateEditingTaskText', 'Updated Task')
    store.dispatch('todo/updateTask')

    expect(store.state.todo.tasks[0].text).toBe('Updated Task')
    expect(store.state.todo.editingTaskIndex).toBe(null)
    expect(store.state.todo.editingTaskText).toBe('')
  })

  /* This test prevents updating a task with an empty text */
  it('prevents updating a task with empty text', () => {
    store.commit('todo/SET_NEW_TASK', 'Initial Task')
    store.dispatch('todo/addTask')

    store.dispatch('todo/setEditingTask', { index: 0, text: '' })
    store.dispatch('todo/updateTask')

    expect(store.state.todo.errorMessage).toBe('Task cannot be empty!')
    expect(store.state.todo.tasks[0].text).toBe('Initial Task') // Task should remain unchanged
  })

  /* This test prevents updating a task with a duplicate value */
  it('prevents updating a task to a duplicate value', () => {
    store.commit('todo/SET_NEW_TASK', 'Task One')
    store.dispatch('todo/addTask')
    store.commit('todo/SET_NEW_TASK', 'Task Two')
    store.dispatch('todo/addTask')

    store.dispatch('todo/setEditingTask', { index: 1, text: 'Task One' })
    store.dispatch('todo/updateTask')

    expect(store.state.todo.errorMessage).toBe('Task already exists!')
    expect(store.state.todo.tasks[1].text).toBe('Task Two') // Task should remain unchanged
  })
})
