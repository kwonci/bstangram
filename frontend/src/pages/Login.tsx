import { useEffect } from "react"
import jwt_decode from "jwt-decode"

export const Login: React.FC = () => {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "227413558974-lekbbtglqc3hfinte16re4cu8l7k5osh.apps.googleusercontent.com",
      callback: res => {
        const token = res.credential
        console.log(jwt_decode(token))
      }
    })
    google.accounts.id.renderButton(
      document.getElementById("g_id_onload")!,
      {theme: "outline", size: "large", type: "standard"}
    )
  }, [])
  return <div id="g_id_onload" />
}
