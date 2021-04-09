# HH_windia
requires HH++ maintained bei Tom208 https://gist.github.com/Tom-208/a5c7065866fe1de5032aabbbd1ed9eff
and some more manual labour.

Goal of this script addon: ease finding my optimal setup for my league fights - based on what I have in use.

While I set up the AGPLv3.0 - technically I depend on the HH++ script's license I guess. As I see none there, I chose one that needs to tell its sources.

That said: my playing style checks on 7 equipment setups: 6 Multi down to 6 Mono. The order is simply driven by "which mono gives most (my main stat) surplus to its multi when chosen". E.g. two multis - 1_a) with 300 stat & 2_a) with 350 stat - to cycled through with two monos - 1_b) 650 stat and 2_b) 750 stat. The diff is in case 1) +350 and in case 2) +400. So I would first use mono 2_b) because it adds 50 more stat then 1_b with only +350.

As of today I develop this on my pace with my needs and abilities. If you have any wishes or bug reports, you might either contact me here on github and hope I recognize it. Or find me in the official game forum.

How to use:
- be aware of manual labour:
-  - set your userid
-  - adjust your harem bonus each time you get or level up a girl
-  - set your girls you want to use - have a look at the wiki for desired values - https://harem-battle.club/wiki/Harem-Heroes/HH:Compare-All-Haremettes
-  - set your equipment in the order it is cycled through
-  - adjust your equipment each time you use a new one or you change cycle through order
- be aware that I'm to high level to concern about anything else below legendary boosters = right now I have no variables reserved in any formula/function call
- be aware that my club bonus is maxed in all matters = right now I have no variables reserved for different club bonus 
- be aware that the official HH++ script calculates the worst case - thus any possible outcome based on luck aka harmony is ignored for the player's side

- you cannot simply install this script and be happy - this script uses functions calls defined in the HH++ script
- either do all updates manually (HH++ and mine) 
- - which means simply install HH++, turn off auto update, copy my code below HH++ in same script file _and_ update the HH++ script manually by copy'n'paste - updating my part is more tricky as the individual settings are not yet condensed in one area
- or copy'n'paste my part at the end of HH++ script each time this got updated and you want to use mine
- - be aware, that this way requires to set up all individiual things again each time
