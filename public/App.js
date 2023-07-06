  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getDatabase, ref, onChildAdded} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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


  function renderQuestion() {
    var obj = questions[indexVal]
    questionNo.innerHTML = obj.question
    currentNo.innerHTML = indexVal + 1
    totalNo.innerHTML = questions.length
    answerNo.innerHTML = ""
    for (var i = 0; i < obj.options.length; i++) {
        answerNo.innerHTML +=
            `
    <button  class="mt-2  w-100 btn btn-dark" onclick = "correct('${obj.correctAnswer}','${obj.options[i]}')" >${obj.options[i]}</button><br>
`
    }
}

var loader = document.getElementById('loader')
var showQuestion = document.getElementById('showQuestion')


function getDataFromDatabase(){
     loader.style.display = 'block'
     showQuestion.style.display = 'none'

    const reference = ref(db, 'questions/')
    onChildAdded(reference, function(data){
   console.log(data.val())
   questions.push(data.val())
   loader.style.display = 'none'
   showQuestion.style.display = 'block'
   renderQuestion()
    })
}
getDataFromDatabase()



var questions = []

var currentNo = document.getElementById("currentQue")
var totalNo = document.getElementById("totalQue")
var answerNo = document.getElementById("answer")
var questionNo = document.getElementById("question")
var indexVal = 0
var marks = 0
var showMark = "Your Quiz has Complete and Your Marks is"

// renderQuestion()
window.next = function() {
    if (indexVal + 1 == questions.length) {
        alert(showMark + " " + marks)
        marks = 0
        indexVal = 0
        renderQuestion()
    }
    else{
        indexVal++
        renderQuestion()
    } 
    
}

window.correct = function(a, b) {
    if (a == b) {
        marks = marks + 1
    }
    
    next()
    console.log(marks)
} 
