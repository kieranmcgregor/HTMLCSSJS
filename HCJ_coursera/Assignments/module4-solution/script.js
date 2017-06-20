(function () {

var names = ["Yaakov",
             "John",
             "Jen",
             "Jason",
             "Paul",
             "Frank",
             "Larry",
             "Paula",
             "Laura",
             "Jim"];

for (var i = 0; i < names.length; i++) {
  var person = names[i];
  var firstLetterIndex = 0;

  var firstLetter = person.charAt(firstLetterIndex).toLowerCase();

  if (firstLetter === "j") {
    byeSpeaker.speak(person);
  } else {
    helloSpeaker.speak(person);
  }
}
})();
