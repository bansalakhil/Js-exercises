var jsonusers = [ {"user":"Luigi Damiano"},
 {"user":"Zenith Coboro"}, 
 {"user":"Zig Ziglar"}, 
 {"user":"Steve Costner"}, 
 {"user":"Bill Grazer"}, 
 {"user":"Timothy Frazer"}, 
 {"user":"Boris Becker"}, 
 {"user":"Glenn Gladwich"}, 
 {"user":"Jim Jackson"}, 
 {"user":"Aaron Kabin"}, 
 {"user":"Roy Goldwin"}, 
 {"user":"Jason Goldberg"}, 
 {"user":"Tim Ferris"}, 
 {"user":"Buck Singham"}, 
 {"user":"Malcom Gladwell"}, 
 {"user":"Joy Rabura"}, 
 {"user":"Vid Luther"}, 
 {"user":"Tom Glicken"}, 
 {"user":"Ray Baxter"}, 
 {"user":"Ari Kama"}, 
 {"user":"Kenichi Suzuki"}, 
 {"user":"Rick Olson"} ];
var jsonstr = JSON.stringify(jsonusers);
var jsonText = JSON.parse(jsonstr);
function TextBox(id) {
  that = this;
  this.textId = document.getElementById(id);
  this.suggestionList = document.getElementById("listdiv");
  this.textId.addEventListener("keyup", this.autoComplete);
  this.count = 0;
}
TextBox.prototype.autoComplete = function(event) {
  var enteredName;
  enteredName = that.textId.value.toLowerCase();
  if (!that.textId.value == "" && event.keyCode != 40 && event.keyCode != 38) {
    that.displaySuggestionList(enteredName);
  }  
  var suggestionNode = document.getElementsByClassName("suggestionNode");
  if (event.keyCode == 40 && that.count < suggestionNode.length) {
    that.manageSuggestionList(that.count, suggestionNode);
    that.count++;
  }
  if (event.keyCode == 38 && that.count > 1) {
    --that.count;
    if (that.count < suggestionNode.length && !(that.count < 1)) {
      that.manageSuggestionList(that.count - 1, suggestionNode);
    }
  }
  if (event.keyCode == 8 && (that.textId.value)) {
    that.count = 0;
  }
  if (that.textId.value == "" || event.keyCode == 13) {
    while (that.suggestionList.firstChild) {
      that.suggestionList.removeChild(that.suggestionList.firstChild);
    }
  }
}
TextBox.prototype.manageSuggestionList = function(count, suggestionNode) {
  suggestionNode[count].style.backgroundColor = "#707070";
  that.textId.value = suggestionNode[count].textContent;
  for (var i = 0, len = suggestionNode.length; i < len; i++) {
    if (i != count) 
      suggestionNode[i].style.backgroundColor = "white";
  }
}
TextBox.prototype.displaySuggestionList = function(enteredName) {
  while (that.suggestionList.firstChild) {
      that.suggestionList.removeChild(that.suggestionList.firstChild);
  }
  var newArray = [];
  that.searchList(newArray, enteredName);
  for (var i = 0, len = newArray.length; i < len; i++) {
    var textNode = document.createTextNode(newArray[i]);
    if (!that.textId.value == "") {
      var suggestion = document.createElement("div");
      suggestion.className = "suggestionNode";
      suggestion.appendChild(textNode);
      that.suggestionList.appendChild(suggestion);
    }
  }  
}
TextBox.prototype.searchList = function(newArray, enteredName) {
  for (var i = 0, len = jsonusers.length; i < len; i++) {
    if (jsonText[i].user.toLowerCase().indexOf(enteredName) == 0) {
      newArray.push(jsonText[i].user);
    }
  }
}
var autoObj = new TextBox("textbox");