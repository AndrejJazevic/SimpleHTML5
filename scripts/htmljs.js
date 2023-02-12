function IsEmpty() {
	if (document.forms["forma"].Kiekis.value === "") 
	{
		alert("Laukas 'Kiekis' negali būti tuščias");
		return false;
	}
	if (document.forms["forma"].Metai.value === "" || document.forms["forma"].Mėnuo.value === "" || document.forms["forma"].Diena.value === "") 
	{
		alert("Laukas 'Pristatymo data' negali būti tuščias");
		return false;
	}
	return true;
}

function UnsignedInt() {
	if(!isNaN(document.forms["forma"].Kiekis.value) && 
        parseInt(Number(document.forms["forma"].Kiekis.value)) == document.forms["forma"].Kiekis.value && 
        !isNaN(parseInt(document.forms["forma"].Kiekis.value)))
		{
			if(document.forms['forma'].Kiekis.value >= 0)
			{
				return true;
			}
			alert("Laukas 'Kiekis' turi būti teigiamas sveikas skaičius");
			return false;
		}
	alert("Laukas 'Kiekis' turi būti sveikas skaičius");
	return false;
}

function CheckDate(){
	var yearStr = document.forms['forma'].Metai.value;
	var monthStr = document.forms['forma'].Mėnuo.value;
	var dayStr = document.forms['forma'].Diena.value;
	if (yearStr != parseInt(yearStr)) {
		alert("Laukai 'Pristatymo data' turi būti teigiami sveikieji skaičiai");
        return false;
    }
	if (monthStr != parseInt(monthStr)) {
		alert("Laukai 'Pristatymo data' turi būti teigiami sveikieji skaičiai");
        return false;
    }
	if (dayStr != parseInt(dayStr)) {
		alert("Laukai 'Pristatymo data' turi būti teigiami sveikieji skaičiai");
        return false;
    }
    var year = parseInt(yearStr);
    var month = parseInt(monthStr);
    var day = parseInt(dayStr);
	if (year < 2000 || year > 2022) {
		alert("Neteisingi metai");
        return false;
    }
    if (month < 1 || month > 12) {
		alert("Neteisingas mėnuo");
        return false;
    }
    var date = new Date(year, month-1, day);
    if (date.getDate() != day) {
        alert("Neteisinga diena");
        return false;
    }
	return true;
}


function MakeOrder() {
	if(IsEmpty() && UnsignedInt() && CheckDate())
	{
		$(document).ready(function() {
			$("p#dis1").show("slow");
			$("p#inf1").show();
			$(".forma-laukas").append("<button>Grįžti</button>");
			$("h2").remove();
			$("h3").remove();
			$("img").remove();
			$("p#inf2").remove();
			var val1 = $("p#f1 > input").val();
			$("p#f1").text("Jūsų prekės kiekis: " + val1);
			$("p#f1").css("font-weight", "bold");
			$("p#f1").css("font-size", "20px");
			var val2 = $("p#f2 > input#in1").val();
			var val3 = $("p#f2 > input#in2").val();
			var val4 = $("p#f2 > input#in3").val();
			$("p#f2").text("Atsiimti prekę iki: " + val2 + "-" + val3 + "-" + val4);
			if(val3 < 10)
			{
				$("p#f2").text("Atsiimti prekę iki: " + val2 + "-" + "0" + val3 + "-" + val4);
			}
			if(val4 < 10)
			{
				$("p#f2").text("Atsiimti prekę iki: " + val2 + "-" + val3 + "-" + "0" + val4);
			}
			if(val4 < 10 && val3 < 10)
			{
				$("p#f2").text("Atsiimti prekę iki: " + val2 + "-" + "0" + val3 + "-" + "0" + val4);
			}		
			$("p#f2").css("font-weight", "bold");
			$("p#f2").css("font-size", "20px");
			for(var i = 0; i < index; i++)
			{
				$.ajax("https://jsonblob.com/api/jsonBlob/" + id[i], {
					method: "GET",
					dataType: "json"
				}).then(successGet);
			}
		});
		return true;
	}
	return false;
}

var id = [];
var index = 0;

$.ajax("https://jsonblob.com/api/jsonBlob", {
	method: "POST",
	data: JSON.stringify({
		"Prietaisas": "Pėlė",
		"Kaina": "15.90",
		"Pagaminimo data": "2015"
	}),
	contentType: "application/json",
	dataType: "json",
}).then(successPost);

$.ajax("https://jsonblob.com/api/jsonBlob", {
	method: "POST",
	data: JSON.stringify({
		"Prietaisas": "Ausinės",
		"Kaina": "35.90",
		"Pagaminimo data": "2018"
	}),
	contentType: "application/json",
	dataType: "json",
}).then(successPost);

function successPost(response, status, jqXHR){
	id[index] = (jqXHR.getResponseHeader('Location')).substring((jqXHR.getResponseHeader('Location')).lastIndexOf('/') + 1);
	index++;
}

function successGet(data){
    $("table").append("<tr>" + "<td>" + data["Prietaisas"] + "</td>" + "<td>" + data["Kaina"] + "</td>" + "<td>" + data["Pagaminimo data"] + "</td>" + "</tr>");
}