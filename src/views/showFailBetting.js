export default showFailBetting

function showFailBetting(RouletteColor,BettingMoney) {
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = `룰렛 결과: ${RouletteColor} <br>베팅 실패! -${Number(BettingMoney).toLocaleString()}원`;
}