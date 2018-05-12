var currentButton = -1;
var correctAns;
var currentQuestionID = 0;
var kirjaMäärä = 3;
var currentBook = "";
var questionPool = [];
var questionAmount = 30;
var correctAmount = 0;
var harjoitusMode = false;
var talousMatematiikka = false;
var ready = false;
var waitInterval = 100;
var harjoitusQselected = false;
var gameover = false;
var questions1 = [];
var questions2 = [];
var questions3 = [];
var questions4 = [];
var väärät = [];
var vastauksetVäärissä = [];
var reviewing = false;
var reviewed = false;
var currReviewID;
var loading = true;
var termiMoodi = false;
var termienHarjoitus;


//show this at start
function showStartOptions(){
	
	//Hide book selection
	for(i = 1; i <= kirjaMäärä; i++){		
		document.getElementById("Kirja" + i).style.display = "none";
	}

	
	//Hide question elements
	QuestionElementVisibility("none");
	
	//Hide question amount selection
	document.getElementById("KysMäärä10").style.display = "none";
	document.getElementById("KysMäärä50").style.display = "none";
	document.getElementById("KysMäärä100").style.display = "none";
	
	//Hide ohje
	document.getElementById("ohje").style.display = "none";
	
	//Hide matikka
	document.getElementById("eiMatikka").style.display = "none";
	document.getElementById("kylläMatikka").style.display = "none";
	
	//Hide termiharjoitus valinta
	document.getElementById("harjTermit").style.display = "none";
	document.getElementById("harjMääritelmät").style.display = "none";
	
}
//if "harjoitus" mode
function showBookSelection(amount){
	document.getElementById("Question").innerHTML = "Valitse kirja";
	
	questionAmount = amount;
	harjoitusMode = true;
	//Hide Q amount selection
	document.getElementById("KysMäärä10").style.display = "none";
	document.getElementById("KysMäärä50").style.display = "none";
	document.getElementById("KysMäärä100").style.display = "none";
	
	//Show book selection
	for(i = 1; i <= kirjaMäärä; i++){		
		document.getElementById("Kirja" + i).style.display = "inline-block";
	}
}

function showQAmountSelection(){
	document.getElementById("Question").innerHTML = "Valitse kysymysten määrä";

	document.getElementById("ohje").style.display = "none";
	
	harjoitusMode = true;
	//Hide mode selection
	document.getElementById("Harjoitus").style.display = "none";
	document.getElementById("Pääsykoe").style.display = "none";
	document.getElementById("Termit").style.display = "none";
	
	//Show Q amount selection
	document.getElementById("KysMäärä10").style.display = "inline-block";
	document.getElementById("KysMäärä50").style.display = "inline-block";
	document.getElementById("KysMäärä100").style.display = "inline-block";
	
}


function showMatikkaSelection(valittuKirja){
	
	document.getElementById("Harjoitus").style.display = "none";
	document.getElementById("Pääsykoe").style.display = "none";
	document.getElementById("Termit").style.display = "none";
	
	document.getElementById("eiMatikka").style.display = "inline-block";
	document.getElementById("kylläMatikka").style.display = "inline-block";
	
}

function chooseMath(){
	talousMatematiikka = true;
	showQuestionElements();
	questionAmount = 40;
	//console.log("Talousmatematiikka valittu");
}

function showTermiSelection(valinta){
	termiMoodi = true;
	termienHarjoitus = valinta;
	document.getElementById("harjTermit").style.display = "none";
	document.getElementById("harjMääritelmät").style.display = "none";
	
	if(termienHarjoitus == true){
		document.getElementById("Question").innerHTML = "Valitse kirja, josta haluat harjoitella käsitteitä";

	}else{
		document.getElementById("Question").innerHTML = "Valitse kirja, josta haluat harjoitella määritelmiä";

	}
	
	for(i = 1; i <= 2; i++){		
		document.getElementById("Kirja" + i).style.display = "inline-block";
		
	}

	
}

function showQuestionElements(valittuKirja){
	
	//JOS EI OLLA TERMIMOODISSA
	if(!termiMoodi){
	//Aseta valittu kirja parametrin mukaan
	if(valittuKirja != null){
	currentBook = valittuKirja;
	}else{
		currentBook = "Kirja1";
	}
	//console.log(currentBook + " on tämänhetkinen kirja");
	
	//Show question elements
	QuestionElementVisibility("inline-block");
	document.getElementById("ohje").style.display = "none";
	//Show continue
	document.getElementById('4').style.visibility = "visible";

	document.getElementById("Termit").style.display = "none";
	document.getElementById("Harjoitus").style.display = "none";
	document.getElementById("Pääsykoe").style.display = "none";
	document.getElementById("startQ").style.display = "none";
	
	
	initQuestionPool(currentBook);
	}
	//JOS OLLAAN TERMIMOODISSA
	else{
		//Asetetaan valittu termikirja currenBookiksi
		var tempTermi = valittuKirja.substring(5,6);
		currentBook = "Termit" + parseInt(tempTermi);
		//console.log(currentBook);
		
		//Tehdään lista kaikista sen termeistä
		var termiMoodiAmount;
		var bookLocation = currentBook + ".json";
		
	$.getJSON( "scripts/" + bookLocation, function( data ) {
		termiMoodiAmount = data.length;
		////console.log(termiMoodiAmount);
		
		for(i = 0; i < termiMoodiAmount; i++){
			questionPool.push(i);
		}
			
		shuffle(questionPool);
		 //Nyt on luotu lista jossa satunnaisessa järjestyksessä numerot 0-Termit1/2/3.length
		 //Sitten vain näytetään ensimmäinen termiMoodi
		 currentQuestionID = questionPool[0];
		
		if(termienHarjoitus == true){
		document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Määritelmä;
		}else{
			document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Termi;
		}
		
	
	
	//Hide books
	for(i = 1; i <= 2; i++){		
		document.getElementById("Kirja" + i).style.display = "none";
		
	}
	
	//Show one button
	document.getElementById("startQ").style.display = "none";
	document.getElementById("q0").style.display = "inline-block";
	document.getElementById("0").style.display = "inline-block";
	document.getElementById("4").style.display = "inline-block";
	
	if(termienHarjoitus == true){
	document.getElementById("0").innerHTML = "Näytä vastaus";
	}else{
		document.getElementById("0").innerHTML = "Näytä vastaus";
	}
	
	});
	}	
}

function termiVSmääritelmä(){
	document.getElementById("Harjoitus").style.display = "none";
	document.getElementById("Pääsykoe").style.display = "none";
	document.getElementById("Termit").style.display = "none";
	
	document.getElementById("harjTermit").style.display = "inline-block";
	document.getElementById("harjMääritelmät").style.display = "inline-block";
	
	
	
}

function showNewTermi(){
	var bookLocation = currentBook + ".json";
		
	$.getJSON( "scripts/" + bookLocation, function( data ) {
	if(termienHarjoitus == true){
		document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Määritelmä;
		document.getElementById("0").innerHTML = "Näytä vastaus";
	}else{
		document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Termi;
		document.getElementById("0").innerHTML = "Näytä vastaus";
	}
	
	});
}

function showTermiDefinition(){
	var bookLocation = currentBook + ".json";
		
	$.getJSON( "scripts/" + bookLocation, function( data ) {
		if(termienHarjoitus == true){
			document.getElementById("0").innerHTML = data[questionPool[currentQuestionID]].Termi + " s." + data[questionPool[currentQuestionID]].sivu; //Näytä termi
		}else{
			document.getElementById("0").innerHTML = data[questionPool[currentQuestionID]].Määritelmä + " s." + data[questionPool[currentQuestionID]].sivu; //Näytä määritelmä
		}
		
		
		
	});
}	
	


//shuffle function for scrambling lists in termiMoodi
function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}


function QuestionElementVisibility(visib){
	//Hide/Show answer buttons
	for(i = 0; i < 4; i++){
		document.getElementById(i).style.display = visib;
	}
	
	if(!gameover){
	document.getElementById("q0").style.display = visib;
	document.getElementById('4').style.display = "none"; 
	document.getElementById('5').style.display = "none";
	}
	
}

 function initQuestion(currentBook){
	//console.log("questions have been loaded, initializing");
	setQuestionTexts(currentBook);
	 
 }
 
 function setQuestionTexts(book){
	//Kirjan sijainti
	var bookLocation = book + ".json";
	//console.log("valitaan kysymys " +questionPool[currentQuestionID] + " sijainnista: scripts/" + bookLocation);
	//Hae JSON tietokannasta oikeakysymys
	$.getJSON( "scripts/" + bookLocation, function( data ) {
		//console.log(questionPool[currentQuestionID]);
		document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Question + " (" + (currentQuestionID+1) +"/"+ questionAmount+")"; //Aseta kysymys
		correctAns = data[questionPool[currentQuestionID]].CorrAns; //Aseta oikea vastaus
		
		//Piilota kaikki nappulat
		for(i = 0; i < 4; i++){
			document.getElementById(i).style.visibility = "hidden";
		}
	 
	 
		//Näytä oikea määrä nappuloita
		//console.log(currentQuestionID);
		for(i = 0; i < data[questionPool[currentQuestionID]].Answers.length; i++){
			document.getElementById(i).innerHTML = data[questionPool[currentQuestionID]].Answers[i];    //Vaihda vastaustekstit
			document.getElementById(i).style.visibility = "visible";
		}
	
 });
 }
 
function chooseButton(number) {
	currentButton = number;
	if(!termiMoodi){
	//Jos EI olla harjoitusmoodissa
	if(harjoitusMode && !harjoitusQselected && !loading){
		harjoitusQselected = true;
		var tempElement;
		//Kun nappula valitaan, resetoi nappuloiden värit
		resetButtons();
		
		
	
		//Ja valitse + värjäävalittu nappula
		var chosenButton = document.getElementById(number);
		
		if(currentButton == correctAns){
			chosenButton.style.backgroundColor = "#00cc00"; //jos oikein, vihreä
			showAnswerPages(currentBook);
		}else{
			chosenButton.style.backgroundColor = "#cc0000";  //jos väärin, punainen
			document.getElementById(correctAns).style.backgroundColor = "#00cc00"; //ja oikea vihreällä
			showAnswerPages(currentBook);
		}
		
		document.getElementById('4').style.display = "inline-block"; 
	
		
	}
	//Jos ollaan harjoitusmoodissa
	else if (!harjoitusMode && !reviewing && !loading){
		nextQuestion();
	}
	
	}else{ //JOS OLLAAN TERMIMOODISSA
		showTermiDefinition();
    }
}

function showAnswerPages(book){
		bookLocation = book + ".json";
	
		$.getJSON( "scripts/" + bookLocation, function( data ){ 
		if(data[questionPool[currentQuestionID]].sivu.length > 0){
		document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Question + " (" + (currentQuestionID+1) +"/"+ questionAmount+") <u>Oikea vastaus s." + data[questionPool[currentQuestionID]].sivu + "</u>"; //Aseta kysymys	
		}else{
		document.getElementById("Question").innerHTML = data[questionPool[currentQuestionID]].Question + " (" + (currentQuestionID+1) +"/"+ questionAmount+")";
		}		
	
 });
	
}

//Rakennetaan question pool harjoitusmoodia varten yllä, alempana pääsykoetta
function initQuestionPool(book){
	
	
	var tempNum;
	var bookLocation = book + ".json";
	
	
	if(harjoitusMode){
		//console.log("Harjoitus-mode questions building");
	$.getJSON( "scripts/" + bookLocation, function( data ) {
		
		console.log("book.length " + data.length + " and q amount " + questionAmount);
		if(data.length < questionAmount){
			questionAmount = data.length-1;
		}
		
		while (questionPool.length < questionAmount){
			console.log(questionPool.length + " ja " + questionAmount);
			tempNum = Math.floor((Math.random() * (data.length-1))); 
		
			
			if($.inArray(tempNum, questionPool) == -1){
				questionPool.push(tempNum);
				console.log(tempNum);
			}

		}
			
	});
	}else{
		var tempNum2;
		var tempNum3;

		//Select questions from book1 for pääsykoe
		//console.log("Starting book1 selection");
		$.getJSON( "scripts/Kirja1.json", function( data ) {
			//console.log("data len1 " + data.length);
			while (questions1.length < 10){
			
				tempNum = Math.floor((Math.random() *(data.length-1))); 
		
			
				if($.inArray(tempNum, questions1) == -1){
					questions1.push(tempNum);
					//console.log(tempNum);
				}
			
			}
			
		
		
		for(i = 0; i < questions1.length; i++){
			questionPool[i] = (questions1[i]);
		}

		});
		
		
		//Select questions from book2 for pääsykoe
		//console.log("Starting book2 selection");
		
			$.getJSON( "scripts/Kirja2.json", function( data ) {
				//console.log("data len2 " + data.length);
				while (questions2.length < 10){
				
					tempNum2 = Math.floor((Math.random() * (data.length-1))); 
			
				
					if($.inArray(tempNum2, questions2) == -1){
						questions2.push(tempNum2);
						//console.log(tempNum2);
					}

				}
				
				for(i = 0; i < questions2.length; i++){
					questionPool[i+10] = (questions2[i]);
				}
			});
		
		
		//Select questions from book3 for pääsykoe
		//console.log("Starting book3 selection");
		$.getJSON( "scripts/Kirja3.json", function( data ) {
			
			while (questions3.length < 10){
			
				tempNum3 = Math.floor((Math.random() * (data.length-1))); 
		
			
				if($.inArray(tempNum3, questions3) == -1){
					questions3.push(tempNum3);
					//console.log(tempNum3);
				}

			}
			for(i = 0; i < questions3.length; i++){
				questionPool[i+20] = (questions3[i]);
			}
		});	
		
		
		/*if(talousMatematiikka){
			var tempNum4;
			
			//console.log("Starting book4 selection");
		$.getJSON( "scripts/Kirja4.json", function( data ) {
			
			while (questions4.length < 7){
			
				tempNum4 = Math.floor((Math.random() * (data.length-1))); 
		
			
				if($.inArray(tempNum4, questions4) == -1){
					questions4.push(tempNum4);
					//console.log(tempNum4 + " tuo valittiin kirjasta 4");
				}

			}
			for(i = 0; i < questions4.length; i++){
			questionPool.push(questions4[i]);
			}
		});	
			
			
		}*/

	}
	


	document.getElementById("Question").innerHTML = "Ladataan kysymyksiä...";

	waitTime(waitInterval);
	
}

function waitTime(){
	//console.log("waitInterval is now " + waitInterval);
	//console.log("checking if questions are loaded");
	if(ready){
		console.log("questions loaded!" + checkIfLoaded(currentBook));
		loading = false;
		
		initQuestion(currentBook);
		
	}
	else{		
		setTimeout(waitTime, waitInterval);
		console.log("loading questions..." + checkIfLoaded(currentBook) );
		waitInterval = waitInterval*2;
	}
		
	
}

	
function checkIfLoaded(book){
	var bookLocation = book + ".json";
	var loadTestQuestion;
	
		//Tarkista onko kysymykset ladattu
	$.getJSON( "scripts/" + bookLocation, function( data ) {
		
		//Haetaan kysymyse tietokannasta
		loadTestQuestion = data[questionPool[currentQuestionID]].Question; //Aseta kysymys
		
		//logataan...
		////console.log(loadTestQuestion);
		
		//Jos kysymys EI ole null, kysymykset on ladattu jos se on null, palautetaan false
		if(loadTestQuestion.length > 0){
			ready = true;
			//console.log("returned true");
		}
		else{
			
			ready =  false;
			//console.log("returned false");
		}
	
	
 });
 return ready;

}



function nextQuestion(){	
	if(!termiMoodi){
	if(currentButton != -1 && !gameover){
		//Tarkista vastaus
		if(currentButton == correctAns){
			//console.log('Correct!');
			correctAmount++;
		}else if(!harjoitusMode){ //jos pääsykoe mode JA väärä vastaus
			vastauksetVäärissä.push(currentButton); //Tallennetaan vastauksetVäärissä taulukkoon painettu nappula, tämä nappula esitetään punaisella kun käydään kysymyksiä läpi
			väärät.push(currentQuestionID);			//Tallennetaan väärät taulukkoon kyseinen kysymys, näitä näytetään kun käydään kysymyksiä läpi
			//console.log('Wrong!');
		}else{
			//console.log('Wrong!');
		}
	
		currentQuestionID++;
		//harjoitusmoodi only juttuja
		if(harjoitusMode){
			harjoitusQselected = false;
			document.getElementById('4').style.display = "none"; 
		}
		
		if(!harjoitusMode && currentQuestionID==10){ currentBook = "Kirja2";}
		//Tässä vaihdetaan pääsykoemuodon kirja
		if(!harjoitusMode && currentQuestionID==20){ currentBook = "Kirja3";}
		
		if(currentQuestionID < questionAmount){
		//Resetoi nappulat ja lisää questionID
		resetButtons();
		currentButton = -1;
		initQuestion(currentBook);
		}else{
			gameover = true;
			if(harjoitusMode){
				//console.log("Harjoitusmoodi päättynyt");
				
				QuestionElementVisibility("none");
				
				document.getElementById("Question").innerHTML = "Sait " + correctAmount +"/"+questionAmount+" pistettä."; 
				
				document.getElementById('4').style.display = "inline-block";
				document.getElementById('4').innerHTML = "Alkuun";
				
			
			}else{
				resetButtons();
				//console.log("Pääsykoemoodi päättynyt");
				QuestionElementVisibility("none");			
				document.getElementById("Question").innerHTML = "Sait " + correctAmount +"/"+questionAmount+" pistettä."; 
				
				document.getElementById('4').style.display = "inline-block";
				document.getElementById('4').innerHTML = "Alkuun";
				
				document.getElementById('5').style.display = "inline-block";
				document.getElementById('5').innerHTML = "Näytä virheet";
				
				for(i = 0; i < väärät.length; i++){
					if(väärät[i] < 20){
						//console.log("Näytetään kysymys id " + questionPool[väärät[i]] + " kirjasta 1, vastasit tähän"+ vastauksetVäärissä[i]);
					}
					else if(väärät[i] >= 20 ){
						//console.log("Näytetään kysymys id " + questionPool[väärät[i]] + " kirjasta 2, vastasit tähän"+ vastauksetVäärissä[i]);
					}

					
					
				}
			}
			
		}
	}else if(reviewing && !reviewed){
		document.getElementById('5').style.display = "inline-block"; // varmista että edellinen näkyy
		resetButtons();
		
		currReviewID++;
		
		if(currReviewID == väärät.length-1){ //jos ollaan viimeisessä kysymyksessä
		reviewed = true;
		document.getElementById('4').innerHTML = "Päävalikkoon";
		}else{
			document.getElementById('4').innerHTML = "Seuraava";
		}
		
		if(väärät[currReviewID] < 20){
			//console.log("Näytetään kysymys id " + questionPool[väärät[currReviewID]] + " kirjasta 1, vastasit tähän"+ vastauksetVäärissä[currReviewID]);
			currentBook = "Kirja1";
		}
		else if(väärät[currReviewID] >= 20){
			//console.log("Näytetään kysymys id " + questionPool[väärät[currReviewID]] + " kirjasta 2, vastasit tähän"+ vastauksetVäärissä[currReviewID]);
			currentBook = "Kirja2";
		}

		showReviewQuestion(currReviewID, currentBook);
		
		
		
	}else{
		location.reload();
	}
	}else{
		currentButton = -1;
		uncolorButton(0);
		var tempIndex;
		document.getElementById("5").style.display = "inline-block";
		tempIndex = questionPool.indexOf(currentQuestionID);
		currentQuestionID = questionPool[tempIndex+1];
		showNewTermi();
		
		if(tempIndex == questionPool.length-1){
			resetPage();
		}		
		else if(tempIndex == questionPool.length-2){
			document.getElementById('4').innerHTML = "Päävalikkoon";
		}
	}
}

function prevQuestion(){
	if(!termiMoodi){
	if(!reviewing){
		resetButtons();
		reviewing = true;
		//console.log("reviewing is now " + reviewing);
		currReviewID = 0;
		QuestionElementVisibility("inline-block");
		document.getElementById('5').style.display = "none";
		document.getElementById('4').innerHTML = "Seuraava";
		document.getElementById('5').innerHTML = "Edellinen";
		
		if(väärät[currReviewID] < 20){
			//console.log("Näytetään kysymys id " + questionPool[väärät[currReviewID]] + " kirjasta 1, vastasit tähän"+ vastauksetVäärissä[currReviewID]);
			currentBook = "Kirja1";
		}
		else if(väärät[currReviewID] >= 20 ){
			//console.log("Näytetään kysymys id " + questionPool[väärät[currReviewID]] + " kirjasta 2, vastasit tähän"+ vastauksetVäärissä[currReviewID]);
			currentBook = "Kirja2";
		}

		
	showReviewQuestion(currReviewID, currentBook);
	
	}else{
		reviewed = false; //reviewed = viimeinen kysymys, eli jos mennään edelliseen, ei olla koskaan viimeisessä
		currReviewID--;
		
		document.getElementById('4').innerHTML = "Seuraava"; //varmistetaan että seuraava nappulassa lukee seuraava 
		if(currReviewID==0){
			document.getElementById('5').style.display = "none";
		}else{
			document.getElementById('5').style.display = "inline-block";
		}
		
		resetButtons();
		
		
		if(väärät[currReviewID] < 20){
			//console.log("Näytetään kysymys id " + questionPool[väärät[currReviewID]] + " kirjasta 1, vastasit tähän"+ vastauksetVäärissä[currReviewID]);
			currentBook = "Kirja1";
		}
		else if(väärät[currReviewID] >= 20){
			//console.log("Näytetään kysymys id " + questionPool[väärät[currReviewID]] + " kirjasta 2, vastasit tähän"+ vastauksetVäärissä[currReviewID]);
			currentBook = "Kirja2";
		}
		
		showReviewQuestion(currReviewID, currentBook);
		
		
	}}else{
		currentButton = -1;
		uncolorButton(0);
		document.getElementById("4").style.display = "inline-block";
		document.getElementById('4').innerHTML = "Seuraava";
		var tempIndex;
		tempIndex = questionPool.indexOf(currentQuestionID);
		currentQuestionID = questionPool[tempIndex-1];
		showNewTermi();
		
		if(tempIndex == 1){
			document.getElementById("5").style.display = "none";
		}
	}	
}

function showReviewQuestion(id, book){
	var bookLocation = book + ".json";
	
	$.getJSON( "scripts/" + bookLocation, function( data ) {
		//console.log("haetaan väärätID " + id);
		if(data[questionPool[väärät[id]]].sivu.length > 0){
			document.getElementById("Question").innerHTML = data[questionPool[väärät[id]]].Question + " (" + (currReviewID+1) +"/"+ väärät.length +")" + "<u> Oikea vastaus s. " + data[questionPool[väärät[id]]].sivu; + "</u>"; //Aseta kysymys
		}else{
			document.getElementById("Question").innerHTML = data[questionPool[väärät[id]]].Question + " (" + (currReviewID+1) +"/"+ väärät.length +")"
		}
		correctAns = data[questionPool[väärät[id]]].CorrAns;
		
		
		//Näytä vain oikea määrä vastauksia (jos kysymyksessä vain 2 tai 3 vastausta, ei näytetä kaikkia)
		//Ensin piilotetaan kaikki, sitten näytetään tarpeeksi
		QuestionElementVisibility("none");
		for(i = 0; i < data[questionPool[väärät[id]]].Answers.length; i++){
				//console.log(data[questionPool[väärät[id]]].Answers.length + " tämän verran näytetään");
				document.getElementById(i).style.display = "inline-block";
		}
		
		document.getElementById(vastauksetVäärissä[id]).style.backgroundColor ="#cc0000";  //väärä vastaus punaisella
		document.getElementById(correctAns).style.backgroundColor = "#00cc00"; //ja oikea vihreällä
		
		for(i = 0; i < data[questionPool[väärät[id]]].Answers.length; i++){
			document.getElementById(i).innerHTML = data[questionPool[väärät[id]]].Answers[i];    //Vaihda vastaustekstit
					
		}

	
 });
	
	
}




//Mouseoverilla kutsuttava nappulanvärjäys 
function lightButton(number){
	
	if(number != currentButton && (!harjoitusQselected || number == 4|| number == 5) && (!reviewing || number == 4|| number == 5)){
		var chosenButton = document.getElementById(number);
		chosenButton.style.backgroundColor = "#a6a6a6"; 
	
	
}
}

//Mouseleavella kutsuttava nappulanvärjäyksenpoisto
function uncolorButton(number){
	
	if(number != currentButton && (!harjoitusQselected || number == 4|| number == 5) && (!reviewing || number == 4|| number == 5)){
		var chosenButton = document.getElementById(number);
		chosenButton.style.backgroundColor = "#bfbfbf"; 
	}
	
	else if(number != currentButton && termiMoodi){
		var chosenButton = document.getElementById(number);
		chosenButton.style.backgroundColor = "#bfbfbf"; 
	}
	
}

//Funktio joka värjää kaikki nappulat harmaiksi
function resetButtons(){
	for(i = 0; i <= 5; i++){

		x = document.getElementById(i);   
		x.style.backgroundColor = "#bfbfbf";                     
	}
}

function resetPage(){
	location.reload();
}

function infoPage(){
	showStartOptions();
	document.getElementById("Question").style.display = "none";
	document.getElementById("Harjoitus").style.display = "none";
	document.getElementById("Pääsykoe").style.display = "none";
	document.getElementById("Termit").style.display = "none";
	
	document.getElementById("startQ").style.display = "inline-block";
	document.getElementById("ohje").style.display = "inline-block";
}
