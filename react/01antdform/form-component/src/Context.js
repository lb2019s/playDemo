import React from "react"

export const ThemeContext = React.createContext()
export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

export const UserContext = React.createContext({ name: 'zhangsan' })
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
