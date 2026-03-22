let UserAccount=10000;
let CurrentRound=0;

const BettingBtn=document.getElementById("bet-button");
const StopBtn=document.getElementById("stop-button");
const RestartBtn=document.getElementById("restart-button");

function PlayBetting(){
    const UserColor=document.getElementById("color-select").value;
    const RouletteColor=GetRouletteColor(); 
    const BettingMoney=document.getElementById("bet-amount").value;

    console.log(BettingMoney);
    console.log(UserColor);
    console.log(RouletteColor);

    UserAccount-=BettingMoney;
    CurrentRound++;
    if(UserColor===RouletteColor){
        UserAccount+=SuccessBetting(UserColor,BettingMoney);
    }else{
        FailBetting(BettingMoney);
    }
    document.getElementById("current-money").innerHTML=`${UserAccount}`;
    document.getElementById("current-round").innerHTML=`${CurrentRound}`;
    
}

function GetRouletteColor(){
    const ColorNum=Math.floor(Math.random()*40)+1;
    let Color;
    if(ColorNum<=21){
        Color="YELLOW";
    }else if(ColorNum<=31){
        Color="GREEN";
    }else if(ColorNum<=37){
        Color="BLUE";
    }else if(ColorNum<=39){
        Color="PURPLE";
    }else{
        Color="RED";
    }
    return Color;
}
function CalculateBonusMoney(UserColor,BettingMoney){
    let BonusRate=0;
    if(UserColor==="YELLOW"){
        BonusRate=2;
    }else if(UserColor==="GREEN"){
        BonusRate=4;
    }else if(UserColor==="BLUE"){
        BonusRate=6;
    }else if(UserColor==="PURPLE"){
        BonusRate=11;
    }else if(UserColor==="RED"){
        BonusRate=21;
    }
    return BettingMoney*BonusRate;
}
function SuccessBetting(UserColor,BettingMoney){
    const BonusMoney=CalculateBonusMoney(UserColor,BettingMoney);
    alert("베팅 성공! +{"+BonusMoney+"}원");

    return BonusMoney;
}
function FailBetting(BettingMoney){
    alert("베팅 실패! -{"+BettingMoney+"}원");
}
BettingBtn.onclick=PlayBetting;

