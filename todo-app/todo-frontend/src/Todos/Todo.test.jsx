import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from './Todo'


test('renders Todo', () => {
  const todo = {
    text: 'Learn about containers',
    done: false
  }

  render(<Todo todo={todo} />)

  const element = screen.getByText('Learn about containers')
  expect(element).toBeDefined()
})


test('clicking the Set as done -button calls event handler once', async () => {
    const todo = {
        text: 'Learn about containers',
        done: false
    }

  const mockHandler = vi.fn()

  render(

    <Todo todo={todo} completeTodo={mockHandler} />
  )


  const user = userEvent.setup()
  const button = screen.getByText('Set as done')
  await user.click(button)


  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('clicking the delete-button calls event handler once', async () => {
    const todo = {
        text: 'Learn about containers',
        done: false
    }

  const mockHandler = vi.fn()

  render(

    <Todo todo={todo} deleteTodo={mockHandler} />
  )


  const user = userEvent.setup()
  const button = screen.getByText('Delete')
  await user.click(button)


  expect(mockHandler.mock.calls).toHaveLength(1)
})