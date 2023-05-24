import { render } from '@redwoodjs/testing/web'

import ProjectPage from './ProjectPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProjectPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectPage />)
    }).not.toThrow()
  })
})
