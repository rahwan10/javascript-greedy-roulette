export default function showFailBetting(rouletteColor,bettingMoney) {
    const resultBox = document.getElementById("result-content");
    resultBox.innerHTML = `룰렛 결과:<span style="background-color: ${rouletteColor}">${rouletteColor}</span> <br>베팅 실패! -${Number(bettingMoney).toLocaleString()}원`;
}