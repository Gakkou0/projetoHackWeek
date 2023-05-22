import { render } from '@redwoodjs/testing/web'

import HistoricPage from './HistoricPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HistoricPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HistoricPage />)
    }).not.toThrow()
  })
})
