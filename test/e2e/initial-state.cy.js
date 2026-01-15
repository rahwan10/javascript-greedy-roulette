describe('초기 상태 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('초기 자금이 10,000원으로 표시된다', () => {
    cy.get('#current-money').should('have.text', '10,000');
  });

  it('초기 라운드가 0으로 표시된다', () => {
    cy.get('#current-round').should('have.text', '0');
  });

  it('베팅 버튼이 활성화 상태이다', () => {
    cy.get('#bet-button').should('not.be.disabled');
  });

  it('게임 중단 버튼이 활성화 상태이다', () => {
    cy.get('#stop-button').should('not.be.disabled');
  });

  it('다시 시작 버튼이 숨겨져 있다', () => {
    cy.get('#restart-button').should('not.be.visible');
  });

  it('결과 박스가 숨겨져 있다', () => {
    cy.get('#result-box').should('not.be.visible');
  });

  it('색상 선택이 기본값(빈 값)이다', () => {
    cy.get('#color-select').should('have.value', '');
  });

  it('베팅 금액이 비어있다', () => {
    cy.get('#bet-amount').should('have.value', '');
  });

  it('룰렛 캔버스가 올바른 크기로 표시된다', () => {
    cy.get('#roulette-canvas')
      .should('be.visible')
      .and('have.attr', 'width', '300')
      .and('have.attr', 'height', '300');
  });

  it('모든 색상 옵션이 표시된다', () => {
    const colors = ['YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'RED'];

    colors.forEach((color) => {
      cy.get('#color-select').find(`option[value="${color}"]`).should('exist');
    });
  });
});
