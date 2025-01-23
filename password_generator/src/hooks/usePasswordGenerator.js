import { useState } from "react"

const usePasswordGenerator = ( ) => {
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")

    const generatePassword = (checkboxData , length) => {
        let charset = '', generatePassword = ''

        const selectedOption = checkboxData.filter((item) => item.state === true)

        if(selectedOption.length === 0){
            setErrorMessage("Please select at least one option")
            setPassword('')
            return
        }

        selectedOption.forEach((option) => {
            switch(option.label){
                case "Include Uppercase Letters":
                    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    break;
                case "Include Lowercase Letters":
                    charset += 'abcdefghijklmnopqrstuvwxyz'
                    break;
                case "Include Numbers":
                    charset += '0123456789'
                    break;
                case "Include Symbols":
                    charset += '!@#$%^&*()'
                    break;
                default:
                    break;
            }
        })

        for (let index = 0; index < length;   index++) {
             const randomIndex = Math.floor(Math.random() * charset.length)
              generatePassword += charset[randomIndex]
            
           }
           setPassword(generatePassword)
           setErrorMessage('')

    }


    return {password,errorMessage,generatePassword}
}


export default usePasswordGenerator