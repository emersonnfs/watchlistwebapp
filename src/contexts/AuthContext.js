'use client'
import { LoginUsuario,LogoutUsuario,RegistarUsuario } from "@/actions/usuario"
import { createContext, useState } from "react"

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null)
    
    const login = async (email, senha) => {
        const usuario = await LoginUsuario(email, senha)
        setUsuario(usuario)
    }
    
    const logout = async () => {
        await LogoutUsuario()
        setUsuario(null)
    }
    
    const registrar = async (nome, email, senha) => {
        await RegistarUsuario(nome, email, senha)
    }
    
    return (
        <AuthContext.Provider value={{ usuario, login, logout, registrar }}>
        {children}
        </AuthContext.Provider>
    )
    }