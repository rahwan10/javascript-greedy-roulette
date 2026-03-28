export default function stopPlayBetting(UserAccount,CurrentRound) {
    const BetBtn = document.getElementById("bet-button");
    const StopBtn = document.getElementById("stop-button");
    const RestartBtn = document.getElementById("restart-button");
    const ResultBox = document.getElementById("result-content");

    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML += `<br>` + "게임이 곧 종료됩니다.";
    setTimeout((function () {
        ResultBox.innerHTML = "게임 종료" + `<br>` + " 최종 자금: " + UserAccount.toLocaleString() + "원 " + `<br>` + "플레이한 라운드: " + CurrentRound;
        BetBtn.style.display = 'none';
        StopBtn.style.display = 'none';
        RestartBtn.style.display = 'block';
        document.getElementById("game-controls").style.display = "none";
    }), 2000);

}