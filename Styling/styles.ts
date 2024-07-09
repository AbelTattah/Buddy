// Purpose: This file contains the styles for the entire application. It is imported into the components that need it.
import { StyleSheet, StatusBar } from 'react-native'
import Colors from '../colors/colors'


// Styles for the entire application
const styles = StyleSheet.create({
  Homepage: {
    backgroundColor: 'white',
    flex: 1
  },
  dashboardTopSection: {
    height: 60,
    backgroundColor: '#7979FF8e'
  },
  dashboardName: {
    color: 'black',
    fontFamily: 'FredokaBold',
    fontSize:28,
    position: 'absolute',
    top: -0,
    left: 50,
    marginTop: 20
  },
  LobbyUpdates: {
    marginTop: 90,
    borderRadius: 20,
  },
  LobbyUpdateInner: {
    height: 400,
    width: 320,
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden'
  },
  LobbyMinButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aaa',
    marginTop: 10,
    width: 140,
    borderRadius: 10
  },
  contentContainer1: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    height: 250,
    width: 340,
    padding: 0,
    justifyContent: 'center',
    marginBottom: 10,
    position: 'absolute',
    top: 120
  },
  lobbyQuick: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  lobbyQuickButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#7979FF8e',
    marginTop: 10,
    borderBottomRightRadius: 0,
    borderTopEndRadius: 0,
    marginBottom: 5
  },
  lobbyQuickButton0: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 90,
    backgroundColor: '#7979FF8e',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopStartRadius: 0,
    borderLeftWidth: 0,
    marginTop: 10,
    marginBottom: 5
  },
  LobbyQuickButtonText: {
    fontSize: 18,
    fontFamily: 'FredokaBold'
  },
  lobbyGreeting: {
    marginTop: 10,
    marginLeft: 44,
    fontSize: 28,
    fontFamily: 'FredokaBold'
  },
  lobbyWeather: {
    position: 'absolute',
    top: 200,
    left: 60
  },
  lobbyMiniUpdates: {
    flex: 2
  },
  lobbyMiniUpdates1: {
    marginTop: 30,
    height: 150,
    width: 300,
    flex: 0.4,
    marginBottom: -110
  },
  lobbyMiniUpdatesTop: {
    flex: 1,
    flexDirection: 'row',
    height: 300,
    justifyContent: 'space-evenly',
    width: 320,
    marginBottom: 31
  },
  container1: {
    flex: 5,
    paddingTop: StatusBar.currentHeight,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 40,
    height: 300,
    paddingBottom: 30
  },
  scrollView1: {
    backgroundColor: 'white',
    marginHorizontal: 0
  },
  text1: {
    width: 270,
    fontFamily: 'FredokaLight',
    padding: 15,
    fontSize: 17,
    margin: 10,
    backgroundColor: '#ddd',
    borderRadius: 10
  },
  meContentContainer: {
    flex: 1,
    width: 600,
    height: 600
  },
  uSection: {
    flex: 3,
    height: 100,
    width: 600,
    marginTop: -40
  },
  meMiddeSection: {
    flex: 1.5,
    height: 100,
    width: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 70,
    marginTop: -50
  },
  meBottomSection: {
    flex: 1,
    height: 80,
    width: 300,
    margin: 20,
    borderWidth: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  me: {
    backgroundColor: 'white',
    flex: 6,
    width:"100%",
    paddingTop:100,
    alignItems: 'center'
  },
  meTopButtons: {
    width: 300,
    height: 86,
    backgroundColor: "#fff",
    borderColor: "#00f",
    elevation:3,
    borderWidth:0.3,
    borderRadius:3,
    justifyContent: "center",
    margin: 10,
    marginRight: 10,

  },
  meTopButtonView: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  meTopButtonText: {
    justifyContent: 'center',
    color: 'black',
    marginLeft:50,
    fontSize: 13,
    fontFamily: 'FredokaBold'
  },
  meMiddleButtons: {
    width: 300,
    height: 36,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 20
  },
  meMiddleButtonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  meMiddleButtonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  meMiddeTopText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 17
  },
  meTopText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: -37,
    marginTop: -4
  },
  Input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  personalTimetableTopButton: {
    width: 300,
    height: 200,
    margin: 300
  },
  personalTimetableTopButtonView: {
    margin: 22,
    gap: 5,
    marginLeft: 300
  },
  perTMainview: {
    height: 460,
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: '#ccc',
    gap: 20
  },
  perTviews: {
    height: 40,
    width: 340,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: '#ccc',
    gap: 10
  },
  perT: {
    fontFamily: 'FredokaBold'
  },
  
  // Login Page
  loginLogo: {
    marginTop: 10,
    marginBottom: 30
  },
  loginLogoText: {
    fontSize: 99,
    fontFamily: 'FredokaBold',
    color: 'black'
  },
  loginMain: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  loginIn: {
    gap: 40,
    margin: 23
  },
  loginButton: {
    height: 52,
    width:300,
    backgroundColor: '#222',
    elevation:2,
    borderWidth:0.4,
    borderColor:"#00f",
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
    marginRight: 10,
  },
  option: {
    fontSize: 18,
    fontWeight: "400",
  },
  button: {
    width: "100%",
    height: 70,
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button1: {
    width: "100%",
    height: 120,
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  theme: {
    width: "90%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    marginBottom: 60,
    marginTop:-50,
    fontSize: 25,
    fontWeight:"800"

  },
  loginRegisterLines:{
    marginTop:10,
    width:"19%",
    margin:15,
    height:"5%",
    backgroundColor:"#ccc"
  },
  loginTextIn: {
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor:"#fff",
    width: 300,
    height: 50,
    paddingHorizontal: 10,
    borderColor:"#999",
    color: 'black'
  },
  regButtonView: {
    flexDirection: 'row',
    marginTop: 20
  },
  loginReg: {
    backgroundColor: 'white',
    marginTop:30,
    marginBottom:30
  },

  // Register
  regCheckmain: {
    width:"100%",
    justifyContent:"center",
    alignItems:'center',
    flex: 0.4,
    gap: 10,
    marginBottom: 0
  },
  RegginLogo: {
    marginTop: 10,
    marginBottom: 30
  },
  ReggLogoText: {
    fontSize: 34,
    elevation: 5,
    fontFamily: 'FredokaBold',
   color:'black',
    marginRight: 25
  },
  ReggMain: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 0,
    alignItems: 'center'
  },
  ReggIn: {
    gap: 40,
    margin: 13
  },
  ReggButton: {
    width: 300,
    height: 40,
    backgroundColor: '#2407f2',
    borderRadius: 30
  },
  ReggTextIn: {
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor:"#fff",
    width: 300,
    height: 50,
    paddingHorizontal: 10,
    borderColor:"#999",
    color: 'black'
  },
  loginButtonText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#ddd',
    fontSize:17,
    fontWeight:"500"
  },
  ReggButtonView: {
    gap: 20,
    marginTop: 60
  },
  loginTextt1: {
    marginTop: 10,
    color: '#2407f2',
    marginBottom: 20
  },
  loginTextt2: {
    color: '#2407f2'
  },

  loginRegText: {
    color: '#000'
  },

  regCheck: {
    flexDirection: 'row',
    marginRight: 199,
    gap: 5
  },
  regCheck1: {
    flexDirection: 'row',
    gap: 18
  },
  regCheck2: {
    flexDirection: 'row',
    gap: 6
  },

  // navigation

  directionModal: {
    backgroundColor: '#adcbfb',
    height: '45%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
