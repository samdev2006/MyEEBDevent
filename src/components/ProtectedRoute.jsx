import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children, user}) {
  // 1. Si l'utilisateur n'est pas connecté du tout
  if (!user) {
    return <Navigate to='/Loginandregister' replace/>
  }

  // 2. Si l'utilisateur est connecté mais n'a pas validé son mail
  if (!user.emailVerified) {
    return <Navigate to='/Loginandregister' replace/>
  }

 
  return children
}

export default ProtectedRoute