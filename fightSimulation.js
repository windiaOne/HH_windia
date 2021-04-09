
/*--- Create a button in a container div.  It will be styled and positioned with CSS.
*/
let entryNodeButton       = document.createElement ('div');
entryNodeButton.innerHTML = '<button id="simulationButton" type="button">'
                + 'Simulate fight!</button>'
                ;
entryNodeButton.setAttribute ('id', 'simBtnContainer');
//zeigt an, welche Seite geladen sein muss, damit das div dazukommt
if (window.location.pathname == '/tower-of-fame.html'){
    document.body.appendChild (entryNodeButton);
}

//--- Activate the newly added button.
document.getElementById ("simulationButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (enButtonEvent) {
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

	// setting global variables
	idNutaku = 	1375928;
	idHeh = 959708;
	idTestHeh = 2110;
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
	//market stuff based on level (=Hero.infos.level)
	if (playerClass == ('class' + HC)) {
            lvlBasedHC = 9*Hero.infos.level;
            lvlBasedCH = 5*Hero.infos.level;
            lvlBasedKH = 7*Hero.infos.level;
        }
    if (playerClass == ('class' + CH)) {
            lvlBasedHC = 7*Hero.infos.level;
            lvlBasedCH = 9*Hero.infos.level;
            lvlBasedKH = 5*Hero.infos.level;
        }
    if (playerClass == ('class' + KH)) {
            lvlBasedHC = 5*Hero.infos.level;
            lvlBasedCH = 7*Hero.infos.level;
            lvlBasedKH = 9*Hero.infos.level;
        }

	// each server needs equipment and girls to be setup
	function setEquimentNutaku(){
		//not sure if rewrite is neccessary to get complete simulation
		//first 6 multi, then 6 mono
		let equipment = new Array();
		equipment[0] = new Object();
		equipment[0]['Position'] = 'LT'; //linksoben
		equipment[0]['HC'] = 3160;
		equipment[0]['CH'] = 3193;
		equipment[0]['KH'] = 3212;
		equipment[0]['luck'] = 4218;
		equipment[0]['endur'] = 3074;

		equipment[1] = new Object();
		equipment[1]['Position'] = 'LM'; //linksmitte
		equipment[1]['HC'] = 3181;
		equipment[1]['CH'] = 3065;
		equipment[1]['KH'] = 3236;
		equipment[1]['luck'] = 4215;
		equipment[1]['endur'] = 2994;

		equipment[2] = new Object();
		equipment[2]['Position'] = 'LB';//linksunten
		equipment[2]['HC'] = 3146;
		equipment[2]['CH'] = 3132;
		equipment[2]['KH'] = 3219;
		equipment[2]['luck'] = 4216;
		equipment[2]['endur'] = 3245;

		equipment[3] = new Object();
		equipment[3]['Position'] = 'RT'; //rechtsoben
		equipment[3]['HC'] = 3231;
		equipment[3]['CH'] = 3200;
		equipment[3]['KH'] = 3236;
		equipment[3]['luck'] = 4218;
		equipment[3]['endur'] = 2974;

		equipment[4] = new Object();
		equipment[4]['Position'] = 'RM'; //rechtsmitte
		equipment[4]['HC'] = 3141;
		equipment[4]['CH'] = 3242;
		equipment[4]['KH'] = 3239;
		equipment[4]['luck'] = 4215;
		equipment[4]['endur'] = 3046;

		equipment[5] = new Object();
		equipment[5]['Position'] = 'RB'; //rechtsunten
		equipment[5]['HC'] = 3184;
		equipment[5]['CH'] = 3202;
		equipment[5]['KH'] = 3215;
		equipment[5]['luck'] = 4183;
		equipment[5]['endur'] = 3097;

		//now 6 mono
		equipment[6] = new Object();
		equipment[6]['Position'] = 'LT'; //linksoben
		equipment[6]['HC'] = 0;
		equipment[6]['CH'] = 0;
		equipment[6]['KH'] = 5068;
		equipment[6]['luck'] = 0;
		equipment[6]['endur'] = 0;

		equipment[7] = new Object();
		equipment[7]['Position'] = 'LM'; //linksmitte
		equipment[7]['HC'] = 0;
		equipment[7]['CH'] = 0;
		equipment[7]['KH'] = 5052;
		equipment[7]['luck'] = 0;
		equipment[7]['endur'] = 0;

		equipment[8] = new Object();
		equipment[8]['Position'] = 'LB';//linksunten
		equipment[8]['HC'] = 0;
		equipment[8]['CH'] = 0;
		equipment[8]['KH'] = 5143;
		equipment[8]['luck'] = 0;
		equipment[8]['endur'] = 0;

		equipment[9] = new Object();
		equipment[9]['Position'] = 'RT'; //rechtsoben
		equipment[9]['HC'] = 0;
		equipment[9]['CH'] = 0;
		equipment[9]['KH'] = 5116;
		equipment[9]['luck'] = 0;
		equipment[9]['endur'] = 0;

		equipment[10] = new Object();
		equipment[10]['Position'] = 'RM'; //rechtsmitte
		equipment[10]['HC'] = 0;
		equipment[10]['CH'] = 0;
		equipment[10]['KH'] = 5068;
		equipment[10]['luck'] = 0;
		equipment[10]['endur'] = 0;

		equipment[11] = new Object();
		equipment[11]['Position'] = 'RB'; //rechtsunten
		equipment[11]['HC'] = 0;
		equipment[11]['CH'] = 0;
		equipment[11]['KH'] = 5187;
		equipment[11]['luck'] = 0;
		equipment[11]['endur'] = 0;

		return equipment;
	}

	//assumption: all used girls are upgraded and leveled to their max
	function setGirlsNutaku(){
		let girls = new Array();
		girls[0] = new Object();
		girls[0]['Name'] = 'Alexa';
		girls[0]['upgradedHC'] = 6.16*Hero.infos.level;
		girls[0]['upgradedCH'] = 7.28*Hero.infos.level;
		girls[0]['upgradedKH'] = 15.12*Hero.infos.level;
		girls[0]['excitement'] = (girls[0].upgradedHC + girls[0].upgradedCH + girls[0].upgradedKH)*28;
		//endurance muss noch addiert werden
		girls[0]['egoPart'] = girls[0].upgradedKH*11;


		girls[1] = new Object();
		girls[1]['Name'] = 'Any';
		girls[1]['upgradedHC'] = 6.25*Hero.infos.level;
		girls[1]['upgradedCH'] = 4*Hero.infos.level;
		girls[1]['upgradedKH'] = 13.5*Hero.infos.level;
		girls[1]['excitement'] = (girls[1].upgradedHC + girls[1].upgradedCH + girls[1].upgradedKH)*28;
		//endurance muss noch addiert werden
		girls[1]['egoPart'] = girls[1].upgradedKH*11;

		girls[2] = new Object();
		girls[2].Name = 'Harmonia';
		girls[2].upgradedHC = 3.75*Hero.infos.level;
		girls[2].upgradedCH = 7.5*Hero.infos.level;
		girls[2].upgradedKH = 13.25*Hero.infos.level;
		girls[2].excitement = (girls[2].upgradedHC + girls[2].upgradedCH + girls[2].upgradedKH)*28;
		//endurance muss noch addiert werden
		girls[2].egoPart = girls[2].upgradedKH*11;

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
		result  = Math.round((player2ndStat/2 + player3rdStat/2 + 1.5* alpha2nd + 1.5* alpha3rd) / 2);
		//result.alphaBeta = result.alpha + 1.75* beta1st;
		//result.alphaBetaOmega = result.alphabeta + omega1st;

		return result;
	}

	function calculateDefSideX(heroXStat, alphaX){
		let result;
		result = Math.round(heroXStat/2 + 1.5* alphaX);

		return result;
	}

	function calculateEgo(endurance, alpha1st) {
		let result;
		result = Math.round(endurance + 11*alpha1st);
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
			part2 = Math.round((lvlBasedHC + boughtStatHC)*(clubbonus))*5 + Math.round((lvlBasedKH + boughtStatKH)*(clubbonus))*2;
			part3 = Math.round((equipSums.HC) * (1+clubbonus))*5 + Math.round((equipSums.KH) * (1+clubbonus))*2;
			part4 = Math.round((lvlBasedHC + boughtStatHC + equipSums.HC)* boostGinseng)*5 + Math.round((lvlBasedKH + boughtStatKH + equipSums.KH)* boostGinseng)*2;
		}
		if (playerClass == ('class' + CH)) {
			part1 = Math.floor(((lvlBasedCH + boughtStatCH)*5 + (lvlBasedHC + boughtStatHC)*2 + equipSums.endur + haremBonus) * (1+clubbonus));
			part2 = Math.round((lvlBasedCH + boughtStatCH)*(clubbonus))*5 + Math.round((lvlBasedHC + boughtStatHC)*(clubbonus))*2;
			part3 = Math.round((equipSums.CH) * (1+clubbonus))*5 + Math.round((equipSums.HC) * (1+clubbonus))*2;
			part4 = Math.round((lvlBasedCH + boughtStatCH + equipSums.CH)* boostGinseng)*5 + Math.round((lvlBasedHC + boughtStatHC + equipSums.HC)* boostGinseng)*2;
		}
		if (playerClass == ('class' + KH)) {
			part1 = Math.floor(((lvlBasedKH + boughtStatKH)*5 + (lvlBasedCH + boughtStatCH)*2 + equipSums.endur + haremBonus) * (1+clubbonus));
			part2 = Math.round((lvlBasedKH + boughtStatKH)*(clubbonus))*5 + Math.round((lvlBasedCH + boughtStatCH)*(clubbonus))*2;
			part3 = Math.round((equipSums.KH) * (1+clubbonus))*5 + Math.round((equipSums.CH) * (1+clubbonus))*2;
			part4 = Math.round((lvlBasedKH + boughtStatKH + equipSums.KH)* boostGinseng)*5 + Math.round((lvlBasedCH + boughtStatCH + equipSums.CH)* boostGinseng)*2;
		}
		result = part1 + part2 + part3 + part4;

		return result;
	}

	// needs 6 equipments, delivered in the form of their setup as 6 objects
	function calculateEquipSums(equipLT, equipLM, equipLB, equipRT, equipRM, equipRB){
		let result;
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

	/* girls as objects as in Array set, equipment precalculated, haremBonus = server decision*/
	function createPlayer(alphaGirl, betaGirl, omegaGirl, boostCordy, boostGinseng, equipSums, haremBonus){
		let playerMarket; //was im Markt angezeigt wird, hängt an Klasse und Equipment
		let endurance;

		// INIT
        playerClass = $('#leagues_left .icon').attr('carac');
		playerMarket = calculatePlayerMarket(equipSums, boostGinseng);
		endurance = calculateEndurance(equipSums, haremBonus, boostGinseng);

		//Atk & Def depends on class, so calculation moved down
		// for structure of "player" - no other use found so far^^
        playerAlpha = setGirl4Team(alphaGirl.upgradedHC, alphaGirl.upgradedCH, alphaGirl.upgradedKH);
        playerBeta = setGirl4Team(betaGirl.upgradedHC, betaGirl.upgradedCH, betaGirl.upgradedKH);
        playerOmega = setGirl4Team(omegaGirl.upgradedHC, omegaGirl.upgradedCH, omegaGirl.upgradedKH);
        //just in case, this global variable might already be initiated using createOpponent()
		opponentClass = $('#leagues_right .icon').attr('carac');

		if (playerClass == ('class' + HC)) {
            playerAlphaAdd = alphaGirl.upgradedHC;
            playerBetaAdd = betaGirl.upgradedHC;
            playerOmegaAdd = omegaGirl.upgradedHC;
            //opponentDef = opponentDefHC;
			playerEgo = calculateEgo(endurance, alphaGirl.upgradedHC);
			playerAtk = calculateAttack(playerMarket.player1stStat, alphaGirl.upgradedHC, boostCordy);
			playerDefHC = calculateDefMain(playerMarket.player2ndStat, playerMarket.player3rdStat, alphaGirl.upgradedKH, alphaGirl.upgradedCH);
			playerDefCH = calculateDefSideX (playerMarket.player3rdStat, alphaGirl.upgradedCH);
			playerDefKH = calculateDefSideX (playerMarket.player2ndStat, alphaGirl.upgradedKH);
			playerExcitement = calculateExcitment(alphaGirl.upgradedHC, alphaGirl.upgradedKH, alphaGirl.upgradedCH);
        }
        if (playerClass == ('class' + CH)) {
            playerAlphaAdd = alphaGirl.upgradedCH;
            playerBetaAdd = betaGirl.upgradedCH;
            playerOmegaAdd = omegaGirl.upgradedCH;
            //opponentDef = opponentDefCH;
			playerEgo = calculateEgo(endurance, alphaGirl.upgradedCH);
			playerAtk = calculateAttack(playerMarket.player1stStat, alphaGirl.upgradedCH, boostCordy);
			playerDefHC = calculateDefSideX (playerMarket.player2ndStat, alphaGirl.upgradedHC);
			playerDefCH = calculateDefMain(playerMarket.player2ndStat, playerMarket.player3rdStat, alphaGirl.upgradedHC, alphaGirl.upgradedKH);
			playerDefKH = calculateDefSideX (playerMarket.player3rdStat, alphaGirl.upgradedKH);
			playerExcitement = calculateExcitment(alphaGirl.upgradedCH, alphaGirl.upgradedHC, alphaGirl.upgradedKH);
        }
        if (playerClass == ('class' + KH)) {
            playerAlphaAdd = alphaGirl.upgradedKH;
            playerBetaAdd = betaGirl.upgradedKH;
            playerOmegaAdd = omegaGirl.upgradedKH;
            //opponentDef = opponentDefKH;
			playerEgo = calculateEgo(endurance, alphaGirl.upgradedKH);
			playerAtk = calculateAttack(playerMarket.player1stStat, alphaGirl.upgradedKH, boostCordy);
			playerDefHC = calculateDefSideX (playerMarket.player3rdStat, alphaGirl.upgradedHC);
			playerDefCH = calculateDefSideX (playerMarket.player2ndStat, alphaGirl.upgradedCH);
			playerDefKH = calculateDefMain(playerMarket.player2ndStat, playerMarket.player3rdStat, alphaGirl.upgradedCH, alphaGirl.upgradedHC);
			playerExcitement = calculateExcitment(alphaGirl.upgradedKH, alphaGirl.upgradedCH, alphaGirl.upgradedHC);
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
        }
        if (opponentClass == ('class' + CH)) {
           // playerDef = playerDefCH;
            opponentAlphaAdd = opponentAlpha.caracs.carac2;
            opponentBetaAdd = opponentBeta.caracs.carac2;
            opponentOmegaAdd = opponentOmega.caracs.carac2;
        }
        if (opponentClass == ('class' + KH)) {
            //playerDef = playerDefKH;
            opponentAlphaAdd = opponentAlpha.caracs.carac3;
            opponentBetaAdd = opponentBeta.caracs.carac3;
            opponentOmegaAdd = opponentOmega.caracs.carac3;
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

		// because reasons
		let result = opponent;
		return result;
	}

    //needs the dimensions of the arrays Girl, Equipment - no Booster
	function initResultArray2(g,e){
		// gemäß Versuch&Irrtum muss g<=e<=b sein
		if (e<g) {e = g;}
		// auf jeder Ebene kann alles ausgegeben werden, also ego/punkte könnte auf eigenes Array und "ganz" ausgeben
		// oder schlicht als String :)

		this.result = new Array(g);
		for(igirl = 0; igirl<g; igirl++) {
			this.result[igirl] = new Array(e);
			for(jequip = 0; jequip<e; jequip++) {
				//maybe 0 would be better
				this.result[igirl][jequip] = igirl*100000 + jequip*100;
			}
		}
		//ist bei this eigentlich implizit
		return this;
	}


        playerClass = $('#leagues_left .icon').attr('carac');
        playerEgo = Math.round(Hero.infos.caracs.ego);
        playerDefHC = Math.round(Hero.infos.caracs.def_carac1);
        playerDefCH = Math.round(Hero.infos.caracs.def_carac2);
        playerDefKH = Math.round(Hero.infos.caracs.def_carac3);
        playerAtk = Math.round(Hero.infos.caracs.damage);
        playerAlpha = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=1]').attr('new-girl-tooltip-data'));
        playerBeta = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=2]').attr('new-girl-tooltip-data'));
        playerOmega = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=3]').attr('new-girl-tooltip-data'));
        playerExcitement = Math.round((playerAlpha.caracs.carac1 + playerAlpha.caracs.carac2 + playerAlpha.caracs.carac3) * 28);

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
        if (playerClass == ('class' + HC)) {
            playerAlphaAdd = playerAlpha.caracs.carac1;
            playerBetaAdd = playerBeta.caracs.carac1;
            playerOmegaAdd = playerOmega.caracs.carac1;
            opponentDef = opponentDefHC;
        }
        if (playerClass == ('class' + CH)) {
            playerAlphaAdd = playerAlpha.caracs.carac2;
            playerBetaAdd = playerBeta.caracs.carac2;
            playerOmegaAdd = playerOmega.caracs.carac2;
            opponentDef = opponentDefCH;
        }
        if (playerClass == ('class' + KH)) {
            playerAlphaAdd = playerAlpha.caracs.carac3;
            playerBetaAdd = playerBeta.caracs.carac3;
            playerOmegaAdd = playerOmega.caracs.carac3;
            opponentDef = opponentDefKH;
        }

        if (opponentClass == ('class' + HC)) {
            playerDef = playerDefHC;
            opponentAlphaAdd = opponentAlpha.caracs.carac1;
            opponentBetaAdd = opponentBeta.caracs.carac1;
            opponentOmegaAdd = opponentOmega.caracs.carac1;
        }
        if (opponentClass == ('class' + CH)) {
            playerDef = playerDefCH;
            opponentAlphaAdd = opponentAlpha.caracs.carac2;
            opponentBetaAdd = opponentBeta.caracs.carac2;
            opponentOmegaAdd = opponentOmega.caracs.carac2;
        }
        if (opponentClass == ('class' + KH)) {
            playerDef = playerDefKH;
            opponentAlphaAdd = opponentAlpha.caracs.carac3;
            opponentBetaAdd = opponentBeta.caracs.carac3;
            opponentOmegaAdd = opponentOmega.caracs.carac3;
        }

        let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
         opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

        let player = {
            ego: playerEgo,
            originEgo: Math.round(Hero.infos.caracs.ego),
            atk: playerAtk,
            def: playerDef,

            alpha: playerAlpha,
            beta: playerBeta,
            omega: playerOmega,
            team: playerTeam,

            orgasm: 0,
            orgasmCount: 0,
            excitement: playerExcitement,

            text: 'Player',
        };

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
        }
        simuresult = simuFight(player, opponent);
        ;

    //let myalpha = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=1]').attr('new-girl-tooltip-data'));
    //Hero.infos.id == 123 && window.location.hostname == "www.hentaiheroes.com"
    entryTextArea.innerHTML =	leer;


    let tablea;
    let tablei = '<table>';
    let spalten=12; let zeilen=3;
    let zeug;
    tablea = initResultArray2(zeilen,spalten);
    for(i=0; i<zeilen; i++){
        tablei = tablei + '<tr>';
        for (j=0; j<spalten;j++){
            if (Hero.infos.id == 1375928) {
                zeug = i+j;
            } else if (Hero.infos.id == 959708) {
                zeug = i*j;
            } else {zeug = 2*(i+j);}
            tablei = tablei + '<td>' + zeug + ' & ' + tablea.result[i][j] + '|</td>';
        }
        tablei = tablei + '</tr>';
    }
    tablei = tablei + '</table>';
    entryTextArea.innerHTML = tablei;

    document.getElementById ("simBtnContainer").appendChild(entryTextArea);


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
                     + 'background:#cc0033;'
                     );
