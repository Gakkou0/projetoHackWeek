import { render } from '@redwoodjs/testing/web'

import TestePage from './TestePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TestePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TestePage />)
    }).not.toThrow()
  })
})
