export default function getValidationError(BettingMoney,UserColor,UserAccount){
    if(!isNotInputNothing(BettingMoney)){
        //alert("금액을 입력해주세요!");
        return "금액을 입력해주세요!";
    }
    if (!isInputPossible(BettingMoney,UserAccount)) {
        //alert("자금보다 작고 0보다 크게 설정해주세요!");
        return "자금보다 작고 0보다 크게 설정해주세요!";
    }
    if (!UserColor) {
        //alert("색상을 선택해주세요!");
        return "색상을 선택해주세요!";
    }
    if (!isInt(BettingMoney,UserAccount)) {
        //alert("정수를 적어주세요");
        return "정수를 적어주세요";
    }
    if (String(BettingMoney).toLowerCase().includes('e')) {
        //alert("지수 표기법으로 입력하지마세요");
        return "지수 표기법으로 입력하지마세요";
    }
    return null;
}

function isInputPossible(BettingMoney,UserAccount) {
    if (BettingMoney <= 0 || BettingMoney > UserAccount) {
        return false;
    }
    return true;
}
function isNotInputNothing(BettingMoney) {
    if (BettingMoney=="") {
        return false;
    }
    return true;
}
function isInt(BettingMoney) {
    if (!(Number.isInteger(BettingMoney))) {
        return false;
    }
    return true;
}