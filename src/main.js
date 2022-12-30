/*var password_key="1234";*/

//
function settings_opt(){
	hideall();
	document.getElementById("mylist").style.display='block';
	var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", "data.json", true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
			var data = JSON.parse(rawFile.responseText);
			data=data["data"];
			for (let i = 0; i < data.length; i++) {
				eel.decode(data[i]["password"])(
					function(ret){
						var stars="*".repeat(ret.length);
						document.getElementById("list").innerHTML+="<tr id='l"+i+"'><td id='url"+i+"'>"+data[i]["url"]+"</td><td id='user"+i+"'>"+data[i]["username"]+"</td><td id='passfake"+i+"'>"+stars+"</td><td style='display:none;' id='pass"+i+"'>"+ret+"</td><td><a href='#edit' onclick='edit("+i+")'>EDIT</a> | <a href='#copy' onclick='copy("+i+")'>COPY</a> | <a href='#see' onclick='see("+i+")'>SEE</a></td><td id='oth"+i+"' style='display:none;'>"+data[i]["backup"]+"</td></tr>";
					}
				)
				
			}
        }
    }
    rawFile.send(null);
}

function hideall(){
	document.getElementById("mylist").style.display='none';
	document.getElementById("addnew").style.display='none';
}

/*
function visibility(this) {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}*/

//
function addnew(){
	hideall();
	document.getElementById("addnewlink").style.display='none';
	document.getElementById("addnew").style.display='block';
	document.getElementById("addbtn").style.display="block";
	document.getElementById("backlink").style.display='block';
}

//
function addthis(){
	var url=document.getElementById("url").value;
	var user=document.getElementById("user").value;
	var passwd=document.getElementById("passwd").value;
	var other=document.getElementById("other").value;
	
	eel.addnew(url,user,passwd,other)(
		function(ret){
			alert(ret);
			location.reload();
		}
	)
}

//
function edit(i){
	hideall();
	document.getElementById("addnewlink").style.display='none';
	document.getElementById("addnew").style.display='block';
	document.getElementById("editbtn").style.display="block";
	document.getElementById("backlink").style.display='block';
	document.getElementById("editbtn").value=i;


	var url=document.getElementById("url"+i).textContent;
	var user=document.getElementById("user"+i).textContent;
	var passwd=document.getElementById("pass"+i).textContent;
	var other=document.getElementById("oth"+i).textContent;

	document.getElementById("url").value=url;
	document.getElementById("user").value=user;
	document.getElementById("passwd").value=passwd;
	document.getElementById("other").value=other;
}

//
function editthis(){
	var i=document.getElementById("editbtn").value;

	var url=document.getElementById("url").value;
	var user=document.getElementById("user").value;
	var passwd=document.getElementById("passwd").value;
	var other=document.getElementById("other").value;
	
	eel.edit(url,user,passwd,other,i)(
		function(ret){
			alert(ret);
			location.reload();
		}
	)
}

//
function copy(i){
	
	// Get the text field
	var copyText=document.getElementById("pass"+i).textContent;


	// Select the text field
	/*copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices*/
  
	// Copy the text inside the text field
	navigator.clipboard.writeText(copyText);
}

//
function see(i){
	var fake=document.getElementById("passfake"+i);
	var org=document.getElementById("pass"+i);

	if(window.getComputedStyle(fake).display==="none"){
		fake.style.display="block";
		org.style.display="none";
	}else{
		fake.style.display="none";
		org.style.display="block";
	}
}

//
function back(){
	location.reload();
}

//
var timeout = null;
function search(val) {
	if (timeout) {  
	  clearTimeout(timeout);
	}
	timeout = setTimeout(function() {
		var urls = document.querySelectorAll('td[id^="url"]');
		for (let i = 0; i < urls.length; i++) {
			document.getElementById("l"+i).classList.remove("hide");
			//urls[i].style.display="block";
		}
		for (let i = 0; i < urls.length; i++) {
			//const compareValue = val.localeCompare()

			if(urls[i].textContent.toLowerCase().includes(val.toLowerCase())){

			}else{
				document.getElementById("l"+i).classList.add("hide");
			}
		}
	   	 //this is your existing function
	},0);
}