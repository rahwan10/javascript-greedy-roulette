// alert 스텁 설정
Cypress.Commands.add("stubAlert", () => {
  cy.window().then((win) => {
    cy.stub(win, "alert").as("alertStub");
  });
});

// alert가 호출되었는지 확인
Cypress.Commands.add("shouldShowAlert", () => {
  cy.get("@alertStub").should("have.been.called");
});

// alert가 호출되지 않았는지 확인
Cypress.Commands.add("shouldNotShowAlert", () => {
  cy.get("@alertStub").should("not.have.been.called");
});
