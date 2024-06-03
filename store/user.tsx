import { createContext, useState} from "react";

export const userContext = createContext({
    siv:false,
    name: "",
    isLoggedIn:false,
    pdf:"",
    setSiv:(sid:boolean)=>{},
    setName:(name:string) =>{},
    setAuthState:(auth:boolean)=>{},
    setPdf:(pdf:string)=>{}
})


function UserContextProvider({children}:any) {
    const [siv,setSIV] = useState(false)
    const [name,setNAME] = useState("")
    const [isLoggedIn,setAUTHSTATE] = useState(false)
    const [pdf,setPDF] = useState("")

    function setSiv(sid:boolean){
        setSIV(sid)
    }

    function setName(name:string){
        setNAME(name)
    }

    function setAuthState(state:boolean) {
        setAUTHSTATE(state)
    }

    function setPdf(pdf:string) {
        setPDF(pdf)
    }

     return (
        <userContext.Provider value={{name,setName,siv,setSiv,isLoggedIn,setAuthState,pdf,setPdf}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider