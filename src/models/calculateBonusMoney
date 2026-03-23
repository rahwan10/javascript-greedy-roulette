export default calculateBonusMoney

function calculateBonusMoney(UserColor, BettingMoney) {
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