
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
    //a line of text to the screen.
    let entryNodeButton       = document.createElement ('p');
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
    let simuresult;

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
        let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

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

        let opponent = {
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
    let leer = ' ';
    let myalpha = JSON.parse($('#leagues_left .girls_wrapper .team_girl[g=1]').attr('new-girl-tooltip-data'));
    //Hero.infos.id == 209261 && window.location.hostname == "www.hentaiheroes.com"
    entryNodeButton.innerHTML =	leer;
    entryNodeButton.innerHTML =	 '<table>'
		+ '<tr><td>playerEgo' +'</td><td>'+playerEgo+'</td><td>'+leer+'</td><td>opponentEgo'+'</td><td>'+opponentEgo+'</td></tr>'
		+ '<tr><td>playerEgoCheck' +'</td><td>'+playerEgoCheck+'</td><td>'+leer+'</td><td>'+leer+'</td><td>'+leer+'</td></tr>'
		+ '<tr><td>playerDefHC' +'</td><td>'+playerDefHC+'</td><td>'+leer+'</td><td>opponentDefHC'+'</td><td>'+opponentDefHC+'</td></tr>'
		+ '<tr><td>'+leer+'</td><td>'+leer+'</td><td>'+leer+'</td><td>opponentDefHCStr'+'</td><td>'+opponentDefHCStr+'</td></tr>'
		+ '<tr><td>playerDefCH' +'</td><td>'+playerDefCH+'</td><td>'+leer+'</td><td>opponentDefCH'+'</td><td>'+opponentDefCH+'</td></tr>'
		+ '<tr><td>'+leer+'</td><td>'+leer+'</td><td>'+leer+'</td><td>opponentDefCHStr'+'</td><td>'+opponentDefCHStr+'</td></tr>'
		+ '<tr><td>playerDefKH' +'</td><td>'+playerDefKH+'</td><td>'+leer+'</td><td>opponentDefKH'+'</td><td>'+opponentDefKH+'</td></tr>'
		+ '<tr><td>'+leer+'</td><td>'+leer+'</td><td>'+leer+'</td><td>opponentDefKHStr'+'</td><td>'+opponentDefKHStr+'</td></tr>'
		+ '<tr><td>playerAtk' +'</td><td>'+playerAtk+'</td><td>'+leer+'</td><td>opponentAtk'+'</td><td>'+opponentAtk+'</td></tr>'
		+ '<tr><td>'+leer +'</td><td>'+leer+'</td><td>'+leer+'</td><td>opponentAtkStr'+'</td><td>'+opponentAtkStr+'</td></tr>'
		+ '<tr><td>playerDef' +'</td><td>'+playerDef+'</td><td>'+leer+'</td><td>opponentDef'+'</td><td>'+opponentDef+'</td></tr>'
		+ '<tr><td>score' +'</td><td>'+simuresult.score+'</td><td>'+leer+'</td><td>opponentClass'+'</td><td>'+opponentClass+'</td></tr>'
		+ '<tr><td>scoreStr' +'</td><td>'+simuresult.scoreStr+'</td><td>'+leer+'</td><td>opponentExcitement'+'</td><td>'+opponentExcitement+'</td></tr>'
		+ '<tr><td>scoreClass' +'</td><td>'+simuresult.scoreClass+'</td><td>'+leer+'</td><td>opponentAlphaAdd'+'</td><td>'+opponentAlphaAdd+'</td></tr>'
		+ '<tr><td>playerEgoCheck' +'</td><td>'+simuresult.playerEgoCheck+'</td><td>'+leer+'</td><td>opponentBetaAdd'+'</td><td>'+opponentBetaAdd+'</td></tr>'
		+ '<tr><td>points' +'</td><td>'+simuresult.points+'</td><td>'+leer+'</td><td>opponentOmegaAdd'+'</td><td>'+opponentOmegaAdd+'</td></tr>'
		+ '<tr><td>hero: ' +'</td><td>'+ Hero.infos.id +'</td><td>'+leer+'</td><td>gebaut '+ 'class'+ CH + '</td><td>'+$('#leagues_right .player_block .title').text()+'</td></tr>'
		+ '</table>'    ;
    document.getElementById ("simBtnContainer").appendChild(entryNodeButton);


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
