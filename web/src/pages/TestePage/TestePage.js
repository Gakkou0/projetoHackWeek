import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Card from 'src/components/MeetingCard/MeetingCard'
import ModalForm from 'src/components/ModalForm/ModalForm'

const TestePage = () => {
  return (
    <>
      <MetaTags title="Teste" description="Teste page" />

      <Card cosupervisor={true} viewer={"any"} id={1}/>
      <ModalForm></ModalForm>
    </>
  )
}

export default TestePage
