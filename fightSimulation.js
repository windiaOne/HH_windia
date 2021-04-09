/*--- Create a button in a container div.  It will be styled and positioned with CSS.
*/

let simulationButtonNode       = document.createElement ('div');
simulationButtonNode.innerHTML = '<button id="simulationButton" type="button">Simulate fight!</button>';
simulationButtonNode.setAttribute ('id', 'simBtnContainer');

let simulationTable = document.createElement('div');
simulationTable.innerHTML = '<p id="paragraph">go sim!</p>';
simulationTable.setAttribute('id', 'simTableContainer');


//zeigt an, welche Seite geladen sein muss, damit das div dazukommt
if (window.location.pathname == '/tower-of-fame.html'){
    document.body.appendChild (simulationButtonNode);
    document.body.appendChild(simulationTable);
}

//--- Activate the newly added button.
document.getElementById ("simulationButton").addEventListener (
    "click", simButtonClickAction, false
);


let printTable = 1; // global variable to switch between printed and hidden simulation table -> 1 = print

function simButtonClickAction (enButtonEvent) {
    //first the official variables, later the self made ones
	var playerEgo;
    var playerEgoCheck;
    var playerDefHC;
    var playerDefKH;
    var playerDefCH;
    var playerAtk;
    var playerDef;
    var playerClass;
    var playerAlpha;
    var playerBeta;
    var playerOmega;
    var playerExcitement;
    var playerAlphaAdd;
    var playerBetaAdd;
    var playerOmegaAdd;
    var playerOrgasm;
    var playerOrgasmCount;

    var opponentEgo;
    var opponentDefHC;
    var opponentDefHCStr;
    var opponentDefKH;
    var opponentDefKHStr
    var opponentDefCH;
    var opponentDefCHStr
    var opponentAtk;
    var opponentAtkStr
    var opponentDef;
    var opponentClass;
    var opponentAlpha;
    var opponentBeta;
    var opponentOmega;
    var opponentExcitement;
    var opponentAlphaAdd;
    var opponentBetaAdd;
    var opponentOmegaAdd;
    var opponentOrgasm;
    var opponentOrgasmCount;

    var matchRating;

	// new "global" variables that work either independent from server or avoid using them as function value
	let entryTextArea = document.createElement ('p'); //a line of text to the screen.
	let idNutaku; // identify yourself to use correct girl & equipment for simulation
	let idHeh;
	let idTestHeh;
    let playerName;
    let playerClassStr;
    let opponentClassStr;
	let haremBonusNutaku;
	let haremBonusHeh;
	let haremBonusTestHeh;
	let lvlBasedHC;
    let lvlBasedCH;
    let lvlBasedKH;
	let boughtStatHC;
	let boughtStatCH;
	let boughtStatKH;
	let clubbonus; //currently everything is maxed and gives 10 % on hc, ch, kh, endur, harmony etc.
	let simuresult;
	let leer = ' ';
	let opponent;
	let opponentTeam;
    let girls;
    let alphaGirl;
    let betaGirl;
    let omegaGirl;
	let alphaRow;
	let alphaRows;//step 0: setup the combinations to look for
	let equips;
	let equipSums;
	let tobefound // eine Nummer, die beschreibt, wie viel Equipment kombiniert werden soll
	let equipLT; //per se muss jede Position gefüllt werden
	let equipLM; // Step 0: nur eine Nummer, keine echte Position
	let equipLB;
	let equipRT;
	let equipRM;
	let equipRB;
	let boostGinseng;
	let boostCordy;
	let resultArray; //init result array sets 1st<=2nd<=3rd...
	let resultValue; //take the current simulation result
    let tableTemp; // to build up innerHTML step by step


	// setting global variables
	idNutaku = 	1375928;
	idHeh = 959708;
	idTestHeh = 2110;
    playerName = $('#leagues_left .player_block .title').text();
	//take directly from harem's overview - needs to be refreshed any time a girl is seducted or upgraded/upleveled
	haremBonusNutaku = 20196;
	haremBonusHeh = 15505;
	haremBonusTestHeh = 12223;
	//currently everything is maxed and gives 10 % on hc, ch, kh, endur, harmony etc.
	clubbonus = 0.1;
	// assumption: you buy always everything
	boughtStatHC = Hero.infos.level*30;
	boughtStatCH = Hero.infos.level*30;
	boughtStatKH = Hero.infos.level*30;
    // needed already before anything goes
    playerClass = $('#leagues_left .icon').attr('carac');
    opponentClass = $('#leagues_right .icon').attr('carac');
	//market stuff based on level (=Hero.infos.level)
	if (playerClass == ('class' + HC)) {
        lvlBasedHC = 9*Hero.infos.level;
        lvlBasedCH = 5*Hero.infos.level;
        lvlBasedKH = 7*Hero.infos.level;
        playerClassStr = 'HC';
        }
    if (playerClass == ('class' + CH)) {
        lvlBasedHC = 7*Hero.infos.level;
        lvlBasedCH = 9*Hero.infos.level;
        lvlBasedKH = 5*Hero.infos.level;
        playerClassStr = 'CH';
    }
    if (playerClass == ('class' + KH)) {
        lvlBasedHC = 5*Hero.infos.level;
        lvlBasedCH = 7*Hero.infos.level;
        lvlBasedKH = 9*Hero.infos.level;
        playerClassStr = 'KH';
    }

	// each server needs equipment and girls to be setup
	function setEquimentNutaku(){
		//not sure if rewrite is neccessary to get complete simulation
		//first 6 multi, then 6 mono
		let equipment = new Array();
		equipment[0] = new Object();
		equipment[0]['Position'] = 'RB'; //rechtsunten
		equipment[0]['HC'] = 3199;
		equipment[0]['CH'] = 3199;
		equipment[0]['KH'] = 3243;
		equipment[0]['luck'] = 4242;
		equipment[0]['endur'] = 2961;

		equipment[1] = new Object();
		equipment[1]['Position'] = 'LT'; //linksoben
		equipment[1]['HC'] = 3100;
		equipment[1]['CH'] = 3260;
		equipment[1]['KH'] = 3242;
		equipment[1]['luck'] = 4242;
		equipment[1]['endur'] = 3024;

		equipment[2] = new Object();
		equipment[2]['Position'] = 'LM';//linksmitte
		equipment[2]['HC'] = 3167;
		equipment[2]['CH'] = 3256;
		equipment[2]['KH'] = 3238;
		equipment[2]['luck'] = 4242;
		equipment[2]['endur'] = 2959;

		equipment[3] = new Object();
		equipment[3]['Position'] = 'LB'; //linksunten
		equipment[3]['HC'] = 3250;
		equipment[3]['CH'] = 3214;
		equipment[3]['KH'] = 3221;
		equipment[3]['luck'] = 4244;
		equipment[3]['endur'] = 3066;

		equipment[4] = new Object();
		equipment[4]['Position'] = 'RM'; //rechtsmitte
		equipment[4]['HC'] = 3254;
		equipment[4]['CH'] = 3247;
		equipment[4]['KH'] = 3236;
		equipment[4]['luck'] = 4243;
		equipment[4]['endur'] = 3089;

		equipment[5] = new Object();
		equipment[5]['Position'] = 'RT'; //rechtsoben
		equipment[5]['HC'] = 3172;
		equipment[5]['CH'] = 3238;
		equipment[5]['KH'] = 3262;
		equipment[5]['luck'] = 4244;
		equipment[5]['endur'] = 3166;

		//now 6 mono
		equipment[6] = new Object();
		equipment[6]['Position'] = 'RB'; //rechtsunten
		equipment[6]['HC'] = 0;
		equipment[6]['CH'] = 0;
		equipment[6]['KH'] = 5187;
		equipment[6]['luck'] = 0;
		equipment[6]['endur'] = 0;

		equipment[7] = new Object();
		equipment[7]['Position'] = 'LT'; //linksoben
		equipment[7]['HC'] = 0;
		equipment[7]['CH'] = 0;
		equipment[7]['KH'] = 5185;
		equipment[7]['luck'] = 0;
		equipment[7]['endur'] = 0;

		equipment[8] = new Object();
		equipment[8]['Position'] = 'LM';//linksmitte
		equipment[8]['HC'] = 0;
		equipment[8]['CH'] = 0;
		equipment[8]['KH'] = 5165;
		equipment[8]['luck'] = 0;
		equipment[8]['endur'] = 0;

		equipment[9] = new Object();
		equipment[9]['Position'] = 'LB'; //linksunten
		equipment[9]['HC'] = 0;
		equipment[9]['CH'] = 0;
		equipment[9]['KH'] = 5143;
		equipment[9]['luck'] = 0;
		equipment[9]['endur'] = 0;

		equipment[10] = new Object();
		equipment[10]['Position'] = 'RM'; //rechtsmitte
		equipment[10]['HC'] = 0;
		equipment[10]['CH'] = 0;
		equipment[10]['KH'] = 5151;
		equipment[10]['luck'] = 0;
		equipment[10]['endur'] = 0;

		equipment[11] = new Object();
		equipment[11]['Position'] = 'RT'; //rechtsoben
		equipment[11]['HC'] = 0;
		equipment[11]['CH'] = 0;
		equipment[11]['KH'] = 5116;
		equipment[11]['luck'] = 0;
		equipment[11]['endur'] = 0;

		return equipment;
	}

	//assumption: all used girls are upgraded and leveled to their max
	function setGirlsNutaku(){
		let girls = new Array();
		girls[0] = new Object();
		girls[0].name = 'Alexa';
		girls[0]['HC'] = 6.16*Hero.infos.level;
		girls[0]['CH'] = 7.28*Hero.infos.level;
		girls[0]['KH'] = 15.12*Hero.infos.level;

		girls[1] = new Object();
		girls[1].name = 'Any';
		girls[1].HC = 6.25*Hero.infos.level;
		girls[1].CH = 4*Hero.infos.level;
		girls[1].KH = 13.5*Hero.infos.level;

		girls[2] = new Object();
		girls[2].name = 'Harmonia';
		girls[2].HC = 3.75*Hero.infos.level;
		girls[2].CH = 7.5*Hero.infos.level;
		girls[2].KH = 13.25*Hero.infos.level;

		return girls;
	}
	// each server needs equipment and girls to be setup
		function setEquimentHeh(){
		//not sure if rewrite is neccessary to get complete simulation
		//first 6 multi, then 6 mono
		let equipment = new Array();
		equipment[0] = new Object();
		equipment[0]['Position'] = 'RT'; //rechtsoben
		equipment[0]['HC'] = 3032;
		equipment[0]['CH'] = 3033;
		equipment[0]['KH'] = 2986;
		equipment[0]['luck'] = 3970;
		equipment[0]['endur'] = 3038;

		equipment[1] = new Object();
		equipment[1]['Position'] = 'LB'; //linksunten
		equipment[1]['HC'] = 3081;
		equipment[1]['CH'] = 3069;
		equipment[1]['KH'] = 2975;
		equipment[1]['luck'] = 4007;
		equipment[1]['endur'] = 2874;

		equipment[2] = new Object();
		equipment[2]['Position'] = 'LT';//linksoben
		equipment[2]['HC'] = 3041;
		equipment[2]['CH'] = 3083;
		equipment[2]['KH'] = 2997;
		equipment[2]['luck'] = 4035;
		equipment[2]['endur'] = 2955;

		equipment[3] = new Object();
		equipment[3]['Position'] = 'LM'; //linksmitte
		equipment[3]['HC'] = 3055;
		equipment[3]['CH'] = 3043;
		equipment[3]['KH'] = 3021;
		equipment[3]['luck'] = 4017;
		equipment[3]['endur'] = 3063;

		equipment[4] = new Object();
		equipment[4]['Position'] = 'RM'; //rechtsmitte
		equipment[4]['HC'] = 3015;
		equipment[4]['CH'] = 3070;
		equipment[4]['KH'] = 3069;
		equipment[4]['luck'] = 4017;
		equipment[4]['endur'] = 2792;

		equipment[5] = new Object();
		equipment[5]['Position'] = 'RB'; //rechtsunten
		equipment[5]['HC'] = 2949;
		equipment[5]['CH'] = 3079;
		equipment[5]['KH'] = 2853;
		equipment[5]['luck'] = 4018;
		equipment[5]['endur'] = 3062;



		//now 6 mono
		equipment[6] = new Object();
		equipment[6]['Position'] = 'RT'; //rechtsoben
		equipment[6]['HC'] = 0;
		equipment[6]['CH'] = 4924;
		equipment[6]['KH'] = 0;
		equipment[6]['luck'] = 0;
		equipment[6]['endur'] = 0;

		equipment[7] = new Object();
		equipment[7]['Position'] = 'LB'; //linksunten
		equipment[7]['HC'] = 0;
		equipment[7]['CH'] = 4883;
		equipment[7]['KH'] = 0;
		equipment[7]['luck'] = 0;
		equipment[7]['endur'] = 0;

		equipment[8] = new Object();
		equipment[8]['Position'] = 'LT';//linksoben
		equipment[8]['HC'] = 0;
		equipment[8]['CH'] = 4876;
		equipment[8]['KH'] = 0;
		equipment[8]['luck'] = 0;
		equipment[8]['endur'] = 0;

		equipment[9] = new Object();
		equipment[9]['Position'] = 'LM'; //linksmitte
		equipment[9]['HC'] = 0;
		equipment[9]['CH'] = 4734;
		equipment[9]['KH'] = 0;
		equipment[9]['luck'] = 0;
		equipment[9]['endur'] = 0;

		equipment[10] = new Object();
		equipment[10]['Position'] = 'RM'; //rechtsmitte
		equipment[10]['HC'] = 0;
		equipment[10]['CH'] = 4757;
		equipment[10]['KH'] = 0;
		equipment[10]['luck'] = 0;
		equipment[10]['endur'] = 0;

		equipment[11] = new Object();
		equipment[11]['Position'] = 'RB'; //rechtsunten
		equipment[11]['HC'] = 0;
		equipment[11]['CH'] = 4762;
		equipment[11]['KH'] = 0;
		equipment[11]['luck'] = 0;
		equipment[11]['endur'] = 0;

        return equipment;
	}

		//assumption: all used girls are upgraded and leveled to their max
	function setGirlsHeh(){
		let girls = new Array();
		girls[0] = new Object();
		girls[0].name = 'NY Estelle';
		girls[0]['HC'] = 5.6*Hero.infos.level;
		girls[0]['CH'] = 15.12*Hero.infos.level;
		girls[0]['KH'] = 7.84*Hero.infos.level;

		girls[1] = new Object();
		girls[1].name = 'Himari';
		girls[1].HC = 5.5*Hero.infos.level;
		girls[1].CH = 13.5*Hero.infos.level;
		girls[1].KH = 5.75*Hero.infos.level;

		girls[2] = new Object();
		girls[2].name = 'Filya';
		girls[2].HC = 5*Hero.infos.level;
		girls[2].CH = 13.25*Hero.infos.level;
		girls[2].KH = 6.25*Hero.infos.level;

		girls[3] = new Object();
		girls[3].name = 'Shtupra';
		girls[3].HC = 3.25*Hero.infos.level;
		girls[3].CH = 13.5*Hero.infos.level;
		girls[3].KH = 7.0*Hero.infos.level;

		return girls;
	}

	// general functions used

	function calculateAttack(player1stStat, alpha1st, boostCordy){
		// full formula needs integration of boostFix
		// beta1st and omega1st are done in simuFight()
		let result;
		result = Math.round((player1stStat + 3* alpha1st) * (1+ boostCordy));
		// + 1.3* beta1st + omega1st + ? boostFix;

		return result;
	}

	function calculateDefMain(player2ndStat, player3rdStat, alpha2nd, alpha3rd){
		/*[Defense against your Main stat] = ( [Hero's secondary stat] / 2 + [Hero's tertiary stat] / 2
											+ 1.5 × [Hero's secondary stat on Alpha] + 1.5 × [Hero's tertiary stat on Alpha] )
											/ 2
										+ 1.75 × ([Hero's Main stat on Beta if in fight] + [Hero's Main stat on Omega if in fight])	*/
		let result;
		//abgefragter Wert ist nur der "alpha im Kampf" erstmal
		//result = new Object();
		result  = Math.floor((player2ndStat/2 + player3rdStat/2 + 1.5* alpha2nd + 1.5* alpha3rd) / 2);
		//result.alphaBeta = result.alpha + 1.75* beta1st;
		//result.alphaBetaOmega = result.alphabeta + omega1st;

		return result;
	}

	function calculateDefSideX(heroXStat, alphaX){
		let result;
		result = Math.floor(heroXStat/2 + 1.5* alphaX);

		return result;
	}

	function calculateEgo(endurance, alpha1st) {
		let result;
		result = Math.floor(endurance + 11*alpha1st);
		return result;
	}

	// boostFix ignored due to high lvl, clubbonus is currently even, so no difference
	function calculateEndurance(equipSums, haremBonus, boostGinseng) {
		let result;
		let part1;
		let part2;
		let part3;
		let part4;

		/*// forum said to floor all
		//self observed numbers said first floored and the others rounded seems to be closest (only differs a bit with 6 mono)
		part1 = Math.floor(((lvlBase1st+bought1st)*5 + (lvlBase2nd+bought2nd)*2 + sumEquipEndur + haremBonus) * (1+clubEndur));
		part2 = Math.round((lvlBase1st+bought1st)*(club1st))*5 + Math.round((lvlBase2nd+bought2nd)*(club2nd))*2;
		part3 = Math.round((sumEquip1st + boostFix1st) * (1+club1st))*5 + Math.round((sumEquip2nd + boostFix2nd) * (1+club2nd))*2;
		part4 = Math.round((lvlBase1st + bought1st + sumEquip1st + boostFix1st)*boostGinseng)*5 + Math.round((lvlBase2nd + bought2nd + sumEquip2nd + boostFix2nd)*boostGinseng)*2;
		https://forum.hentaiheroes.com/index.php?/topic/14607-endurance-stat-formula/&tab=comments#comment-192633*/

		if (playerClass == ('class' + HC)) {
			part1 = Math.floor(((lvlBasedHC + boughtStatHC)*5 + (lvlBasedKH + boughtStatKH)*2 + equipSums.endur + haremBonus) * (1+clubbonus));
			part2 = Math.floor((lvlBasedHC + boughtStatHC)*(clubbonus))*5 + Math.round((lvlBasedKH + boughtStatKH)*(clubbonus))*2;
			part3 = Math.floor((equipSums.HC) * (1+clubbonus))*5 + Math.round((equipSums.KH) * (1+clubbonus))*2;
			part4 = Math.floor((lvlBasedHC + boughtStatHC + equipSums.HC)* boostGinseng)*5 + Math.round((lvlBasedKH + boughtStatKH + equipSums.KH)* boostGinseng)*2;
		}
		if (playerClass == ('class' + CH)) {
			part1 = Math.floor(((lvlBasedCH + boughtStatCH)*5 + (lvlBasedHC + boughtStatHC)*2 + equipSums.endur + haremBonus) * (1+clubbonus));
			part2 = Math.floor((lvlBasedCH + boughtStatCH)*(clubbonus))*5 + Math.round((lvlBasedHC + boughtStatHC)*(clubbonus))*2;
			part3 = Math.floor((equipSums.CH) * (1+clubbonus))*5 + Math.round((equipSums.HC) * (1+clubbonus))*2;
			part4 = Math.floor((lvlBasedCH + boughtStatCH + equipSums.CH)* boostGinseng)*5 + Math.round((lvlBasedHC + boughtStatHC + equipSums.HC)* boostGinseng)*2;
		}
		if (playerClass == ('class' + KH)) {
			part1 = Math.floor(((lvlBasedKH + boughtStatKH)*5 + (lvlBasedCH + boughtStatCH)*2 + equipSums.endur + haremBonus) * (1+clubbonus));
			part2 = Math.floor((lvlBasedKH + boughtStatKH)*(clubbonus))*5 + Math.round((lvlBasedCH + boughtStatCH)*(clubbonus))*2;
			part3 = Math.round((equipSums.KH) * (1+clubbonus))*5 + Math.round((equipSums.CH) * (1+clubbonus))*2;
			part4 = Math.round((lvlBasedKH + boughtStatKH + equipSums.KH)* boostGinseng)*5 + Math.round((lvlBasedCH + boughtStatCH + equipSums.CH)* boostGinseng)*2;
		}
		result = part1 + part2 + part3 + part4;

		return result;
	}

	// needs 6 equipments, delivered in the form of their setup as 6 objects
	function calculateEquipSums(equipLT, equipLM, equipLB, equipRT, equipRM, equipRB){
        let result;
        result = new Object();
		result.HC = equipLT.HC + equipLM.HC + equipLB.HC + equipRT.HC + equipRM.HC + equipRB.HC;
		result.CH = equipLT.CH + equipLM.CH + equipLB.CH + equipRT.CH + equipRM.CH + equipRB.CH;
		result.KH = equipLT.KH + equipLM.KH + equipLB.KH + equipRT.KH + equipRM.KH + equipRB.KH;
		result.luck = equipLT.luck + equipLM.luck + equipLB.luck + equipRT.luck + equipRM.luck + equipRB.luck;
		result.endur = equipLT.endur + equipLM.endur + equipLB.endur + equipRT.endur + equipRM.endur + equipRB.endur;

		return result;
	}

	//equipSums besteht aus 5 Werten, die aus dem Equiment-Array erzeugt werden müssen - der Rest is "global variable"
	function calculatePlayerMarket(equipSums, boostGinseng){
	//boostFix wäre vor dem Runden drauf zu rechnen, nutze ich jetzt nicht
		let result;
        result = new Object();

		if (playerClass == ('class' + HC)) {
			result.player1stStat = Math.round((lvlBasedHC + boughtStatHC + equipSums.HC) * (1+ clubbonus + boostGinseng));
            result.player2ndStat = Math.round((lvlBasedKH + boughtStatKH + equipSums.KH) * (1+ clubbonus + boostGinseng));
			result.player3rdStat = Math.round((lvlBasedCH + boughtStatCH + equipSums.CH) * (1+ clubbonus + boostGinseng));
        }
		if (playerClass == ('class' + CH)) {
			result.player1stStat = Math.round((lvlBasedCH + boughtStatCH + equipSums.CH) * (1+ clubbonus + boostGinseng));
            result.player2ndStat = Math.round((lvlBasedHC + boughtStatHC + equipSums.HC) * (1+ clubbonus + boostGinseng));
			result.player3rdStat = Math.round((lvlBasedKH + boughtStatKH + equipSums.KH) * (1+ clubbonus + boostGinseng));
        }
		if (playerClass == ('class' + KH)) {
			result.player1stStat = Math.round((lvlBasedKH + boughtStatKH + equipSums.KH) * (1+ clubbonus + boostGinseng));
            result.player2ndStat = Math.round((lvlBasedCH + boughtStatCH + equipSums.CH) * (1+ clubbonus + boostGinseng));
			result.player3rdStat = Math.round((lvlBasedHC + boughtStatHC + equipSums.HC) * (1+ clubbonus + boostGinseng));
        }

		return result;
	}

	function calculateExcitment(alpha1st, alpha2nd, alpha3rd){
		let result;
		result = Math.round((alpha1st + alpha2nd + alpha3rd) * 28);

		return result;
	}

	//let's see which data is needed - hopefully not the whole data structure - looks only like a dummy for player
	function setGirl4Team(hc, ch, kh){
		let result;
		result = new Object();
		result.caracs = new Object();
		result.caracs.carac1 = hc;
		result.caracs.carac2 = ch;
		result.caracs.carac3 = kh;

		return result;
	}

	// girls as objects as in Array set, equipment precalculated, haremBonus = server decision*/
	function createPlayer(alphaGirl, betaGirl, omegaGirl, boostCordy, boostGinseng, equipSums, haremBonus){
		let playerMarket; //was im Markt angezeigt wird, hängt an Klasse und Equipment
		let endurance;

		// INIT
        playerClass = $('#leagues_left .icon').attr('carac');
		playerMarket = calculatePlayerMarket(equipSums, boostGinseng);
		endurance = calculateEndurance(equipSums, haremBonus, boostGinseng);

		//Atk & Def depends on class, so calculation moved down
		// for structure of "player" - no other use found so far^^
        playerAlpha = setGirl4Team(alphaGirl.HC, alphaGirl.CH, alphaGirl.KH);
        playerBeta = setGirl4Team(betaGirl.HC, betaGirl.CH, betaGirl.KH);
        playerOmega = setGirl4Team(omegaGirl.HC, omegaGirl.CH, omegaGirl.KH);
        //just in case, this global variable might already be initiated using createOpponent()
		opponentClass = $('#leagues_right .icon').attr('carac');

		if (playerClass == ('class' + HC)) {
            playerAlphaAdd = alphaGirl.HC;
            playerBetaAdd = betaGirl.HC;
            playerOmegaAdd = omegaGirl.HC;
            //opponentDef = opponentDefHC;
			playerEgo = calculateEgo(endurance, alphaGirl.HC);
			playerAtk = calculateAttack(playerMarket.player1stStat, alphaGirl.HC, boostCordy);
			playerDefHC = calculateDefMain(playerMarket.player2ndStat, playerMarket.player3rdStat, alphaGirl.KH, alphaGirl.CH);
			playerDefCH = calculateDefSideX (playerMarket.player3rdStat, alphaGirl.CH);
			playerDefKH = calculateDefSideX (playerMarket.player2ndStat, alphaGirl.KH);
			playerExcitement = calculateExcitment(alphaGirl.HC, alphaGirl.KH, alphaGirl.CH);
        }
        if (playerClass == ('class' + CH)) {
            playerAlphaAdd = alphaGirl.CH;
            playerBetaAdd = betaGirl.CH;
            playerOmegaAdd = omegaGirl.CH;
            //opponentDef = opponentDefCH;
			playerEgo = calculateEgo(endurance, alphaGirl.CH);
			playerAtk = calculateAttack(playerMarket.player1stStat, alphaGirl.CH, boostCordy);
			playerDefHC = calculateDefSideX (playerMarket.player2ndStat, alphaGirl.HC);
			playerDefCH = calculateDefMain(playerMarket.player2ndStat, playerMarket.player3rdStat, alphaGirl.HC, alphaGirl.KH);
			playerDefKH = calculateDefSideX (playerMarket.player3rdStat, alphaGirl.KH);
			playerExcitement = calculateExcitment(alphaGirl.CH, alphaGirl.HC, alphaGirl.KH);
        }
        if (playerClass == ('class' + KH)) {
            playerAlphaAdd = alphaGirl.KH;
            playerBetaAdd = betaGirl.KH;
            playerOmegaAdd = omegaGirl.KH;
            //opponentDef = opponentDefKH;
			playerEgo = calculateEgo(endurance, alphaGirl.KH);
			playerAtk = calculateAttack(playerMarket.player1stStat, alphaGirl.KH, boostCordy);
			playerDefHC = calculateDefSideX (playerMarket.player3rdStat, alphaGirl.HC);
			playerDefCH = calculateDefSideX (playerMarket.player2ndStat, alphaGirl.CH);
			playerDefKH = calculateDefMain(playerMarket.player2ndStat, playerMarket.player3rdStat, alphaGirl.CH, alphaGirl.HC);
			playerExcitement = calculateExcitment(alphaGirl.KH, alphaGirl.CH, alphaGirl.HC);
        }

        if (opponentClass == ('class' + HC)) {
            playerDef = playerDefHC;
        }
        if (opponentClass == ('class' + CH)) {
            playerDef = playerDefCH;
        }
        if (opponentClass == ('class' + KH)) {
            playerDef = playerDefKH;
        }

        let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];

        let player = {
            ego: playerEgo,
            originEgo: playerEgo,
            atk: playerAtk,
            def: playerDef,

			//use still unknown
            alpha: playerAlpha,
            beta: playerBeta,
            omega: playerOmega,
			//used in simuFight
            team: playerTeam,
			//used in simuFight
            orgasm: 0,
            orgasmCount: 0,
            excitement: playerExcitement,

            text: 'Player',
        };
        console.log('createdPlayer: '+'ego: '+player.ego+' atk: '+player.atk+' def: '+player.def+' exc: '+player.excitement);

		let result;
		result = player;
		return result;
	}

	// return should not be needed
	function createOpponent() {
		//using live values and global attributes
		playerClass = $('#leagues_left .icon').attr('carac');
        opponentClass = $('#leagues_right .icon').attr('carac');
        opponentEgo = parseInt($('#leagues_right div.lead_ego div:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10);
        opponentAlpha = JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=1]').attr('new-girl-tooltip-data'));
        opponentBeta = JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=2]').attr('new-girl-tooltip-data'));
        opponentOmega = JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=3]').attr('new-girl-tooltip-data'));
        opponentExcitement = Math.round((opponentAlpha.caracs.carac1 + opponentAlpha.caracs.carac2 + opponentAlpha.caracs.carac3) * 28);

        opponentDefHCStr = $('#leagues_right div.stats_wrap div:nth-child(2)').text();
        opponentDefHC = (opponentDefHCStr.includes('.') || opponentDefHCStr.includes(',')) ? parseInt(opponentDefHCStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentDefHCStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10);

        opponentDefCHStr = $('#leagues_right div.stats_wrap div:nth-child(4)').text();
        opponentDefCH = (opponentDefCHStr.includes('.') || opponentDefCHStr.includes(',')) ? parseInt(opponentDefCHStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentDefCHStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10);

        opponentDefKHStr = $('#leagues_right div.stats_wrap div:nth-child(6)').text();
        opponentDefKH = (opponentDefKHStr.includes('.') || opponentDefKHStr.includes(',')) ? parseInt(opponentDefKHStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentDefKHStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10);

        opponentAtkStr = $('#leagues_right div.stats_wrap div:nth-child(8)').text();
        opponentAtk = (opponentAtkStr.includes('.') || opponentAtkStr.includes(',')) ? parseInt(opponentAtkStr.replace('K', '00').replace(/[^0-9]/gi, ''), 10) : parseInt(opponentAtkStr.replace('K', '000').replace(/[^0-9]/gi, ''), 10);

		if (opponentClass == ('class' + HC)) {
           // playerDef = playerDefHC;
            opponentAlphaAdd = opponentAlpha.caracs.carac1;
            opponentBetaAdd = opponentBeta.caracs.carac1;
            opponentOmegaAdd = opponentOmega.caracs.carac1;
            opponentClassStr = 'HC';
        }
        if (opponentClass == ('class' + CH)) {
           // playerDef = playerDefCH;
            opponentAlphaAdd = opponentAlpha.caracs.carac2;
            opponentBetaAdd = opponentBeta.caracs.carac2;
            opponentOmegaAdd = opponentOmega.caracs.carac2;
            opponentClassStr = 'CH';
        }
        if (opponentClass == ('class' + KH)) {
            //playerDef = playerDefKH;
            opponentAlphaAdd = opponentAlpha.caracs.carac3;
            opponentBetaAdd = opponentBeta.caracs.carac3;
            opponentOmegaAdd = opponentOmega.caracs.carac3;
            opponentClassStr = 'KH';
        }
		if (playerClass == ('class' + HC)) {
            opponentDef = opponentDefHC;
        }
        if (playerClass == ('class' + CH)) {
            opponentDef = opponentDefCH;
        }
        if (playerClass == ('class' + KH)) {
            opponentDef = opponentDefKH;
        }

		opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

		opponent = {
            ego: opponentEgo,
            originEgo: parseInt($('#leagues_right .lead_ego div:nth-child(2)').text().replace(/[^0-9]/gi, ''), 10),
            atk: opponentAtk,
            def: opponentDef,

            alpha: opponentAlpha,
            beta: opponentBeta,
            omega: opponentOmega,
            team: opponentTeam,

            orgasm: 0,
            orgasmCount: 0,
            excitement: opponentExcitement,

            text: 'Opponent',
            name: $('#leagues_right .player_block .title').text()
        };

        //Replace opponent excitement with the correct value
        $('div#leagues_right div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(opponentExcitement, 0, 1));

		// because reasons
		let result = opponent;
		return result;
	}

    //needs the dimensions of the arrays Girl, Equipment - no Booster
	function initResultArray2(alphaRows,e){
		// trial and error said: g<=e<=b
		if (e<alphaRows) {e = alphaRows;}
		// printing of points and left ego as a combined string, so no extra array dimension

		this.result = new Array(alphaRows);
		for(igirl = 0; igirl<alphaRows; igirl++) {
			this.result[igirl] = new Array(e);
			for(jequip = 0; jequip<e; jequip++) {
				//maybe 0 would be better
				this.result[igirl][jequip] = igirl*100000 + jequip*100;
			}
		}
		//ist bei this eigentlich implizit
		return this;
	}

    function setPlayerAndFight(alphaRow, haremBonus, boostCordy, boostGinseng){
        console.log('einstieg setPlayerAndFight');
		// for each girl setup iterate through equipments to set all 6
		for (jequip=0; jequip<equips.length; jequip++){
            // reset equipSums just in case
			equipSums = 0;
			// and iterate through equipment each time
			equipLT = equips[jequip];
			equipLM = equips[(jequip+1) % equips.length];
			equipLB = equips[(jequip+2) % equips.length];
			equipRT = equips[(jequip+3) % equips.length];
			equipRM = equips[(jequip+4) % equips.length];
			equipRB = equips[(jequip+5) % equips.length];
            equipSums = calculateEquipSums(equipLT, equipLM, equipLB, equipRT, equipRM, equipRB);

            //apply booster
			//boostGinseng = 0.12 // 0.06 for each ginseng
			//boostCordy = 0.2 // 0.1 for each cordy

            let currentPlayer;

            currentPlayer = createPlayer(alphaGirl, betaGirl, omegaGirl, boostCordy, boostGinseng, equipSums, haremBonus);
            //console.log('alpha ' + alphaGirl.name + ', beta ' + betaGirl.name + ', omega ' + omegaGirl.name);
            createOpponent();


			//get result for this combo
			resultValue = simuFight(currentPlayer, opponent);
			/*      score: Math.floor(matchRating),
					scoreStr: matchRatingStr, // mit Formatierung
					scoreClass: matchRatingClass,
					playerEgoCheck: playerEgoCheck,
					points: pointsInt,
					pointsStr: pointsStr // mit Formatierung	*/
			resultArray.result[alphaRow][jequip] = resultValue.pointsStr + ' & ' + resultValue.scoreStr;
		}
	}

	// girls array to get name which correlates with row number aka alphaRows
    function createTable(girls, alphaRows, boostCordy, boostGinseng){
		//Hero.infos.level
        //reduced to 7 setups from 6 Multi to 6 Mono
        let result;
        let cordy = boostCordy * 10;
        let ginseng = boostGinseng * 100 / 6;
        result = '<style> table, th, td {border: 1px solid #4d222c;   border-collapse: collapse;} th {background-color: #7d2038; color: #7d9938;} </style>';
        result = result + '<table>';
        result = result + '<th>' + ginseng + 'Gin, ' + cordy + 'Cord</th><th>6Mu 0Mo</th><th>5Mu 1Mo</th><th>4Mu 2Mo</th><th>3Mu 3Mo</th><th>2Mu 4Mo</th><th>1Mu 5Mo</th><th>0Mu 6Mo</th>';
        for(i=0; i<(alphaRows); i++){
            result = result + '<tr><td>' + girls[i].name + '</td>';
            for (j=0; j<7;j++){
                result = result + '<td>' + resultArray.result[i][j] + '</td>';
            }
            result = result + '</tr>';
        }
        result = result + '</table>';
        return result;
	}

    function doNutaku(){
        girls = setGirlsNutaku();
        equips = setEquimentNutaku();
        alphaRows = 3;
        let alphaTable = new Array(alphaRows);
        boostCordy = 0.2; //default setup of 2 & 2
		boostGinseng = 0.12; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length);

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //Alexa
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Any
		omegaGirl = girls[2]; // Harmonia
		setPlayerAndFight(alphaRow,haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 1; // counter
		alphaGirl = girls[1];
		alphaTable[alphaRow] = girls[1];
		betaGirl = girls[0];
		omegaGirl = girls[2];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 2; //counter
		alphaGirl = girls[2];
		alphaTable[alphaRow] = girls[2];
		betaGirl = girls[0];
		omegaGirl = girls[1];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

        //first setup calculated and print ready - add meta data
        tableTemp = 'nutaku, ' + playerName + ', lvl' + Hero.infos.level + ', ' + playerClassStr + ' vs. ';
        let oppoOrigEgo = $('#leagues_right div.lead_ego div:nth-child(2)').text();
        let oppoLvl = $('#leagues_right .player_block .lead_player_profile .level_wrapper .level').text();
        let luck = $('#leagues_right .player_block .stats_wrap div:nth-child(10)').text();
        tableTemp = tableTemp + opponent.name  + ', lvl' + oppoLvl + ', ' + opponentClassStr + ', Ego ' + oppoOrigEgo + ', HC ' + opponentDefHCStr + ', CH ' + opponentDefCHStr + ', KH ' + opponentDefKHStr + ', Atk' + opponentAtkStr + ', luck ' + luck +'<br>';
        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);

        // different booster setup
        boostCordy = 0.1; //default setup of 2 & 2
		boostGinseng = 0.18; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length); // just in case

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //Alexa
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Any
		omegaGirl = girls[2]; // Harmonia
		setPlayerAndFight(alphaRow,haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 1; // counter
		alphaGirl = girls[1];
		alphaTable[alphaRow] = girls[1];
		betaGirl = girls[0];
		omegaGirl = girls[2];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 2; //counter
		alphaGirl = girls[2];
		alphaTable[alphaRow] = girls[2];
		betaGirl = girls[0];
		omegaGirl = girls[1];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);

        // different booster setup
        boostCordy = 0; //default setup of 2 & 2
		boostGinseng = 0.24; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length); // just in case

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //Alexa
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Any
		omegaGirl = girls[2]; // Harmonia
		setPlayerAndFight(alphaRow,haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 1; // counter
		alphaGirl = girls[1];
		alphaTable[alphaRow] = girls[1];
		betaGirl = girls[0];
		omegaGirl = girls[2];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 2; //counter
		alphaGirl = girls[2];
		alphaTable[alphaRow] = girls[2];
		betaGirl = girls[0];
		omegaGirl = girls[1];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);
        // different booster setup
        boostCordy = 0.4; //default setup of 2 & 2
		boostGinseng = 0.0; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length); // just in case

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //Alexa
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Any
		omegaGirl = girls[2]; // Harmonia
		setPlayerAndFight(alphaRow,haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 1; // counter
		alphaGirl = girls[1];
		alphaTable[alphaRow] = girls[1];
		betaGirl = girls[0];
		omegaGirl = girls[2];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

		alphaRow = 2; //counter
		alphaGirl = girls[2];
		alphaTable[alphaRow] = girls[2];
		betaGirl = girls[0];
		omegaGirl = girls[1];
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);

        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);
        entryTextArea.innerHTML = tableTemp;
    }

	function doHeh(){
        girls = setGirlsHeh();
        equips = setEquimentHeh();
        alphaRows = 2; // needs to match the number of combinations put into 1 created table
        let alphaTable = new Array(alphaRows);
        boostCordy = 0.2;
        boostGinseng = 0.12;
        resultArray = initResultArray2(alphaRows, equips.length);

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; // counter
		alphaGirl = girls[0]; //NY Estelle
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Himari
		omegaGirl = girls[2]; // Filya
        setPlayerAndFight(alphaRow,haremBonusHeh, boostCordy, boostGinseng);

		alphaRow = 1; //counter
		alphaGirl = girls[3]; //Shtupra
		alphaTable[alphaRow] = girls[3];
		betaGirl = girls[0]; //NY Estelle
		omegaGirl = girls[2];
        setPlayerAndFight(alphaRow, haremBonusHeh, boostCordy, boostGinseng);
/*
		alphaRow = 2; // counter
		alphaGirl = girls[2];
		betaGirl = girls[0];
		omegaGirl = girls[1];
		console.log('doNutakuGirls ' + alphaGirl.Name + betaGirl.Name + omegaGirl.Name);
		setPlayerAndFight(alphaRow, haremBonusNutaku, boostCordy, boostGinseng);
*/
        //first setup calculated and print ready - add meta data
        tableTemp = 'HeH, ' + playerName + ', lvl' + Hero.infos.level + ', ' + playerClassStr + ' vs. ';
        let oppoOrigEgo = $('#leagues_right div.lead_ego div:nth-child(2)').text();
        let oppoLvl = $('#leagues_right .player_block .lead_player_profile .level_wrapper .level').text();
        let luck = $('#leagues_right .player_block .stats_wrap div:nth-child(10)').text();
        tableTemp = tableTemp + opponent.name  + ', lvl' + oppoLvl + ', ' + opponentClassStr + ', Ego ' + oppoOrigEgo + ', HC ' + opponentDefHCStr + ', CH ' + opponentDefCHStr + ', KH ' + opponentDefKHStr + ', Atk' + opponentAtkStr + ', luck ' + luck +'<br>';
        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);

        // different booster setup
        boostCordy = 0.1; //default setup of 2 & 2
		boostGinseng = 0.18; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length); // just in case

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //NY Estelle
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Himari
		omegaGirl = girls[2]; // Filya
		setPlayerAndFight(alphaRow,haremBonusHeh, boostCordy, boostGinseng);

   		alphaRow = 1; //counter
		alphaGirl = girls[3]; //Shtupra
		alphaTable[alphaRow] = girls[3];
		betaGirl = girls[0]; //NY Estelle
		omegaGirl = girls[2];
        setPlayerAndFight(alphaRow, haremBonusHeh, boostCordy, boostGinseng);


        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);

        // different booster setup
        boostCordy = 0; //default setup of 2 & 2
		boostGinseng = 0.24; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length); // just in case

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //NY Estelle
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Himari
		omegaGirl = girls[2]; // Filya
		setPlayerAndFight(alphaRow,haremBonusHeh, boostCordy, boostGinseng);

        alphaRow = 1; //counter
		alphaGirl = girls[3]; //Shtupra
		alphaTable[alphaRow] = girls[3];
		betaGirl = girls[0]; //NY Estelle
		omegaGirl = girls[2];
        setPlayerAndFight(alphaRow, haremBonusHeh, boostCordy, boostGinseng);

        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);

        // different booster setup
        boostCordy = 0.4; //default setup of 2 & 2
		boostGinseng = 0.0; //default setup of 2 & 2
		resultArray = initResultArray2(alphaRows, equips.length); // just in case

        // iterate through girls to set alpha, beta, omega
		alphaRow = 0; //counter
		alphaGirl = girls[0]; //NY Estelle
        alphaTable[alphaRow] = girls[0];
		betaGirl = girls[1]; //Himari
		omegaGirl = girls[2]; // Filya
		setPlayerAndFight(alphaRow,haremBonusHeh, boostCordy, boostGinseng);

        alphaRow = 1; //counter
		alphaGirl = girls[3]; //Shtupra
		alphaTable[alphaRow] = girls[3];
		betaGirl = girls[0]; //NY Estelle
		omegaGirl = girls[2];
        setPlayerAndFight(alphaRow, haremBonusHeh, boostCordy, boostGinseng);


        tableTemp = tableTemp + createTable(alphaTable, alphaRows, boostCordy, boostGinseng);
        entryTextArea.innerHTML = tableTemp;
    }

    //let myalpha = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=1]').attr('new-girl-tooltip-data'));
    //Hero.infos.id == 123 && window.location.hostname == "www.hentaiheroes.com"
    console.log('das steht driN'+entryTextArea.innerHTML+'Hier');
    entryTextArea.innerHTML =	leer;
    console.log('das steht driN'+entryTextArea.innerHTML+'Hier');



    let tablea;
    let tablei = '<table>';
    let spalten=12; let zeilen=3;
    let zeug;
    tablea = initResultArray2(zeilen,spalten);
    for(i=0; i<zeilen; i++){
        tablei = tablei + '<tr>';
        for (j=0; j<spalten;j++){
            if (Hero.infos.id == idTestHeh) {
                zeug = i+j;
            }
            tablei = tablei + '<td>' + zeug + ' & ' + tablea.result[i][j] + '|</td>';
        }
        tablei = tablei + '</tr>';
    }
    tablei = tablei + '</table>';
    entryTextArea.innerHTML = tablei;

    //createOpponent();

    if (Hero.infos.id == idNutaku) {
                doNutaku();
            } else if (Hero.infos.id == idHeh) {
                doHeh();
            } else {alert('Testtest');}

	// decide if show or hide - comes with the obstacle of "no autorefresh on opponent change...
	if (printTable==1) {
		document.getElementById ("paragraph").innerHTML = entryTextArea.innerHTML;
		printTable = 0;
	} else {
		document.getElementById("paragraph").innerHTML = leer;
		printTable = 1;
	}

    // Refresh sim on new opponent selection (Credit: BenBrazke)
    var opntName;
    $('.leadTable').click(function() {
        opntName=''
    })
    function waitOpnt() {
        setTimeout(function() {
            if (JSON.parse($('#leagues_right .girls_wrapper .team_girl[g=3]').attr('new-girl-tooltip-data'))) {
                sessionStorage.setItem('opntName', opntName);
                if (Hero.infos.id == idNutaku) {
                    doNutaku();
                } else if (Hero.infos.id == idHeh) {
                    doHeh();
                } else {alert('Testtest');}
            }
            else {
                waitOpnt()
            }
        }, 50);
    }
    var observeCallback = function() {
        var opntNameNew = $('#leagues_right .player_block .title')[0].innerHTML
        if (opntName !== opntNameNew) {
            opntName = opntNameNew;
            waitOpnt();
        }
    }
    var observer = new MutationObserver(observeCallback);
    var test = document.getElementById('leagues_right');
    observer.observe(test, {attributes: false, childList: true, subtree: false});
}

sheet.insertRule('#simBtnContainer {'
                     + 'display: block;'
                     + 'position: absolute;'
                     + 'left: 20px;'
                     + 'top: 150px;'
                     + 'z-index: 15;'
                     + 'margin: 2px;'
                     + 'padding: 2px 2px;'
                     + 'font-size: 20px;'
                     + 'font-weight: 400;'
                     + 'letter-spacing: .22px;'
                     + 'text-align: left !important;'
                     + 'color: #ffffff;'
                     + 'background:#9c323f;'
                     );

sheet.insertRule('#simTableContainer {'
                     + 'display: block;'
                     + 'position: absolute;'
                     + 'left: 20px;'
                     + 'top: 200px;'
                     + 'z-index: 15;'
                     + 'margin: 2px;'
                     + 'padding: 2px 2px;'
                     + 'font-size: 20px;'
                     + 'font-weight: 400;'
                     + 'letter-spacing: .22px;'
                     + 'text-align: left !important;'
                     + 'color: #000000;'
                     + 'background:#9c323f;'
                     );
