export default function successBetting(rouletteColor,bonusMoney) {
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = `룰렛 결과: <span style="background-color: ${rouletteColor}">${rouletteColor}</span> <br>베팅 성공! +${bonusMoney.toLocaleString()}원`;
}
