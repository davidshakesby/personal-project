import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import TodoApp from '@/components/Home.vue'
import todoModule from '@/store/modules/todo'

describe('TodoApp.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    // Ensure a fresh state for every test
    const todoModuleClone = {
      ...todoModule,
      state: JSON.parse(JSON.stringify(todoModule.state)), // Deep clone state
      namespaced: true
    }

    store = createStore({
      modules: { todo: todoModuleClone }
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

  /* This test adds a task, then clicks the delete button to remove the task,
  then check if the task has been deleted */
  it('removes a task', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')

    await wrapper.find('li button:last-child').trigger('click') // Delete button
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('li')).toHaveLength(0)
  })

  /* This test adds a task, then clicks the edit button to start editing,
  and then checks if the save button works to save the edited task */
  it('edits a task and saves it', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')

    // Check that the Edit button exists for the task
    const editButton = wrapper.find('li button.text-blue-500')
    expect(editButton.exists()).toBe(true)

    // Click Edit button
    await editButton.trigger('click')

    // Check that the input field for editing is visible
    const inputField = wrapper.find('li input')
    expect(inputField.exists()).toBe(true)
    expect(inputField.element.value).toBe('New Task')

    // Update the task text and click Save
    await inputField.setValue('Updated Task')
    const saveButton = wrapper.find('li button.text-green-500')
    await saveButton.trigger('click')

    // Check if the task was updated
    expect(wrapper.find('li').text()).toContain('Updated Task')
  })

  /* This test adds a task, then clicks the li to toggle it as done,
  it checks if the .completed class has been added */
  it('marks a task as completed', async () => {
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await wrapper.find('button').trigger('click')

    await wrapper.find('li span').trigger('click') // Toggle task completion
    expect(wrapper.find('li span').classes()).toContain('completed')
  })
})
