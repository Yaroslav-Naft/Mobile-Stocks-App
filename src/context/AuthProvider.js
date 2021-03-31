import React, { createContext, useState, useMemo } from "react"
import { useContext } from "react/cjs/react.development"

export const AuthContext = createContext([])

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const userContext = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <AuthContext.Provider value={userContext}>{children}</AuthContext.Provider>
  )
}
