//   |                                                          |
// --+----------------------------------------------------------+--
//   |   Code by : yasserbdj96                                  |
//   |   Email   : yasser.bdj96@gmail.com                       |
//   |   Github  : https://github.com/yasserbdj96               |
//   |   BTC     : bc1q2dks8w8uurca5xmfwv4jwl7upehyjjakr3xga9   |
// --+----------------------------------------------------------+--  
//   |        all posts #yasserbdj96 ,all views my own.         |
// --+----------------------------------------------------------+--
//   |                                                          |

//START{
//iswork:
function iswork_f(){
    try {
        eel.iswork()(
            function(ret){
                return ret;
            }
        )
        return "True";
    } catch(err) {
        return err.message;
    }
}

//
function run(){
	var err=iswork_f();
	if (iswork_f()=="True"){
		settings_opt();
	}else{
		hideall();
		document.getElementById("error").style.display='block';
		document.getElementById("error").innerText=err;
        console.log(err);
		alert(err);
	}
}

//
function settings_opt(){
	hideall();
	document.getElementById("mylist").style.display='block';
	eel.data_file()(
		function(data_content){
			data=data_content["data"];
			for (let i = 0; i < data.length; i++) {
				eel.decode(data[i]["password"])(
					function(ret){
						var stars="*".repeat(ret.length);
						var td_url="<td id='url"+i+"'>"+data[i]["url"]+"</td>";
						var td_user="<td class='copy' id='user"+i+"' onclick='copy("+i+","+'"user"'+")'>"+data[i]["username"]+"</td>";
						var td_passwd="<td class='copy' id='passfake"+i+"' onclick='copy("+i+","+'"passwd"'+")'>"+stars+"</td><td style='display:none;' id='pass"+i+"'>"+ret+"</td>";
						var td_opt="<td><a href='javascript:void(0)' onclick='edit("+i+")'>EDIT</a> | <a id='see"+i+"' href='javascript:void(0)' onclick='see("+i+")'>SEE</a> | <a id='del"+i+"' href='javascript:void(0)' onclick='delt("+i+")'>DELETE</a> | <a id='info"+i+"' href='javascript:void(0)' onclick='info("+i+")'>INFO</a></td>";
						var td_backup="<td id='oth"+i+"' style='display:none;'>"+data[i]["backup"]+"</td>";
						document.getElementById("list").innerHTML+="<tr id='l"+i+"'>"+td_url+td_user+td_passwd+td_opt+td_backup+"</tr>";
					}
				)
				
			}
		}
	)
}

//
function hideall(){
	document.getElementById("mylist").style.display='none';
	document.getElementById("addnew").style.display='none';
	document.getElementById("error").style.display='none';
}

//
function info(i){
	var other=document.getElementById("oth"+i).textContent;
	alert(other);
}

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
function delt(i){
	eel.delt(i)(
		function(ret){
			alert(ret);
			location.reload();
		}
	)
}

//
function copy(i,opt){
	
	// Get the text field
	if (opt=="user"){
		var copyText=document.getElementById("user"+i).textContent;
	}else{
		var copyText=document.getElementById("pass"+i).textContent;
	}
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

	var see=document.getElementById("see"+i);
	if(see.textContent=="SEE"){
		see.innerText="HIDE";
	}else{
		see.innerText="SEE";
	}

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

//
console.log("%c %c %c Safe-Passwd by yasserbdj96 %c  %c  https://yasserbdj96.github.io/  ","background: #0f81c1; padding:5px 0;","background: #0f81c1; padding:5px 0;","color: #0f81c1; background: #3b434b; padding:5px 0;","background: #0f81c1; padding:5px 0;","background: #2aaf49; padding:5px 0;");
//}END.