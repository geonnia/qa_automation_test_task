class LoginPage{
    visitLoginPage(){
        cy.visit(Cypress.env("baseUrl"))
    }
    elements = {
        logoImg: () => cy.get('#logomini'),
        pageTitle: () => cy.get('h1'),
        usernameInput: () =>  cy.get('[placeholder = Username]'),
        passwordInput: () =>  cy.get('[placeholder = Password]'),
        loginButton: () =>  cy.get('[value = Login]'),
        errorMessageUsername: () =>  cy.get('.has-error [placeholder = Username] + .help-block'),
        errorMessagePassword: () =>  cy.get('.has-error [placeholder = Password] + .help-block')
    }

    checkPageElememtsVisibility(){
        this.elements.logoImg().should('be.visible')
        this.elements.pageTitle().should('be.visible')
        this.elements.usernameInput().should('be.visible')
        this.elements.passwordInput().should('be.visible')
        this.elements.loginButton().should('be.visible')
        
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