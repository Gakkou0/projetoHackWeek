import {
  meetings,
  meeting,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from './meetings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('meetings', () => {
  scenario('returns all meetings', async (scenario) => {
    const result = await meetings()

    expect(result.length).toEqual(Object.keys(scenario.meeting).length)
  })

  scenario('returns a single meeting', async (scenario) => {
    const result = await meeting({ id: scenario.meeting.one.id })

    expect(result).toEqual(scenario.meeting.one)
  })

  scenario('creates a meeting', async (scenario) => {
    const result = await createMeeting({
      input: {
        datetime: '2023-05-21T00:01:52.645Z',
        location: 'String',
        advisorId: scenario.meeting.two.advisorId,
        studentId: scenario.meeting.two.studentId,
      },
    })

    expect(result.datetime).toEqual(new Date('2023-05-21T00:01:52.645Z'))
    expect(result.location).toEqual('String')
    expect(result.advisorId).toEqual(scenario.meeting.two.advisorId)
    expect(result.studentId).toEqual(scenario.meeting.two.studentId)
  })

  scenario('updates a meeting', async (scenario) => {
    const original = await meeting({ id: scenario.meeting.one.id })
    const result = await updateMeeting({
      id: original.id,
      input: { datetime: '2023-05-22T00:01:52.646Z' },
    })

    expect(result.datetime).toEqual(new Date('2023-05-22T00:01:52.646Z'))
  })

  scenario('deletes a meeting', async (scenario) => {
    const original = await deleteMeeting({
      id: scenario.meeting.one.id,
    })
    const result = await meeting({ id: original.id })

    expect(result).toEqual(null)
  })
})
