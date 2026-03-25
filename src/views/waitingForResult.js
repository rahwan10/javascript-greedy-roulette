export default waitingForResult

function waitingForResult(UserAccount) {
    const BetBtn = document.getElementById("bet-button");
    const StopBtn = document.getElementById("stop-button");
    const ResultBox = document.getElementById("result-content");
    document.getElementById("current-money").innerHTML = `${UserAccount.toLocaleString()}`;
    BetBtn.disabled = true;
    StopBtn.disabled = true;
    ResultBox.innerHTML = "룰렛을 돌리는 중...";
}