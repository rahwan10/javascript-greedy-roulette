import getRouletteColor from "./models/getRouletteColor.js"
import successBetting from "./views/successBetting.js";
import failBetting from "./views/failBetting.js";
import stopPlayBetting from "./views/stopPlayBetting.js";
import waitingForResult from "./views/waitingForResult.js";
import restartBetting from "./views/restartBetting.js";
import alertUser from "./views/alertUser.js";

let UserAccount = 10000;
let CurrentRound = 0;

const BetBtn = document.getElementById("bet-button");
const StopBtn = document.getElementById("stop-button");
const RestartBtn = document.getElementById("restart-button");

function playBetting() {
    const UserColor = document.getElementById("color-select").value;
    const RouletteColor = getRouletteColor();
    const BettingMoney = document.getElementById("bet-amount").value;

    if (alertUser(BettingMoney, UserColor, UserAccount)) {
        return null;
    }

    UserAccount -= BettingMoney;
    CurrentRound++;
    document.getElementById("current-money").innerHTML = `${UserAccount.toLocaleString()}`;
    waitingForResult();
    setTimeout(()=>BettingProcess(UserColor,RouletteColor,BettingMoney,UserAccount,CurrentRound), 2000)
}
function BettingProcess(UserColor,RouletteColor,BettingMoney,UserAccount,CurrentRound) {
    if (UserColor === RouletteColor) {
        UserAccount += successBetting(RouletteColor, UserColor, BettingMoney);
    } else {
        failBetting(RouletteColor, BettingMoney);
    }
    document.getElementById("current-money").innerHTML = `${UserAccount.toLocaleString()}`;
    document.getElementById("current-round").innerHTML = `${CurrentRound}`;
    document.getElementById("bet-amount").value = null;
    if (UserAccount <= 0) {
        const ResultBox = document.getElementById("result-content");
        ResultBox.innerHTML = `룰렛 결과: ${RouletteColor} <br>베팅 실패! -${Number(BettingMoney).toLocaleString()}원`;
        stopPlayBetting(UserAccount, CurrentRound);
    } else {
        BetBtn.disabled = false;
        StopBtn.disabled = false;
    }
}

BetBtn.onclick = playBetting;
StopBtn.onclick = () => {
    stopPlayBetting(UserAccount, CurrentRound);
}
RestartBtn.onclick = () => {
    restartBetting(UserAccount, CurrentRound);
}

