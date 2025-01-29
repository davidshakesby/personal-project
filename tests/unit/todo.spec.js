import { createStore } from 'vuex'
import todoModule from '@/store/modules/todo'

describe('Vuex Todo Module', () => {
  let store

  /* This resets the store instance before each test is run */
  beforeEach(() => {
    store = createStore({
      modules: { todo: { ...todoModule, namespaced: true } }
    })
  })

  /* This tests adds a new task to the array */
  it('adds a new task', () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    expect(store.state.todo.tasks).toHaveLength(1)
    expect(store.state.todo.tasks[0].text).toBe('Test Task')
  })

  /* This test trys to add the same task twice, it will succeed first time and fail the second */
  it('prevents duplicate tasks', () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    expect(store.state.todo.tasks).toHaveLength(1) // Only one task should be added
  })

  /* This test adds a new task, toggles it as compelete and then toggles it again to reset it */
  it("toggles a task's completion status", () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    store.dispatch('todo/toggleTask', 0)
    expect(store.state.todo.tasks[0].completed).toBe(true)

    store.dispatch('todo/toggleTask', 0)
    expect(store.state.todo.tasks[0].completed).toBe(false)
  })

  /* This test adds a new task, then removes the tasks from the array */
  it('removes a task', () => {
    store.commit('todo/SET_NEW_TASK', 'Test Task')
    store.dispatch('todo/addTask')

    store.dispatch('todo/removeTask', 0)
    expect(store.state.todo.tasks).toHaveLength(0)
  })
})
