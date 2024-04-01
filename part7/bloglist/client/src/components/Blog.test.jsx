import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, vi } from 'vitest'

test('renders title', () => {
  const blog = {
    title: "Things I Don't Know as of 2018.",
    author: 'Dan Abramov',
    url: 'https://dan-abramov.com',
    likes: 0,
  }

  render(<Blog blog={blog} />)
  const element = screen.getByText("Things I Don't Know as of 2018.")

  screen.debug(element)
  expect(element).toBeDefined()

  // const { container } = render(<Blog blog={blog} />)
  // const div = container.querySelector('.blog')
  // expect(div).toHaveTextContent("Things I Don't Know as of 2018.")
})

test('clicking the view button shows details', async () => {
  const blog = {
    title: "Things I Don't Know as of 2018.",
    author: 'Dan Abramov',
    url: 'https://dan-abramov.com',
    likes: 0,
    user: {},
  }

  // const mockHandler = vi.fn()

  const user = userEvent.setup()
  const { container } = render(
    <Blog blog={blog} user={{ username: 'mukeshsharma11' }} />
  )

  const view = screen.getByText('View')
  await user.click(view)

  const likes = container.querySelector('.likes')
  const url = container.querySelector('.url')

  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('clicking the like button twice calls event handler prop twice', async () => {
  const blog = {
    title: "Things I Don't Know as of 2018.",
    author: 'Dan Abramov',
    url: 'https://dan-abramov.com',
    likes: 0,
    user: {},
  }

  const user = userEvent.setup()
  const updateBlog = vi.fn()

  const { container } = render(
    <Blog
      blog={blog}
      user={{ username: 'mukeshsharma11' }}
      updateBlog={updateBlog}
    />
  )
  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlog).toHaveBeenCalledTimes(2)
})
