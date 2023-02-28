 export const  validate=(eventData) =>{
    
    const error = {};

    if (!eventData.departureDate) {
      error.departureDate = "departureDate is Required";
    }

    if (!eventData.endingDate) {
      error.endingDate = "endingDate is Required";
    }

    if (!eventData.tripName) {
      error.tripName = "tripName Required!";
    } else if (eventData.tripName.length < 15) {
      error.tripName = "tripName must be more than 15 characters";
    }

    if (!eventData.tripDescription) {
      error.tripDescription = "tripDescription is Required!";
    } else if (eventData.tripDescription.length < 50) {
      error.tripDescription =
        "tripDescription must be more than 50 characters";
    }
    if (!eventData.tripSnippet) {
      error.tripSnippet = "tripSnippet is Required!";
    } else if (eventData.tripSnippet.length < 60) {
      error.tripSnippet = "tripSnippet must be more than 60 characters";
    }
   
    return error;
  }



  export const validateDestination=(locations, activities, inputCount) =>{
    console.log(locations,'locations',activities,'activities',inputCount,'inputCount');
    console.log('validatttttttt');
    const error = {};

    if (locations.length !== inputCount) {
      error.locations = "locations is Required";
    }

    if (activities.length !== inputCount) {
      error.activities = "activities is Required!";
    }
    console.log(error,'error from validate in helper-utill');
    return error;
  }



    export const validateLogin=(values) =>{
    const error = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) {
      error.email = "Email Required!";
    } else if (!regex.test(values.email)) {
      error.email = "Enter a Valid Email";
    }

    if (!values.password) {
      error.password = "Password is Required!";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters";
    }

    return error;
  }



 export const validateSignup=(data)=> {
    console.log("log in validate of signup");
    console.log(data);
    console.log("log in validate of signup");
    const error = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const usernameRegex = /^[a-zA-Z0-9]$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!data.username) {
      error.username = "Username is Required";
    }
    // else if(!usernameRegex.test(data.username)){
    //   error.username=" Username can contain only alphanumeric characters"
    // }

    if (!data.email) {
      error.email = "Email Required!";
    } else if (!regex.test(data.email)) {
      error.email = "Enter a Valid Email";
    }

    if (!data.password) {
      error.password = "Password is Required!";
    } else if (data.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (data.password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters";
    }

    if (!data.confirmpassword) {
      error.confirmpassword = "ConfirmPassword is Required!";
    } else if (data.password !== data.confirmpassword) {
      error.confirmpassword = "Passwords do not match";
    }
    if (!data.phone) {
      error.phone = "Phone Number is Required!";
    } else if (!phoneRegex.test(data.phone)) {
      error.phone = "Enter a Valid Phone Number";
    }

    return error;
  }


 export const validateForgotPassword=(phone)=> {
    // const phoneRegex = /^\+91\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const phoneRegex = /^\+91\d{12}$/;
    const error = {};
    if (!phone === 0) {
      error.phone = "Phone Number is Required";
    } else if (phoneRegex.test(phone)) {
      error.phone = "Enter valid PhoneNumber";
    }
    return error;
  }