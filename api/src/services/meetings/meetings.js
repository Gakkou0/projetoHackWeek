import { db } from 'src/lib/db'

export const meetings = () => {
  return db.meeting.findMany()
}

export const meeting = ({ id }) => {
  return db.meeting.findUnique({
    where: { id },
  })
}

export const createMeeting = ({ input }) => {
  return db.meeting.create({
    data: input,
  })
}

export const updateMeeting = ({ id, input }) => {
  return db.meeting.update({
    data: input,
    where: { id },
  })
}

export const deleteMeeting = ({ id }) => {
  return db.meeting.delete({
    where: { id },
  })
}

export const Meeting = {
  advisor: (_obj, { root }) => {
    return db.meeting.findUnique({ where: { id: root?.id } }).advisor()
  },
  coadvisor: (_obj, { root }) => {
    return db.meeting.findUnique({ where: { id: root?.id } }).coadvisor()
  },
  student: (_obj, { root }) => {
    return db.meeting.findUnique({ where: { id: root?.id } }).student()
  },
}
