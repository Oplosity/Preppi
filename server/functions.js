function userLogin(body) {
    try {
        console.log("Received login request.")
        const username = body.username;
        const password = body.password;

        // Login function
    
        console.log("Login successful.");
        return "Login Successful!\nusername: " + username + "\npassword: " + password;

    } catch (e) {
        console.error(e)
        return "Server error :(";
    }
}

function userRegister(body) {
    try {
        console.log("Received register request.")
        const username = body.username;
        const password = body.password;

        // Register function
    
        console.log("Register successful.");
        return "Register Successful!\nusername: " + username + "\npassword: " + password;

    } catch (e) {
        console.error(e)
        return "Server error :(";
    }
}

module.exports = { userLogin, userRegister };