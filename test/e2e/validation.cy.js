describe("유효성 검사 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.stubAlert();
  });

  describe("색상 미선택", () => {
    it("색상을 선택하지 않으면 alert가 표시된다", () => {
      cy.get("#bet-amount").type("1000");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });

    it("에러 발생 시 자금이 차감되지 않는다", () => {
      cy.get("#bet-amount").type("1000");
      cy.get("#bet-button").click();

      cy.get("#current-money").should("have.text", "10,000");
    });
  });

  describe("금액 미입력", () => {
    it("금액을 입력하지 않으면 alert가 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });
  });

  describe("유효하지 않은 금액 입력", () => {
    it("0원을 입력하면 alert가 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("0");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });

    it("음수를 입력하면 alert가 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("-100");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });

    it("소수를 입력하면 alert가 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("1.5");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });

    it("지수 표기법을 입력하면 alert가 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("1e2");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });
  });

  describe("보유 금액 초과", () => {
    it("보유 금액을 초과하면 alert가 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("20000");
      cy.get("#bet-button").click();

      cy.shouldShowAlert();
    });

    it("정확히 보유 금액만큼은 베팅 가능하다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("10000");
      cy.get("#bet-button").click();

      cy.shouldNotShowAlert();
      cy.get("#current-money").should("have.text", "0");
    });
  });

  describe("alert 초기화", () => {
    it("유효한 베팅 시 alert가 표시되지 않는다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("1000");
      cy.get("#bet-button").click();

      cy.shouldNotShowAlert();
    });
  });
});
