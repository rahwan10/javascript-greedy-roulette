describe("게임 종료 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("게임 중단 버튼 클릭", () => {
    it("게임 컨트롤이 숨겨진다", () => {
      cy.get("#stop-button").click();

      cy.get("#game-controls").should("not.be.visible");
    });

    it("다시 시작 버튼이 표시된다", () => {
      cy.get("#stop-button").click();

      cy.get("#restart-button").should("be.visible");
    });

    it("결과 박스에 게임 종료 메시지가 표시된다", () => {
      cy.get("#stop-button").click();

      cy.get("#result-content").should("contain", "게임 종료");
    });

    it("최종 자금이 표시된다", () => {
      cy.get("#stop-button").click();

      cy.get("#result-content").should("contain", "최종 자금:");
      cy.get("#result-content").should("contain", "10,000원");
    });

    it("플레이한 라운드 수가 표시된다", () => {
      cy.get("#stop-button").click();

      cy.get("#result-content").should("contain", "플레이한 라운드:");
      cy.get("#result-content").should("contain", "0");
    });
  });

  describe("베팅 후 게임 중단", () => {
    it("베팅 후 현재 상태가 정확히 표시된다", () => {
      cy.get("#color-select").select("YELLOW");
      cy.get("#bet-amount").type("1000");
      cy.get("#bet-button").click();
      cy.wait(2500);

      cy.get("#stop-button").click();

      cy.get("#result-content").should("contain", "플레이한 라운드: 1");
    });
  });

  describe("자금 0원 시 자동 종료", () => {
    it("자금이 0원이 되면 게임이 자동으로 종료된다", () => {
      cy.get("#color-select").select("RED");
      cy.get("#bet-amount").type("10000");
      cy.get("#bet-button").click();
      cy.wait(2500);

      cy.get("#current-money").then(($money) => {
        const money = parseInt($money.text().replace(/,/g, ""), 10);
        if (money === 0) {
          cy.wait(2000);
          cy.get("#result-content").should("contain", "게임 종료");
          cy.get("#result-content").should("contain", "최종 자금: 0원");
        }
      });
    });

    it("파산 시 마지막 룰렛 결과가 먼저 표시된다", () => {
      cy.get("#color-select").select("RED");
      cy.get("#bet-amount").type("10000");
      cy.get("#bet-button").click();
      cy.wait(2500);

      cy.get("#current-money").then(($money) => {
        const money = parseInt($money.text().replace(/,/g, ""), 10);
        if (money === 0) {
          cy.get("#result-content").should("contain", "룰렛 결과:");
          cy.get("#result-content")
            .invoke("text")
            .should("match", /YELLOW|GREEN|BLUE|PURPLE|RED/);
        }
      });
    });

    it("파산 시 파산 안내 메시지가 표시된다", () => {
      cy.get("#color-select").select("RED");
      cy.get("#bet-amount").type("10000");
      cy.get("#bet-button").click();
      cy.wait(2500);

      cy.get("#current-money").then(($money) => {
        const money = parseInt($money.text().replace(/,/g, ""), 10);
        if (money === 0) {
          cy.get("#result-content").should("contain", "게임이 곧 종료됩니다.");
        }
      });
    });

    it("파산 후 2초 뒤에 게임 종료 화면으로 전환된다", () => {
      cy.get("#color-select").select("RED");
      cy.get("#bet-amount").type("10000");
      cy.get("#bet-button").click();
      cy.wait(2500);

      cy.get("#current-money").then(($money) => {
        const money = parseInt($money.text().replace(/,/g, ""), 10);
        if (money === 0) {
          cy.wait(2000);
          cy.get("#result-content").should("contain", "게임 종료");
        }
      });
    });
  });

  describe("게임 종료 후 상태", () => {
    beforeEach(() => {
      cy.get("#stop-button").click();
    });

    it("베팅 버튼에 접근할 수 없다", () => {
      cy.get("#game-controls").should("not.be.visible");
    });

    it("다시 시작 버튼만 클릭 가능하다", () => {
      cy.get("#restart-button").should("be.visible").and("not.be.disabled");
    });
  });
});
