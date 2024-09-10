import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native"
import  Entypo  from "react-native-vector-icons/Entypo"

const App = () => {
  // Set darkmode
  const [darkMode, setDarkMode] = useState(false)

  const colorBtnFunction = (darkMode) ? "#323e5e" : "#4b7bab"
  const colorBtnNum = (darkMode) ? "#3b4663" : "#3a5f70"
  const colorBtnOp = (darkMode) ? "#364f69" : "#5c8396"
  const colorResult = (darkMode) ? "#18313d" : "#86d3e3"
  const colorBtnTheme = (darkMode) ? "#6f97ab" : "#6f97ab"
  const colorIcon = (darkMode) ? "white" : "black"
  const colorHistoryText = (darkMode) ? "white" : "black"
  const colorResultText = (darkMode) ? "#59a4b3" : "#1e3c82"

  // Buttons
  const btnNum = [
    ["C", "Del"],
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, "."]
  ]
  const btnOp = ["+", "-", "*", "/", "="]

  // Events
  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")
  
  const calculator = () => {
    try {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
    } catch (error) {
      setCurrentNumber("Error");
    }
  }
  
  const handleInput = (btnPress:any) => {
    switch (btnPress) {
      case "+":
      case "-":
      case "*":
      case "/":
        // Vibration.vibrate(35)
        setCurrentNumber(currentNumber + btnPress)
        break;
      case "Del":
        setCurrentNumber(currentNumber.slice(0, -1))
        break
      case "C":
        setCurrentNumber("")
        setLastNumber("")
        break
      case "=":
        setLastNumber(currentNumber + "=")
        calculator()
        break
      default:
        setCurrentNumber(currentNumber + btnPress)
        break
    }
  }
  

  return ( 
    <View style={myStyle.container}>

      <View style={{...myStyle.containerResult, backgroundColor: colorResult}}>
        <TouchableOpacity 
          style={{...myStyle.btnTheme, backgroundColor: colorBtnTheme}}
          onPress={() => setDarkMode(!darkMode)}>
            <Entypo name={(darkMode) ? "light-up" : "moon"} size={40} style={{color: colorIcon}}/>
        </TouchableOpacity>
        <Text style={{...myStyle.historyText, color: colorHistoryText}}>{lastNumber}</Text>
        <Text style={{...myStyle.resultText, color: colorResultText}}>{currentNumber}</Text>
      </View>

      <View style={myStyle.containerBtn}>
        <View style={myStyle.containerBtnNum}>
          {
            btnNum.map((row, index) => 
            <View key={index} style={{...myStyle.containerRow, backgroundColor: (index==0)?colorBtnFunction:colorBtnNum}}>
              {
                row.map((item, index) => (
                  <TouchableOpacity key={index} style={myStyle.button} onPress={() => handleInput(item)}>
                    <Text style={{ ...myStyle.btnText, color: "black" }}>{item}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
            )
          }
        </View>

        <View style={myStyle.containerBtnOp}>
          {
            btnOp.map((item, idx) => (
              <TouchableOpacity key={idx} style={{ ...myStyle.button, backgroundColor: colorBtnOp }} onPress={() => handleInput(item)}>
                <Text style={{ ...myStyle.btnText, color: "black" }}>{item}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </View>
  )
}

export default App

const myStyle = StyleSheet.create({
  container: {
    flex: 1
  },

  containerResult: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-end"
  },

  containerBtn: {
    flex: 2,
    flexDirection: "row"
  },

  containerRow: {
    flex: 1,
    flexDirection: "row"
  },

  containerBtnNum: {
    flex: 3
  },

  containerBtnOp: {
    flex: 1
  },

  btnTheme: {
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 90,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start"
  },

  historyText: {
    fontSize: 30,
    marginRight: 10,
    fontWeight: "bold"
  },

  resultText: {
    fontSize: 55,
    margin: 15,
    fontWeight: "700"
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    fontSize: 30,
    fontWeight: "bold"
  },

  btnrow: {
    flex:1,
    flexDirection: "row"
  }
})