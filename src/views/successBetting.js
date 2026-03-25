
import calculateBonusMoney from "../models/calculateBonusMoney.js"
function successBetting(RouletteColor,UserColor, BettingMoney) {
    const BonusMoney = calculateBonusMoney(UserColor, BettingMoney);
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = `룰렛 결과: ${RouletteColor} <br>베팅 성공! +${BonusMoney.toLocaleString()}원`;
    
    return BonusMoney;
}
export default successBetting