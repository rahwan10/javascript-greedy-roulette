describe('베팅 흐름 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('베팅 시작 시', () => {
    beforeEach(() => {
      cy.get('#color-select').select('YELLOW');
      cy.get('#bet-amount').type('1000');
      cy.get('#bet-button').click();
    });

    it('자금이 베팅 금액만큼 차감된다', () => {
      cy.get('#current-money').should('have.text', '9,000');
    });

    it('베팅 버튼이 비활성화된다', () => {
      cy.get('#bet-button').should('be.disabled');
    });

    it('게임 중단 버튼이 비활성화된다', () => {
      cy.get('#stop-button').should('be.disabled');
    });

    it('결과 박스에 "룰렛을 돌리는 중..." 메시지가 표시된다', () => {
      cy.get('#result-box').should('be.visible');
      cy.get('.spinning').should('contain', '룰렛을 돌리는 중...');
    });
  });

  describe('베팅 완료 후 (2초 후)', () => {
    beforeEach(() => {
      cy.get('#color-select').select('YELLOW');
      cy.get('#bet-amount').type('1000');
      cy.get('#bet-button').click();
      cy.wait(2500);
    });

    it('라운드가 1 증가한다', () => {
      cy.get('#current-round').should('have.text', '1');
    });

    it('결과 박스에 룰렛 결과가 표시된다', () => {
      cy.get('#result-content').should('contain', '룰렛 결과:');
    });

    it('결과 색상이 표시된다', () => {
      cy.get('.result-color').should('exist');
    });

    it('베팅 버튼이 다시 활성화된다', () => {
      cy.get('#bet-button').should('not.be.disabled');
    });

    it('게임 중단 버튼이 다시 활성화된다', () => {
      cy.get('#stop-button').should('not.be.disabled');
    });
  });

  describe('베팅 성공 시', () => {
    it('승리 메시지와 배당금이 표시된다', () => {
      cy.get('#color-select').select('YELLOW');
      cy.get('#bet-amount').type('1000');
      cy.get('#bet-button').click();
      cy.wait(2500);

      cy.get('#result-content').then(($content) => {
        const text = $content.text();
        if (text.includes('베팅 성공')) {
          cy.get('.win').should('contain', '베팅 성공');
          cy.get('.win').should('contain', '+');
        }
      });
    });
  });

  describe('베팅 실패 시', () => {
    it('실패 메시지와 손실 금액이 표시된다', () => {
      cy.get('#color-select').select('YELLOW');
      cy.get('#bet-amount').type('1000');
      cy.get('#bet-button').click();
      cy.wait(2500);

      cy.get('#result-content').then(($content) => {
        const text = $content.text();
        if (text.includes('베팅 실패')) {
          cy.get('.lose').should('contain', '베팅 실패');
          cy.get('.lose').should('contain', '-1,000원');
        }
      });
    });
  });

  describe('연속 베팅', () => {
    it('여러 번 연속으로 베팅할 수 있다', () => {
      cy.get('#color-select').select('YELLOW');
      cy.get('#bet-amount').type('1000');
      cy.get('#bet-button').click();
      cy.wait(2500);

      cy.get('#current-round').should('have.text', '1');

      cy.get('#color-select').select('GREEN');
      cy.get('#bet-amount').clear().type('500');
      cy.get('#bet-button').click();
      cy.wait(2500);

      cy.get('#current-round').should('have.text', '2');
    });
  });

  describe('스핀 중 재클릭 방지', () => {
    it('스핀 중에는 베팅 버튼이 비활성화되어 중복 클릭이 방지된다', () => {
      cy.get('#color-select').select('YELLOW');
      cy.get('#bet-amount').type('1000');
      cy.get('#bet-button').click();

      cy.get('#bet-button').should('be.disabled');
      cy.get('#current-money').should('have.text', '9,000');
    });
  });
});
