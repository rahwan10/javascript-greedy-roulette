let UserAccount = 10000;
let CurrentRound = 0;

const BetBtn = document.getElementById("bet-button");
const StopBtn = document.getElementById("stop-button");
const RestartBtn = document.getElementById("restart-button");

function PlayBetting() {
    const UserColor = document.getElementById("color-select").value;
    const RouletteColor = GetRouletteColor();
    const BettingMoney = document.getElementById("bet-amount").value;
    console.log(BettingMoney);
    console.log(UserColor);
    console.log(RouletteColor);

    UserAccount -= BettingMoney;
    CurrentRound++;
    document.getElementById("current-money").innerHTML = `${UserAccount}`;
    WaitingForResult();
    setTimeout((function () {
        if (UserColor === RouletteColor) {
            UserAccount += SuccessBetting(UserColor, BettingMoney);
        } else {
            FailBetting(BettingMoney);
        }
        document.getElementById("current-money").innerHTML = `${UserAccount}`;
        document.getElementById("current-round").innerHTML = `${CurrentRound}`;
        if (UserAccount <= 0) {
            StopPlayBetting();
        }
        BetBtn.disabled = false;
        StopBtn.disabled = false;
    }), 2000)


}

function GetRouletteColor() {
    const ColorNum = Math.floor(Math.random() * 40) + 1;
    let Color;
    if (ColorNum <= 21) {
        Color = "YELLOW";
    } else if (ColorNum <= 31) {
        Color = "GREEN";
    } else if (ColorNum <= 37) {
        Color = "BLUE";
    } else if (ColorNum <= 39) {
        Color = "PURPLE";
    } else {
        Color = "RED";
    }
    return Color;
}
function CalculateBonusMoney(UserColor, BettingMoney) {
    let BonusRate = 0;
    if (UserColor === "YELLOW") {
        BonusRate = 2;
    } else if (UserColor === "GREEN") {
        BonusRate = 4;
    } else if (UserColor === "BLUE") {
        BonusRate = 6;
    } else if (UserColor === "PURPLE") {
        BonusRate = 11;
    } else if (UserColor === "RED") {
        BonusRate = 21;
    }
    return BettingMoney * BonusRate;
}
function SuccessBetting(UserColor, BettingMoney) {
    const BonusMoney = CalculateBonusMoney(UserColor, BettingMoney);
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = "베팅 성공! +" + BonusMoney + "원";
    return BonusMoney;
}
function FailBetting(BettingMoney) {
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = "베팅 실패! -" + BettingMoney + "원";
}
function StopPlayBetting() {
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = "게임이 곧 종료됩니다.";
    setTimeout((function () {
        ResultBox.innerHTML = "게임종료" + `<br>` + " 최종자금:" + UserAccount + "원 " + `<br>` + "플레이한라운드:" + CurrentRound;
        BetBtn.style.display = 'none'; 
        StopBtn.style.display = 'none';
        RestartBtn.style.display='block';
    }), 2000);

}
function WaitingForResult() {
    const BetBtn = document.getElementById("bet-button");
    const StopBtn = document.getElementById("stop-button");
    const ResultBox = document.getElementById("result-content");
    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML = "룰렛을 돌리는중";
}



BetBtn.onclick = PlayBetting;
StopBtn.onclick = StopPlayBetting;

