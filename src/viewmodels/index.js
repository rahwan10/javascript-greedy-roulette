import getRouletteColor from "../models/getRouletteColor.js"
import successBetting from "../views/successBetting.js";
import showFailBetting from "../views/showFailBetting.js";
import stopPlayBetting from "../views/stopPlayBetting.js";
import waitingForResult from "../views/waitingForResult.js";
import restartBetting from "../views/restartBetting.js";
import getValidationError from "../views/getValidationError.js";
import updateStatus from "../views/updateStatus.js";
import ifNotAccountZero from "../views/enableBettingButtons.js";
let UserAccount = 10000;
let CurrentRound = 0;

const BetBtn = document.getElementById("bet-button");
const StopBtn = document.getElementById("stop-button");
const RestartBtn = document.getElementById("restart-button");

function playBetting() {
    const UserColor = document.getElementById("color-select").value;
    const RouletteColor = getRouletteColor();
    const BettingMoney = Number(document.getElementById("bet-amount").value);
    const error=getValidationError(BettingMoney, UserColor, UserAccount);

    if (error) {
        alert(error)
        return null;
    }
    UserAccount -= BettingMoney;
    CurrentRound++;
    waitingForResult(UserAccount);
    setTimeout(()=>{UserAccount=BettingProcess(UserColor,RouletteColor,BettingMoney,UserAccount,CurrentRound)}, 2000)
}
function BettingProcess(UserColor,RouletteColor,BettingMoney,UserAccount,CurrentRound) {
    if (UserColor === RouletteColor) {
        UserAccount += successBetting(RouletteColor, UserColor, BettingMoney);
    } else {
        showFailBetting(RouletteColor, BettingMoney);
    }
    updateStatus(UserAccount,CurrentRound);
    if (UserAccount <= 0) {
        showFailBetting(RouletteColor, BettingMoney);
        stopPlayBetting(UserAccount, CurrentRound);
    } else {
        ifNotAccountZero();
    }
    return UserAccount;
}

BetBtn.onclick = playBetting;
StopBtn.onclick = () => {
    stopPlayBetting(UserAccount, CurrentRound);
}
RestartBtn.onclick = () => {
    CurrentRound=0;
    UserAccount=10000;
    restartBetting(UserAccount, CurrentRound);
}

