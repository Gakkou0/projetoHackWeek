import { db } from 'src/lib/db'

export const goals = () => {
  return db.goal.findMany()
}

export const goal = ({ id }) => {
  return db.goal.findUnique({
    where: { id },
  })
}

export const createGoal = ({ input }) => {
  return db.goal.create({
    data: input,
  })
}

export const updateGoal = ({ id, input }) => {
  return db.goal.update({
    data: input,
    where: { id },
  })
}

export const deleteGoal = ({ id }) => {
  return db.goal.delete({
    where: { id },
  })
}

export const Goal = {
  user: (_obj, { root }) => {
    return db.goal.findUnique({ where: { id: root?.id } }).user()
  },
}
