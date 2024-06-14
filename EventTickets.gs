var Username = "PasteYourUsernameHereBetweenAposthrophes";
var EncryptedPassword = "PasteYourEncryptedPasswordHereBetweenAposthrophes";

function LoginToManagerZone(phpSessionId)
{
  var url = "https://www.managerzone.com/?p=login";
  var options = 
    { "method": "post",
      "headers" : {
        "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Referer" : "https://www.managerzone.com/",
        "Content-Type" : "application/x-www-form-urlencoded",
        "Cookie" : "PHPSESSID=" + phpSessionId + "; MZLANG=pl; MZLOGIN=2"
      },
      "payload" : {
          "logindata[md5]" : EncryptedPassword,
          "logindata[username]": Username,
          "logindata[markasdefault]" : false,
          "logindata[sport]" : "soccer",
          "logindata[remember_me]" : true
          }
    };
  var response = UrlFetchApp.fetch(url, options);
  return response.getResponseCode();
}

function GeneratePHPSESSID()
{
  var charId = "";
  for (var i = 1; i < 25; i++) 
  { 
    charId += String.fromCharCode(97 + Math.random()*10);
  } 
  return charId;  
}

function GetEventTickets()
{
  var phpSessionId = GeneratePHPSESSID();

  if(LoginToManagerZone(phpSessionId) != 200)
  {
    throw "Failed to login";
  }

  var eventUrl = https://www.managerzone.com/ajax.php?p=event&sub=claim&sport=soccer";
  var options = 
  { 
    "method": "get",
    "headers" : {
      "Cookie" : "PHPSESSID=" + phpSessionId + "; MZLANG=pl; MZLOGIN=2"
    },
  };
  var response = UrlFetchApp.fetch(eventUrl, options);
  var responseCode = response.getResponseCode();

  if(responseCode != 200)
  {
    throw "Failed to get event tickets";
  }
  return "Success";
}
