const PasswordStrengthIndicator = ({password}) => {
    const getPasswordStrength = () => {
        const passwordLength = password.length;
        if(passwordLength < 1) {
            return '';
        }
        else if(passwordLength < 4) {
            return 'very weak';
        }
        else if (passwordLength < 8) {
            return 'weak';
        } else if (passwordLength < 12) {
            return 'medium';
        } else {
            return 'strong';
        }
    }

    const passwordStrength = getPasswordStrength()

    if(!passwordStrength) {
        <></>
    }
    return (
        <div className="password-strength">
            Strength: <span style={{fontWeight:"bold"}}>{passwordStrength}</span>
        </div>
    )
}

export default PasswordStrengthIndicator