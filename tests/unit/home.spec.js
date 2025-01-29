import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import TodoApp from '@/components/Home.vue'
import todoModule from '@/store/modules/todo'

describe('TodoApp.vue', () => {
  let store
  let wrapper

  /* This resets the store instance and the mounted component instance before each test to ran */
  beforeEach(() => {
    store = createStore({
      modules: { todo: { ...todoModule, namespaced: true } }
    })

    wrapper = mount(TodoApp, {
      global: { plugins: [store] }
    })
  })

  /* This test checks if the input field and add button exists */
  it('renders an input field and add button', () => {
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  /* This test adds a task by populating the input field and pressing the add button,
  it checks that the new task has been added to the list */
  it('adds a new task', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')

    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.find('li').text()).toContain('New Task')
  })

  /* This test adds a task by populating the input field and pressing the add button,
  then clicks the li to toggle it as done, it checks if the .completed class has been added */
  it('marks a task as completed', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')

    await wrapper.find('li').trigger('click')
    expect(wrapper.find('li span').classes()).toContain('completed')
  })

  /* This test adds a task by populating the input field and pressing the add button,
  then clicking the delete button to remove the task, then check if the task has been deleted */
  it('removes a task', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')

    await wrapper.find('li button').trigger('click') // Delete button
    expect(wrapper.findAll('li')).toHaveLength(0)
  })
})
