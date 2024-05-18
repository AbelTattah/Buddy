import { createContext, useState} from "react";

export const userContext = createContext({
    sid:0,
    name: "",
    isLoggedIn:false,
    pdf:"",
    setSid:(sid:number)=>{},
    setName:(name:string) =>{},
    setAuthState:(auth:boolean)=>{},
    setPdf:(pdf:string)=>{}
})


function UserContextProvider({children}:any) {
    const [sid,setSID] = useState(0)
    const [name,setNAME] = useState("")
    const [isLoggedIn,setAUTHSTATE] = useState(false)
    const [pdf,setPDF] = useState("")

    function setSid(sid:number){
        setSID(sid)
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
        <userContext.Provider value={{name,setName,sid,setSid,isLoggedIn,setAuthState,pdf,setPdf}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider