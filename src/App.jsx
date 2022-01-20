// #region 'Importing'
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

import MainMenu from './Pages/MainMenu'
import Login from './Pages/Login'
import Error from './Pages/Error'
import NewUser from './Components/Modals/NewUser'
// #endregion

function App() {

  // #region 'State Object'
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])

  const [currentUser, setCurrentUser] = useState(null)  
  const [modal, setModal] = useState('')
  // #endregion

  // #region 'Server Functions'
  function getUsersFromServer() {

    fetch('http://localhost:4000/users')
      .then(resp => resp.json())
      .then(usersFromServer => setUsers(usersFromServer))

  }

  function getMessagesFromServer() {

    fetch('http://localhost:4000/messages')
      .then(resp => resp.json())
      .then(messagesFromServer => setMessages(messagesFromServer))

  }

  function getConversationsFromServer() {

    fetch('http://localhost:4000/conversations')
      .then(resp => resp.json())
      .then(conversationsFromServer => setConversations(conversationsFromServer))

  }

  useEffect(getUsersFromServer, [])
  useEffect(getConversationsFromServer, [])
  useEffect(getMessagesFromServer, [])
  // #endregion

  const navigate = useNavigate()

  function logIn (user) {

    // setting user so we can track who is logged in
    setCurrentUser(user)

    // navigate to the main page
    navigate('/logged-in')

  }

  function logOut () {

    //after we logout the state resets so now we are in login page redirected
    setCurrentUser(null)

  }

  // #region 'Returning Html'
  return (

      <>

        {
          // #region 'Routes of App'
        }
        <Routes>

          <Route
            index
            element={<Navigate replace to="/login" />}
          />

          <Route 
              path='*' 
              element = {<Error/>
          }>
          </Route>

          <Route 
            path='/logged-in' 
            element = {
              <MainMenu 
                messages = {messages}
                conversations = {conversations}
                logOut = {logOut}
                users = {users}
                currentUser = {currentUser}
                setConversations ={setConversations}/>
          }>
          </Route>

          <Route 
            path='/login' 
            element = {
              <Login 
                users = {users}
                setModal = {setModal}
                logIn = {logIn}/>
          }>
          </Route>

          <Route
          path='/logged-in/:conversationId'
          element={
            <MainMenu 
              currentUser={currentUser} 
              // logOut={logOut} 
              users={users} />
            }
        />

        </Routes>
        {
          //#endregion
        }
  
        {modal === 'newUser' ? (

          <NewUser 
            setModal = {setModal}
            users = {users}
            setUsers = {setUsers}
          />
          
        ) : null}

      </>

  )
  // #endregion

}

export default App