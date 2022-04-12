import LoginPage from '../pages/Login-page';


/// <reference types = "cypress" />

describe('Verify Login Form', () => {

    beforeEach(function(){
        LoginPage.visitLoginPage();
    })

    it('Try to login with unvalid credentials', () => {
        LoginPage.typeUsername(Cypress.env("username"))
        LoginPage.typePassword(Cypress.env("password"))
        LoginPage.submitForm()
        LoginPage.elements.errorMessageUsername().should('have.text', "No account found with that username.")
        
    });
    it('Trying to login with empty text inputs', () => {
        LoginPage.typeUsername(' ')
        LoginPage.typePassword(' ')
        LoginPage.submitForm()
        LoginPage.elements.errorMessageUsername().should('have.text', "Please enter username.")
        LoginPage.elements.errorMessagePassword().should('have.text', "Please enter your password.")
    });

    it('Try to login with unvalid password', () => {
        LoginPage.typeUsername(Cypress.env("validUsername"))
        LoginPage.typePassword(Cypress.env("password"))
        LoginPage.submitForm()
        LoginPage.elements.errorMessagePassword().should('have.text', "The password you entered was not valid.")
        
    });
})