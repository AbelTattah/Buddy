import { createContext,useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userContext = createContext({
    siv:false,
    name: "",
    isLoggedIn:false,
    pdf:"",
    url:"",
    theme:"light",
    statusBar:false,
    setStatusBar:(value:boolean)=>{},
    setTheme:(sid:string)=>{},
    setUrl:(url:string)=>{},
    setSiv:(sid:boolean)=>{},
    setName:(name:string) =>{},
    setAuthState:(auth:boolean)=>{},
    setPdf:(pdf:string)=>{}
})


function UserContextProvider({children}:any) {
    const [siv,setSIV] = useState(false)
    const [name,setNAME] = useState("")
    const [isLoggedIn,setAUTHSTATE] = useState(true)
    const [pdf,setPDF] = useState("")
    const [theme,setTHEME] = useState("light")
    const [statusBar,setStatusbar] = useState(false)
    const [url,setURL] = useState("")

    function setUrl(url:string){
        setURL(url)
    }

    async function setStatusBar(value:boolean) {
        setStatusbar(value)
        await AsyncStorage.setItem("status",`${value}`)
    }

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

    async function getStatus(){
        const data = await AsyncStorage.getItem("status")
        if (data==null) {
            return
        }
        else {
            if (data==`true`) {
                setStatusbar(true)
            } else {
                setStatusBar(false)
            }
        }
    }

    useEffect(()=>{
        getTheme()
        getStatus()
    },[])

     return (
        <userContext.Provider value={{url, setUrl, theme,statusBar,setStatusBar,setTheme,name,setName,siv,setSiv,isLoggedIn,setAuthState,pdf,setPdf}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider