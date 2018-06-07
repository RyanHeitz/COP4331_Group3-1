var urlBase = 'http://cop4331project.com/';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";
var parent_id = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	password = password + 'salt2';
	password = sha1(password);

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	escape(jsonPayload);

	var url = urlBase + '/Login.' + extension;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{

		xhr.send(jsonPayload);


		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			alert("invalid username or password");
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		parent_id = jsonObject.id;
		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
		hideOrShow( "addPage", false);
		hideOrShow( "usersPage", false);
		hideOrShow( "deletePage",false);


	}
	catch(err)
	{


		alert("invalid username or password");
	}

}



function doEditContactPage()
{

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow( "addPage", false);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",true);
	hideOrShow( "deletePage",false);


}

function doCreateAccount()
{
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow( "addPage", false);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", true);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",false);
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
	hideOrShow( "addPage", false);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",false);
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

function addPage()
{
	hideOrShow( "addPage", true);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",false);
}


function deleteContact()
{

	var firstName4 = document.getElementById("delFirstName").value;
	var lastName4 = document.getElementById("delLastName").value;
	var num4 = document.getElementById("delNumber").value;
	document.getElementById("delContactResult").innerHTML = "";

	document.getElementById("delFirstName").value = "";
	document.getElementById("delLastName").value = "";
	document.getElementById("delNumber").value = "";

	if(firstName4 == "" || lastName4 == "" || num4 == "")
	{

		alert("Contact not deleted");
		cancel();

	}


	var jsonPayloaddc4 =   '{"Contactfirst" : "' + firstName4 + '", "Contactlast" : "' + lastName4 + '", "Phonenumber" : "' + num4 + '", "parent_id" : "' + parent_id + '"}';
	var url = urlBase + '/DelContact.' + extension;
	escape(jsonPayloaddc4);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				alert("Contact Deleted if found");
			}
		};
		xhr.send(jsonPayloaddc4);
	}
	catch(err)
	{
		document.getElementById("delContactResult").innerHTML = err.message;

	}
	cancel();
}


function search()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";

	var jsonPayload = '{"search" : "' + srch + '",  "parent_id" : "' + parent_id + '"}';
	var url = urlBase + '/SearchContact.' + extension;
	escape(jsonPayload);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				hideOrShow( "contactList", true );
				alert("Contacts have been retrieved");
				var jsonObject = JSON.parse( xhr.responseText );
				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "";
					contactList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}


function createAccount()
{
	var first = document.getElementById("firstNameUsers1").value;
	var last = document.getElementById("lastNameUsers1").value;
	var user = document.getElementById("usernameUsers1").value;
	var passw = document.getElementById("passwordUsers1").value;


	document.getElementById("firstNameUsers1").value = "";
	document.getElementById("lastNameUsers1").value = "";
	document.getElementById("usernameUsers1").value = "";
	document.getElementById("passwordUsers1").value = "";

	if(first == "" || last == "" || user == "" || passw == "")
	{

		alert("Account not created");
		back();

	}

	passw = passw + 'salt2';
	passw = sha1(passw);

	var jsonPayload1 = '{"Login" : "' + user + '", "Password" : "' + passw + '", "Contactfirst" : "' + first + '", "Contactlast" : "' + last + '"}';
	escape(jsonPayload1);
	var url = urlBase + '/AddUser.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				alert("Account Created");
			}
		};
		xhr.send(jsonPayload1);
	}
	catch(err)
	{
		document.getElementById("createAccountResult").innerHTML = err.message;
	}



	back();
}

function addContact()
{

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var email = document.getElementById("email").value;
	var num = document.getElementById("num").value;
	var address = document.getElementById("address").value;
	var city = document.getElementById("city").value;
	var state = document.getElementById("state").value;
	var zip = document.getElementById("zip").value;


	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("email").value = "";
	document.getElementById("num").value = "";
	document.getElementById("address").value = "";
	document.getElementById("city").value = "";
	document.getElementById("state").value = "";
	document.getElementById("zip").value = "";

	if(firstName == "" || lastName == "" || num == "")
	{

		alert("Contact not created");
		cancel();

	}


	var jsonPayload =   '{"City" : "' + city + '", "Contactfirst" : "' + firstName + '", "Contactlast" : "' + lastName + '", "Phonenumber" : "' + num + '", "Email" : "' + email + '", "Address" : "' + address + '", "Zip" : "' + zip + '", "State" : "' + state + '","ContactsID" : "' + parent_id + '"}';
	var url = urlBase + '/AddContact.' + extension;
	escape(jsonPayload);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				alert("Contact Created");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("createResult").innerHTML = err.message;
	}

	cancel();
}

function userSettings()
{
	hideOrShow( "addPage", false);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow( "usersPage", true);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",false);
}

function doDeleteContact()
{

	hideOrShow( "addPage", false);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",true);


}


function updateContact()
{
	var currentfirst  = document.getElementById("cfirstName").value;
	var currentlast  = document.getElementById("clastName").value;
	var currentphone  = document.getElementById("cnum").value;

	var cfirst = document.getElementById("cnewfirstName").value;
	var clast = document.getElementById("cnewlastName").value;
	var cphone = document.getElementById("cnewnum").value;
	var cemail = document.getElementById("cemail").value;
	var caddress = document.getElementById("caddress").value;
	var ccity = document.getElementById("ccity").value;
	var cstate = document.getElementById("cstate").value;
	var czip = document.getElementById("czip").value;
	document.getElementById("updateconResult").innerHTML = "";


	document.getElementById("cfirstName").value = "";
	document.getElementById("clastName").value = "";
	document.getElementById("cnum").value = "";

	document.getElementById("cnewfirstName").value = "";
	document.getElementById("cnewlastName").value = "";
	document.getElementById("cnewnum").value = "";
	document.getElementById("cemail").value = "";
	document.getElementById("caddress").value = "";
	document.getElementById("ccity").value = "";
	document.getElementById("cstate").value = "";
	document.getElementById("czip").value = "";


	if(currentfirst == "" || currentlast == "" || currentphone == "")
	{
		alert("Contact not updated");
		cancel();
	}


	var jsonPayloadecs =   '{"Cfirst" : "' + currentfirst + '","Clast" : "' + currentlast + '","Cphone" : "' + currentphone + '","City" : "' + ccity + '", "Contactfirst" : "' + cfirst + '", "Contactlast" : "' + clast + '", "Phonenumber" : "' + cphone + '", "Email" : "' + cemail + '", "Address" : "' + caddress + '", "Zip" : "' + czip + '", "State" : "' + cstate + '","parent_id" : "' + parent_id + '"}';

	var url = urlBase + '/UpdateContact.' + extension;
	escape(jsonPayloadecs);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
					alert("Contact Updated if found!")
			}
		};
		xhr.send(jsonPayloadecs);
	}
	catch(err)
	{
		document.getElementById("updateconResult").innerHTML = err.message;
	}

	cancel();
}



function updateAccount()
{

	var upfirst = document.getElementById("firstNameUsers").value;
	var uplast = document.getElementById("lastNameUsers").value;
	var upuser = document.getElementById("usernameUsers").value;
	var uppas = document.getElementById("passwordUsers").value;
	document.getElementById("updateAccResult").innerHTML = "";

	document.getElementById("firstNameUsers").value = "";
	document.getElementById("lastNameUsers").value = "";
	document.getElementById("usernameUsers").value = "";
	document.getElementById("passwordUsers").value = "";

	if(upfirst == "" || uplast == "" || upuser == "" || uppas == "")
	{

		alert("Account not updated");
		cancel();

	}

	uppas = uppas + 'salt2';
	uppas = sha1(uppas);
	var jsonPayload2 = '{"Login" : "' + upuser + '", "Password" : "' + uppas + '", "Contactfirst" : "' + upfirst + '", "Contactlast" : "' + uplast + '", "parent_id" : "' + parent_id +'"}';

	escape(jsonPayload2);
	var url = urlBase + '/UpdateAccount.' + extension;

	alert("Account Updated!")

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				back()
				alert("Account Updated Please Sign Back In");
			}
		};
		xhr.send(jsonPayload2);
	}
	catch(err)
	{
		document.getElementById("updateAccResult").innerHTML = err.message;
	}

	cancel();
}

function cancel()
{
	hideOrShow( "addPage", false);
	hideOrShow( "loggedInDiv", true);
	hideOrShow( "accessUIDiv", true);
	hideOrShow( "loginDiv", false);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",false);

	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("num").value = "";
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("firstNameUsers").value = "";
	document.getElementById("lastNameUsers").value = "";
	document.getElementById("numUsers").value = "";
	document.getElementById("usernameUsers").value = "";
	document.getElementById("passwordUsers").value = "";
}

function back()
{
	hideOrShow( "addPage", false);
	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
	hideOrShow( "usersPage", false);
	hideOrShow( "createAccountPage", false);
	hideOrShow( "contactPage",false);
	hideOrShow( "deletePage",false);

	document.getElementById("firstNameUsers").value = "";
	document.getElementById("lastNameUsers").value = "";
	document.getElementById("numUsers").value = "";
	document.getElementById("usernameUsers").value = "";
	document.getElementById("passwordUsers").value = "";
}

function sha1(msg)
{
  function rotl(n,s) { return n<<s|n>>>32-s; };
  function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };
  var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff;
  var i, t, W=new Array(80), ml=msg.length, wa=new Array();
  msg += String.fromCharCode(0x80);
  while(msg.length%4) msg+=String.fromCharCode(0);
  for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
  while(wa.length%16!=14) wa.push(0);
  wa.push(ml>>>29),wa.push((ml<<3)&M);
  for( var bo=0;bo<wa.length;bo+=16 ) {
    for(i=0;i<16;i++) W[i]=wa[bo+i];
    for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
    var A=H0, B=H1, C=H2, D=H3, E=H4;
    for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
  }
  return tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);
}

function escape(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}
