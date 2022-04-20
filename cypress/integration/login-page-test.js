import LoginPage from '../pages/Login-page';

const noSuchAccountErrorMessage = 'No account found with that username.';
const emptyUsernameInputErrorMessage = 'Please enter username.';
const emptyPasswordInputErrorMessage = 'Please enter your password.';
const wrongPasswordErrorMessage = 'The password you entered was not valid.';
const pageErrorMessage = 'Oops! Something went wrong. Please try again later.';

describe('Test Login Form via PecodeSoftware', () => {
  beforeEach(() => {
    cy.fixture('userdata').then((data) => {
      globalThis.data = data;
    })
    LoginPage.visitLoginPage();
  });

  it('Verify that all the elements are present on the page.', () => {
    LoginPage.checkPageElementsVisibility();
  });

  it('Try to login with invalid credentials', () => {
    LoginPage.typeUsername(data.username);
    LoginPage.typePassword(data.password);
    LoginPage.submitForm();
    LoginPage.elements.errorMessageUsername().should('have.text', noSuchAccountErrorMessage);
  });
  it('Try to login with empty Username input', () => {
    LoginPage.typeUsername(' ');
    LoginPage.typePassword(data.password);
    LoginPage.submitForm();
    LoginPage.elements.errorMessageUsername().should('have.text', emptyUsernameInputErrorMessage);
  });

  it('Try to login with empty Password input', () => {
    LoginPage.typeUsername(data.username);
    LoginPage.typePassword(' ');
    LoginPage.submitForm();
    LoginPage.elements.errorMessagePassword().should('have.text', emptyPasswordInputErrorMessage);
  });

  it('Try to login with empty text inputs', () => {
    LoginPage.typeUsername(' ');
    LoginPage.typePassword(' ');
    LoginPage.submitForm();
    LoginPage.elements.errorMessageUsername().should('have.text', emptyUsernameInputErrorMessage);
    LoginPage.elements.errorMessagePassword().should('have.text', emptyPasswordInputErrorMessage);
  });

  it('Try to login with invalid password', () => {
    LoginPage.typeUsername(data.validUsername);
    LoginPage.typePassword(data.password);
    LoginPage.submitForm();
    LoginPage.elements.errorMessagePassword().should('have.text', wrongPasswordErrorMessage);
  });

  it('Try to login with UTF-8 symbols', () => {
    LoginPage.typeUsername(data.usernameUTF);
    LoginPage.typePassword(data.passwordUTF);
    LoginPage.submitForm();
    cy.get('body').contains(pageErrorMessage);
  });

  it('Check successful login', () => {
    LoginPage.typeUsername(data.validUsername);
    LoginPage.typePassword(data.password);
    LoginPage.submitForm();
    LoginPage.checkUrl();
  });
});
