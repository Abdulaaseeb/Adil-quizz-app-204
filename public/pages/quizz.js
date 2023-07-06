// Import the functions you need from the SDKs you needc
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, set, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGRhriYyyfpT_WEOv7Kxm2iZ6s3CoCFhY",
  authDomain: "adil-quiz-application.firebaseapp.com",
  projectId: "adil-quiz-application",
  storageBucket: "adil-quiz-application.appspot.com",
  messagingSenderId: "375251054560",
  appId: "1:375251054560:web:1f6d0d00b7898e776d0585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)
const db = getDatabase()

var question = document.getElementById('question')
var option = document.getElementById('option')
var optionsParent = document.getElementById('optionsParent')
var correctAnswerElem = document.getElementById('correctAnswer')

var options = []
var correctAnswer


function renderOptions() {
  optionsParent.innerHTML = ''
  for (var i = 0; i < options.length; i++) {
    optionsParent.innerHTML += `<li onclick = "setCorrectAnswer('${options[i]}')"  style="background-color: darkblue;" class = "my-2 btn text-white  mx-2 fs-3  border rounded w-50">${options[i]}</li>`
  }
}

window.addOption = function () {
  options.push(option.value)
  console.log(options)
  renderOptions()
}

window.setCorrectAnswer = function (a){
   correctAnswer = a
   correctAnswerElem.innerHTML = correctAnswer
}

window.submitquestion = function(){
  var obj = {
    question : question.value,
    options  : options,
    correctAnswer : correctAnswer
  }

  obj.id = push(ref(db, 'questions')).key

  const reference = ref(db, `questions/${obj.id}`)
  set(reference, obj)

  console.log(obj)
}