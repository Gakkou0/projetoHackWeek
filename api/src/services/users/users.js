import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  meetingsAsAdvisor: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).meetingsAsAdvisor()
  },
  meetingsAsCoadvisor: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).meetingsAsCoadvisor()
  },
  meetingsAsStudent: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).meetingsAsStudent()
  },
  goals: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).goals()
  },
}
