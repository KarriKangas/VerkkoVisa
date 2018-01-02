<!DOCTYPE html>
<html>
<head>
	<?php 
	require_once("/home/vamoodlef/domains/vamoodle.fi/public_html/config.php");
	require_login();
	
	header('Cache-Control: no-cache');
	header('Pragma: no-cache');
	?>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" media="screen and (min-device-width: 1440px)" href="css/desktop-style.css" />
	<link rel='stylesheet' media='screen and (min-width: 800px) and (max-width: 1439px)' href='css/tablet-style.css' />
	<link rel='stylesheet' media='screen and (min-width: 100px) and (max-width: 799px)' href='css/mobile-style.css' />
	
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>Verkkovisa</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<script type="text/javascript" src = "scripts/koodi.js" charset="UTF-8"></script>
</head>
<body onload="showStartOptions();">
	<div class="wrapper">
	
	
	<img id="vakuva" src ="logo/logo.jpg" alt="">
	<img id="homekuva" src="logo/home.png" alt="" onClick="resetPage()">
	<img id="infokuva" src="logo/info.png" alt="" onClick="infoPage()">
	<h2 id="Question">Valitse muoto</h2>
	<div class="QuestionBar" id="startQ">	
		<button class="button" id="Kirja1" onClick="showQuestionElements('Kirja1')"onmouseover="lightButton('Kirja1')" onmouseleave="uncolorButton('Kirja1')"><p class="buttonText">Historia</p></button>
		<button class="button" id="Kirja2" onClick="showQuestionElements('Kirja2')"onmouseover="lightButton('Kirja2')" onmouseleave="uncolorButton('Kirja2')"><p class="buttonText">Yhteiskuntaoppi</p></button>
		
		<button class="button" id="harjTermit" onClick="showTermiSelection(true)"onmouseover="lightButton('harjTermit')" onmouseleave="uncolorButton('harjTermit')"><p class="buttonText">Näytä käsitteen määritelmä ensin</p></button>
		<button class="button" id="harjMääritelmät" onClick="showTermiSelection(false)"onmouseover="lightButton('harjMääritelmät')" onmouseleave="uncolorButton('harjMääritelmät')"><p class="buttonText">Näytä käsite ensin</p></button>
		
		<button class="button" id="Harjoitus" onClick="showQAmountSelection()"onmouseover="lightButton('Harjoitus')" onmouseleave="uncolorButton('Harjoitus')"><p class="buttonText">Harjoitusmuoto</p></button>
		<button class="button" id="Pääsykoe" onClick="showQuestionElements()"onmouseover="lightButton('Pääsykoe')" onmouseleave="uncolorButton('Pääsykoe')"><p class="buttonText">Pääsykoemuoto</p></button>
		<button class="button" id="Termit" onClick="termiVSmääritelmä()"onmouseover="lightButton('Termit')" onmouseleave="uncolorButton('Termit')"><p class="buttonText">Käsitteiden harjoittelu</p></button>
		
		<button class="button" id="kylläMatikka" onClick="chooseMath()"onmouseover="lightButton('kylläMatikka')" onmouseleave="uncolorButton('kylläMatikka')"><p class="buttonText">Pääsykoe</p></button>
		<button class="button" id="eiMatikka" onClick="showQuestionElements()"onmouseover="lightButton('eiMatikka')" onmouseleave="uncolorButton('eiMatikka')"><p class="buttonText">Pääsykoe ilman Talousmatematiikkaa</p></button>
		
		<h3 id="ohje">Kysymykset tulevat harjoituksiin ja pääsykokeeseen satunnaisessa järjestyksessä, joten jokainen yksittäinen harjoitus ja pääsykoe on erilainen.<br><br>
					
					Voit valita harjoitusmuodon, pääsykoemuodon tai käsitteiden harjoittelun.<br><br>
					
					Harjoitusmuodossa valitset ensin kuinka moneen kysymykseen haluat vastata kerralla. Tämän jälkeen valitset aihealueen. Vastattuasi kysymykseen näet heti, oliko vastauksesi oikein. Saat myös tiedon, miltä kirjan sivulta oikea vastaus löytyy.<br><br>

					Pääsykoemuodossa kysymyksiä tulee yhteiskuntaopista ja historiasta molemmista 20 kpl. Näet oikeat vastaukset kun olet vastannut kaikkiin kysymyksiin. Kysymysten määrä saattaa kuitenkin erota oikeasta pääsykokeesta ja et myöskään menetä pisteitä väärästä vastauksesta. Tarkoitus on harjoitella vastaamaan mahdollisimman moneen kysymykseen oikein.<br><br>

					Käsitteiden harjoittelussa valitset, haluatko ensin käsitteen vai määritelmän. Tämän jälkeen valitset aihealueen, jota haluat harjoitella. Harjoitusmuoto näyttää ensin käsitteen tai määritelmän, jonka jälkeen voit miettiä mitä ne tarkoittavat. Näet heti oikean vastauksen.</h3>
		<button class="button" id="KysMäärä10" onClick="showBookSelection('10')"onmouseover="lightButton('KysMäärä10')" onmouseleave="uncolorButton('KysMäärä10')"><p class="buttonText">10 kysymystä</p></button>
		<button class="button" id="KysMäärä50" onClick="showBookSelection('50')"onmouseover="lightButton('KysMäärä50')" onmouseleave="uncolorButton('KysMäärä50')"><p class="buttonText">50 kysymystä</p></button>
		<button class="button" id="KysMäärä100" onClick="showBookSelection('100')"onmouseover="lightButton('KysMäärä100')" onmouseleave="uncolorButton('KysMäärä100')"><p class="buttonText">100 kysymystä</p></button>
	</div>

	<div class="QuestionBar" id="q0">
		<button class="button" id="0" onClick="chooseButton('0')"onmouseover="lightButton('0')" onmouseleave="uncolorButton('0')"><p class="buttonText"></p></button>
		<button class="button" id="1" onClick="chooseButton('1')"onmouseover="lightButton('1')" onmouseleave="uncolorButton('1')"><p class="buttonText"></p></button>
		<button class="button" id="2" onClick="chooseButton('2')"onmouseover="lightButton('2')" onmouseleave="uncolorButton('2')"><p class="buttonText"></p></button>
		<button class="button" id="3" onClick="chooseButton('3')"onmouseover="lightButton('3')" onmouseleave="uncolorButton('3')"><p class="buttonText"></p></button>
		<div class ="BackContinue">
			<button class="backButton" id="5" onClick="prevQuestion()" onmouseover="lightButton('5')" onmouseleave="uncolorButton('5')"><p class="buttonText">Edellinen</p></button>
			<button class="continueButton" id="4" onClick="nextQuestion()" onmouseover="lightButton('4')" onmouseleave="uncolorButton('4')"><p class="buttonText">Seuraava</p></button>
		</div>
	</div>

	


	</div>
</body>
</html>


