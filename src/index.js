let UserAccount = 10000;
let CurrentRound = 0;

const BetBtn = document.getElementById("bet-button");
const StopBtn = document.getElementById("stop-button");
const RestartBtn = document.getElementById("restart-button");

function PlayBetting() {
    const UserColor = document.getElementById("color-select").value;
    const RouletteColor = GetRouletteColor();
    const BettingMoney = document.getElementById("bet-amount").value;
    if (!isInputPossible(BettingMoney)) {
        alert("자금보다 작고 0보다 크게 설정해주세요!");
        return null;
    }
    UserAccount -= BettingMoney;
    CurrentRound++;
    document.getElementById("current-money").innerHTML = `${UserAccount}`;
    WaitingForResult();
    setTimeout((function () {
        if (UserColor === RouletteColor) {
            UserAccount += SuccessBetting(RouletteColor,UserColor, BettingMoney);
        } else {
            FailBetting(RouletteColor,BettingMoney);
        }
        document.getElementById("current-money").innerHTML = `${UserAccount}`;
        document.getElementById("current-round").innerHTML = `${CurrentRound}`;
        document.getElementById("bet-amount").value = null;
        if (UserAccount <= 0) {
            StopPlayBetting();
        } else {
            BetBtn.disabled = false;
            StopBtn.disabled = false;

        }

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
function SuccessBetting(RouletteColor,UserColor, BettingMoney) {
    const BonusMoney = CalculateBonusMoney(UserColor, BettingMoney);
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = `룰렛결과${RouletteColor}<br>베팅 성공! +${BonusMoney}원`;
    return BonusMoney;
}
function FailBetting(RouletteColor,BettingMoney) {
    const ResultBox = document.getElementById("result-content");
    ResultBox.innerHTML = `룰렛결과${RouletteColor}<br>베팅 실패! -${BettingMoney}원`;
}
function StopPlayBetting() {
    const ResultBox = document.getElementById("result-content");
    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML = "게임이 곧 종료됩니다.";
    setTimeout((function () {
        ResultBox.innerHTML = "게임종료" + `<br>` + " 최종자금:" + UserAccount + "원 " + `<br>` + "플레이한라운드:" + CurrentRound;
        BetBtn.style.display = 'none';
        StopBtn.style.display = 'none';
        RestartBtn.style.display = 'block';
        document.getElementById("game-controls").style.display = "none";
    }), 2000);

}
function WaitingForResult() {
    const BetBtn = document.getElementById("bet-button");
    const StopBtn = document.getElementById("stop-button");
    const ResultBox = document.getElementById("result-content");
    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML = "룰렛을 돌리는중...";
}
function RestartBetting() {
    const ResultBox = document.getElementById("result-content");
    BetBtn.disabled = false;
    StopBtn.disabled = false;
    BetBtn.style.display = 'block';
    StopBtn.style.display = 'block';
    RestartBtn.style.display = 'none';
    document.getElementById("game-controls").style.display = "block";
    ResultBox.innerHTML = "";
    CurrentRound = 0;
    UserAccount = 10000;
    document.getElementById("current-money").innerHTML = UserAccount;
    document.getElementById("current-round").innerHTML = CurrentRound;
    document.getElementById("bet-amount").value = null;
}
function isInputPossible(BettingMoney) {
    if (BettingMoney <= 0 || BettingMoney > UserAccount) {
        return false;
    }
    return true;

}



BetBtn.onclick = PlayBetting;
StopBtn.onclick = StopPlayBetting;
RestartBtn.onclick = RestartBetting;

