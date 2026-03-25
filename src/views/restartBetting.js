export default restartBetting

function restartBetting(UserAccount,CurrentRound) {
    const ResultBox = document.getElementById("result-content");
    const ColorSelect = document.getElementById("color-select");
    const BetBtn = document.getElementById("bet-button");
    const StopBtn = document.getElementById("stop-button");
    const RestartBtn = document.getElementById("restart-button");
    ColorSelect.value = "";
    BetBtn.disabled = false;
    StopBtn.disabled = false;
    BetBtn.style.display = 'block';
    StopBtn.style.display = 'block';
    RestartBtn.style.display = 'none';
    document.getElementById("game-controls").style.display = "block";
    ResultBox.innerHTML = "";
    document.getElementById("current-money").innerHTML = Number(UserAccount).toLocaleString();
    document.getElementById("current-round").innerHTML = CurrentRound;
    document.getElementById("bet-amount").value = null;
    
}