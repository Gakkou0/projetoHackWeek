/* eslint-disable prettier/prettier */
// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Goals" titleTo="goals" buttonLabel="New Goal" buttonTo="newGoal">
        <Route path="/goals/new" page={GoalNewGoalPage} name="newGoal" />
        <Route path="/goals/{id:Int}/edit" page={GoalEditGoalPage} name="editGoal" />
        <Route path="/goals/{id:Int}" page={GoalGoalPage} name="goal" />
        <Route path="/goals" page={GoalGoalsPage} name="goals" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Meetings" titleTo="meetings" buttonLabel="New Meeting" buttonTo="newMeeting">
        <Route path="/meetings/new" page={MeetingNewMeetingPage} name="newMeeting" />
        <Route path="/meetings/{id:Int}/edit" page={MeetingEditMeetingPage} name="editMeeting" />
        <Route path="/meetings/{id:Int}" page={MeetingMeetingPage} name="meeting" />
        <Route path="/meetings" page={MeetingMeetingsPage} name="meetings" />
      </Set>
      <Route path="/my-page" page={MyPagePage} name="myPage" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
