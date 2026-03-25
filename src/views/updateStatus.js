export default function updateStatus(UserAccount,CurrentRound) {
    document.getElementById("current-money").innerHTML = `${UserAccount.toLocaleString()}`;
    document.getElementById("current-round").innerHTML = `${CurrentRound}`;
    document.getElementById("bet-amount").value = null;
}