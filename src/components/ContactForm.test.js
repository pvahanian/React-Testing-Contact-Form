import React from "react";
import * as rtl from '@testing-library/react' // import needed dependancy / react-testing methods /
// using RTL isnt nessecary if you want to bring in the specific screen firevent and render.
import ContactForm from "./ContactForm"; // Need to bring in what we're testing

test("renders Contactform on ContactForm Component", async () => { //this is the name of the test 
  // Arrange
    rtl.render(<ContactForm />); //Tells the test file what component we are looking to test this on
  // Act
  // These bring in their respective values of elements
  // they are later used to see if they can hold data and 
  // working properly

    const firstName = rtl.screen.getByLabelText(/first name/i);
    const lastName = rtl.screen.getByLabelText(/last name/i);
    const email = rtl.screen.getByLabelText(/Email*/i);
    const message = rtl.screen.getByLabelText(/message/i);
    const submitButton = rtl.screen.getByRole('button', {type: /submit/i});

    // Assert
    // Using FireEvent we change the values at the given element. 
    // Below we are changing email from "" to stevehouse@gmail.com
    rtl.fireEvent.change(email, {target: {name: 'email', value:'stevehouse@gmail.com'}})
    // We now test using expect the value of email to the string stevehouse@gmail.com to be
    // toTruthy
    expect(email.value === 'stevehouse@gmail.com').toBeTruthy()  

    rtl.fireEvent.change(firstName, {target: {name: 'firstName', value:'Steve'}})
    expect(firstName.value === 'Steve').toBeTruthy()   
    
    rtl.fireEvent.change(lastName, {target: {name: 'lastName', value:'IsABully'}})
    expect(lastName.value === 'IsABully').toBeTruthy()

    rtl.fireEvent.change(message, {target: { name: "message", value: "I am getting frustrated,ziggs ftw" },
    });
  
    //Again using fireEvent we fire off the button to submit the data we have set above
    rtl.fireEvent.click(submitButton);

    //We set a new varible to check to see if the value of steve is on the page
    //After we click the button.  If we dont update the maxLength to Minlength
    //This will throw an error
    const newPerson = await rtl.screen.findByText(/Steve/i);


});


