export default alertUser

function alertUser(BettingMoney,UserColor,UserAccount){
    if (!isInputPossible(BettingMoney,UserAccount)) {
        alert("자금보다 작고 0보다 크게 설정해주세요!");
        return true;
    }
    if (!UserColor) {
        alert("색상을 선택해주세요!");
        return true;
    }
    if (!isInt(BettingMoney,UserAccount)) {
        alert("정수를 적어주세요");
        return true;
    }
    if (String(BettingMoney).toLowerCase().includes('e')) {
        alert("지수 표기법으로 입력하지마세요");
        return true;
    }
    return false;
}

function isInputPossible(BettingMoney,UserAccount) {
    if (BettingMoney <= 0 || BettingMoney > UserAccount) {
        return false;
    }
    return true;
}
function isInt(BettingMoney) {
    if (!(Number.isInteger(Number(BettingMoney)))) {
        return false;
    }
    return true;
}