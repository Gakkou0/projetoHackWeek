import { goals, goal, createGoal, updateGoal, deleteGoal } from './goals'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('goals', () => {
  scenario('returns all goals', async (scenario) => {
    const result = await goals()

    expect(result.length).toEqual(Object.keys(scenario.goal).length)
  })

  scenario('returns a single goal', async (scenario) => {
    const result = await goal({ id: scenario.goal.one.id })

    expect(result).toEqual(scenario.goal.one)
  })

  scenario('creates a goal', async () => {
    const result = await createGoal({
      input: { description: 'String' },
    })

    expect(result.description).toEqual('String')
  })

  scenario('updates a goal', async (scenario) => {
    const original = await goal({ id: scenario.goal.one.id })
    const result = await updateGoal({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a goal', async (scenario) => {
    const original = await deleteGoal({ id: scenario.goal.one.id })
    const result = await goal({ id: original.id })

    expect(result).toEqual(null)
  })
})
