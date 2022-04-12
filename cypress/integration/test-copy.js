import LoginPage from '../pages/Login-page';


/// <reference types = "cypress" />

const noSuchAccountErrorMessage = "No account found with that username."
const emptyUsernameInputErrorMessage = "Please enter username."
const emptyPasswordInputErrorMessage = "Please enter your password."
const wrongPasswordErrorMessage = "The password you entered was not valid."

describe('Verify Login Form', () => {

    beforeEach(function(){
        LoginPage.visitLoginPage();
    })

    it('Verify that all the elements are present on the page.', () => {
        LoginPage.checkPageElememtsVisibility()
        
    });

    it('Try to login with unvalid credentials', () => {
        LoginPage.typeUsername(Cypress.env("username"))
        LoginPage.typePassword(Cypress.env("password"))
        LoginPage.submitForm()
        LoginPage.elements.errorMessageUsername().should('have.text', noSuchAccountErrorMessage)
        
    });
    it('Trying to login with empty text inputs', () => {
        LoginPage.typeUsername(' ')
        LoginPage.typePassword(' ')
        LoginPage.submitForm()
        LoginPage.elements.errorMessageUsername().should('have.text', emptyUsernameInputErrorMessage)
        LoginPage.elements.errorMessagePassword().should('have.text', emptyPasswordInputErrorMessage)
    });

    it('Try to login with unvalid password', () => {
        LoginPage.typeUsername(Cypress.env("validUsername"))
        LoginPage.typePassword(Cypress.env("password"))
        LoginPage.submitForm()
        LoginPage.elements.errorMessagePassword().should('have.text', wrongPasswordErrorMessage)
        
    });
})