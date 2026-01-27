describe("재시작 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#stop-button").click();
  });

  it("자금이 10,000원으로 리셋된다", () => {
    cy.get("#restart-button").click();

    cy.get("#current-money").should("have.text", "10,000");
  });

  it("라운드가 0으로 리셋된다", () => {
    cy.get("#restart-button").click();

    cy.get("#current-round").should("have.text", "0");
  });

  it("게임 컨트롤이 다시 표시된다", () => {
    cy.get("#restart-button").click();

    cy.get("#game-controls").should("be.visible");
  });

  it("다시 시작 버튼이 숨겨진다", () => {
    cy.get("#restart-button").click();

    cy.get("#restart-button").should("not.be.visible");
  });

  it("색상 선택이 초기화된다", () => {
    cy.get("#restart-button").click();

    cy.get("#color-select").should("have.value", "");
  });

  it("베팅 금액이 초기화된다", () => {
    cy.get("#restart-button").click();

    cy.get("#bet-amount").should("have.value", "");
  });

  it("결과 박스가 숨겨진다", () => {
    cy.get("#restart-button").click();

    cy.get("#result-box").should("not.be.visible");
  });

  describe("베팅 후 재시작", () => {
    it("베팅 후 재시작해도 모든 상태가 초기화된다", () => {
      cy.get("#restart-button").click();

      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("5000");
      cy.get("#bet-button").click();
      cy.wait(2500);

      cy.get("#stop-button").click();
      cy.get("#restart-button").click();

      cy.get("#current-money").should("have.text", "10,000");
      cy.get("#current-round").should("have.text", "0");
      cy.get("#color-select").should("have.value", "");
      cy.get("#bet-amount").should("have.value", "");
    });
  });

  describe("여러 번 재시작", () => {
    it("여러 번 재시작해도 정상 작동한다", () => {
      cy.get("#restart-button").click();
      cy.get("#stop-button").click();

      cy.get("#restart-button").click();
      cy.get("#current-money").should("have.text", "10,000");

      cy.get("#stop-button").click();
      cy.get("#restart-button").click();
      cy.get("#current-money").should("have.text", "10,000");
    });
  });

  describe("재시작 후 게임 플레이", () => {
    it("재시작 후 정상적으로 베팅할 수 있다", () => {
      cy.get("#restart-button").click();

      cy.get("#color-select").select("GREEN");
      cy.get("#bet-amount").type("2000");
      cy.get("#bet-button").click();

      cy.get("#current-money").should("have.text", "8,000");
      cy.get("#result-content").should("contain", "룰렛을 돌리는 중...");
    });
  });
});
