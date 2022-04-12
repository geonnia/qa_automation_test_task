class LoginPage{
    visitLoginPage(){
        cy.visit(Cypress.env("baseUrl"))
    }
    elements = {
        usernameInput: () =>  cy.get('[placeholder = Username]'),
        passwordInput: () =>  cy.get('[placeholder = Password]'),
        loginButton: () =>  cy.get('[value = Login]'),
        errorMessageUsername: () =>  cy.get('.has-error [placeholder = Username] + .help-block'),
        errorMessagePassword: () =>  cy.get('.has-error [placeholder = Password] + .help-block')
    }

    typeUsername(username){
        this.elements.usernameInput().type(username)
    }

    typePassword(password){
        this.elements.passwordInput().type(password)
    }

    submitForm(){
        this.elements.loginButton().click()
    }

    



}
//export default LoginPage;
module.exports = new LoginPage();