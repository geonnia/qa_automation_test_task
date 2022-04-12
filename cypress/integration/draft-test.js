import LoginPage from '../support/page-objects/Login-page';


/// <reference types = "cypress" />

describe('Verify Login Form', () => {

    beforeEach(function(){
        const loginPage = new LoginPage()
        loginPage.visitLoginPage();
    })

    it('Try to login with valid credentials', () => {

        cy.get('[placeholder = Username]').type('username').should('be.visible')
        cy.get('[placeholder = Password]').type('password').should('be.visible')
        cy.get('form[action $= "registerlogin.php"]').submit()
        cy.request({
            url: '/qa-portal/registerlogin/registerlogin.php',
           // followRedirect: false, // turn off following redirects
          }).then((resp) => {
            // redirect status code is 302
            expect(resp.status).to.eq(302)
            //expect(resp.redirectedToUrl).to.eq('http://localhost:8082/unauthorized')
          })
        
    });

    it('Try to login with unvalid credentials', () => {
        cy.get('[placeholder = Username]').type('username').should('be.visible')
        cy.get('[placeholder = Password]').type('password').should('be.visible')
        cy.get('[value = Login]').should('be.visible').click()
        //cy.get('.has-error > .help-block').should('have.text', "No account found with that username.")
        
    });
    it('Trying to login with empty text inputs', () => {
        cy.get('[placeholder = Username]').should('be.visible')
        cy.get('[placeholder = Password]').should('be.visible')
        cy.get('[value = Login]').should('be.visible').click()

        cy.get('.has-error').as('error-container')
        cy.get('@error-container').find('[placeholder = Username] + .help-block').should('have.text', "Please enter username.")
        
        cy.get('@error-container').find('[placeholder = Password] + .help-block').should('have.text', "Please enter your password.")

        
        // cy.get(':nth-child(1) > .help-block').should('have.text', "Please enter username.")
        // cy.get(':nth-child(2) > .help-block').should('have.text', "Please enter your password.")

    });
})