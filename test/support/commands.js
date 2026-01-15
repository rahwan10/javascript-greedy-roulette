// 베팅하기
Cypress.Commands.add("placeBet", (color, amount) => {
  cy.get("#color-select").select(color);
  cy.get("#bet-amount").clear().type(amount.toString());
  cy.get("#bet-button").click();
});

// 스핀 완료 대기
Cypress.Commands.add("waitForSpinComplete", () => {
  cy.wait(2500);
  cy.get("#bet-button").should("not.be.disabled");
});

// 베팅 후 스핀 완료까지 대기
Cypress.Commands.add("placeBetAndWait", (color, amount) => {
  cy.placeBet(color, amount);
  cy.waitForSpinComplete();
});

// 게임 종료
Cypress.Commands.add("endGame", () => {
  cy.get("#stop-button").click();
});

// 게임 재시작
Cypress.Commands.add("restartGame", () => {
  cy.get("#restart-button").click();
});

// 현재 자금 가져오기
Cypress.Commands.add("getCurrentMoney", () => {
  return cy
    .get("#current-money")
    .invoke("text")
    .then((text) => {
      return parseInt(text.replace(/,/g, ""), 10);
    });
});

// 현재 라운드 가져오기
Cypress.Commands.add("getCurrentRound", () => {
  return cy
    .get("#current-round")
    .invoke("text")
    .then((text) => {
      return parseInt(text, 10);
    });
});

// alert 스텁 설정
Cypress.Commands.add("stubAlert", () => {
  cy.window().then((win) => {
    cy.stub(win, "alert").as("alertStub");
  });
});

// alert 메시지 확인
Cypress.Commands.add("shouldShowAlert", (message) => {
  cy.get("@alertStub").should("have.been.calledWith", message);
});

// alert가 호출되지 않았는지 확인
Cypress.Commands.add("shouldNotShowAlert", () => {
  cy.get("@alertStub").should("not.have.been.called");
});

// 결과 확인 (승리)
Cypress.Commands.add("shouldShowWin", () => {
  cy.get(".win").should("contain", "베팅 성공");
});

// 결과 확인 (패배)
Cypress.Commands.add("shouldShowLose", () => {
  cy.get(".lose").should("contain", "베팅 실패");
});

// 게임 종료 화면 확인
Cypress.Commands.add("shouldShowGameOver", () => {
  cy.get(".final-result").should("contain", "게임 종료");
});

// 초기 상태 확인
Cypress.Commands.add("shouldBeInitialState", () => {
  cy.get("#current-money").should("have.text", "10,000");
  cy.get("#current-round").should("have.text", "0");
  cy.get("#bet-button").should("not.be.disabled");
  cy.get("#stop-button").should("not.be.disabled");
  cy.get("#restart-button").should("not.be.visible");
  cy.get("#color-select").should("have.value", "");
  cy.get("#bet-amount").should("have.value", "");
});
