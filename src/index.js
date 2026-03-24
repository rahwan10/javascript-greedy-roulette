import getRouletteColor from "./models/getRouletteColor.js"
import successBetting from "./views/successBetting.js";
import failBetting from "./views/failBetting.js";
let UserAccount = 10000;
let CurrentRound = 0;

const BetBtn = document.getElementById("bet-button");
const StopBtn = document.getElementById("stop-button");
const RestartBtn = document.getElementById("restart-button");
const ColorSelect=document.getElementById("color-select");

function playBetting() {
    const UserColor = document.getElementById("color-select").value;
    const RouletteColor = getRouletteColor();
    const BettingMoney = document.getElementById("bet-amount").value;
    if (!isInputPossible(BettingMoney)) {
        alert("자금보다 작고 0보다 크게 설정해주세요!");
        return null;
    }
    if(!ColorSelect.value){
        alert("색상을 선택해주세요!");
        return null;
    }
    if(!isInt(BettingMoney)){
        alert("정수를 적어주세요");
        return null;
    }
    if(String(BettingMoney).toLowerCase().includes('e')){
        alert("지수 표기법으로 입력하지마세요");
        return null;
    }

    UserAccount -= BettingMoney;
    CurrentRound++;
    document.getElementById("current-money").innerHTML = `${UserAccount.toLocaleString()}`;
    waitingForResult();
    setTimeout((function () {
        if (UserColor === RouletteColor) {
            UserAccount += successBetting(RouletteColor,UserColor, BettingMoney);
        } else {
            failBetting(RouletteColor,BettingMoney);
        }
        document.getElementById("current-money").innerHTML = `${UserAccount.toLocaleString()}`;
        document.getElementById("current-round").innerHTML = `${CurrentRound}`;
        document.getElementById("bet-amount").value = null;
        if (UserAccount <= 0) {
            const ResultBox = document.getElementById("result-content");
            ResultBox.innerHTML = `룰렛 결과: ${RouletteColor} <br>베팅 실패! -${Number(BettingMoney).toLocaleString()}원`;
            stopPlayBetting(UserAccount);
        } else {
            BetBtn.disabled = false;
            StopBtn.disabled = false;

        }

    }), 2000)


}
// function successBetting(RouletteColor,UserColor, BettingMoney) {
//     const BonusMoney = calculateBonusMoney(UserColor, BettingMoney);
//     const ResultBox = document.getElementById("result-content");
//     ResultBox.innerHTML = `룰렛결과:${RouletteColor}<br>베팅 성공! +${BonusMoney}원`;
//     return BonusMoney;
// }
// function failBetting(RouletteColor,BettingMoney) {
//     const ResultBox = document.getElementById("result-content");
//     ResultBox.innerHTML = `룰렛결과: ${RouletteColor}<br>베팅 실패! -${BettingMoney}원`;
// }
function stopPlayBetting(UserAccount) {
    const ResultBox = document.getElementById("result-content");
    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML += `<br>`+"게임이 곧 종료됩니다.";
    setTimeout((function () {
        ResultBox.innerHTML = "게임 종료" + `<br>` + " 최종 자금: "+ UserAccount.toLocaleString() + "원 " + `<br>` + "플레이한 라운드: " + CurrentRound;
        BetBtn.style.display = 'none';
        StopBtn.style.display = 'none';
        RestartBtn.style.display = 'block';
        document.getElementById("game-controls").style.display = "none";
    }), 2000);

}
function waitingForResult() {
    const BetBtn = document.getElementById("bet-button");
    const StopBtn = document.getElementById("stop-button");
    const ResultBox = document.getElementById("result-content");
    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML = "룰렛을 돌리는 중...";
}
function restartBetting() {
    const ResultBox = document.getElementById("result-content");
    const ColorSelect=document.getElementById("color-select");
    ColorSelect.value="";
    BetBtn.disabled = false;
    StopBtn.disabled = false;
    BetBtn.style.display = 'block';
    StopBtn.style.display = 'block';
    RestartBtn.style.display = 'none';
    document.getElementById("game-controls").style.display = "block";
    ResultBox.innerHTML = "";
    CurrentRound = 0;
    UserAccount = 10000;
    document.getElementById("current-money").innerHTML = Number(UserAccount).toLocaleString();
    document.getElementById("current-round").innerHTML = CurrentRound;
    document.getElementById("bet-amount").value = null;
}
function isInputPossible(BettingMoney) {
    if (BettingMoney <= 0 || BettingMoney > UserAccount) {
        return false;
    }
    return true;
}
function isInt(BettingMoney){
    if(!(Number.isInteger(Number(BettingMoney)))){
        return false;
    }
    return true;

}



BetBtn.onclick = playBetting;
StopBtn.onclick = () => {
    stopPlayBetting(UserAccount);
}
RestartBtn.onclick = restartBetting;

