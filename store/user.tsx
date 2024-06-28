import { createContext,useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userContext = createContext({
    siv:false,
    name: "",
    isLoggedIn:false,
    pdf:"",
    theme:"light",
    setTheme:(sid:string)=>{},
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
    const [theme,setTHEME] = useState("light")

    async function setTheme(theme:string){
        setTHEME(theme)
        await AsyncStorage.setItem("theme",theme)
    }


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
    async function getTheme(){
        const data = await AsyncStorage.getItem("theme")
        if (data==null) {
            return
        }
        else {
            setTHEME(data)
        }
    }

    useEffect(()=>{
        getTheme()
    },[])

     return (
        <userContext.Provider value={{theme,setTheme,name,setName,siv,setSiv,isLoggedIn,setAuthState,pdf,setPdf}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider