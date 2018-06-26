'use strict';

let questionNum = 1;
let correctAnswers = 0;
let question = QUIZ[questionNum - 1];
let questionsAnswered = questionNum - 1;

function quizOutput(correctAnswers,question,questionAnswered) {
  return `<section id="quiz" aria-live="polite" role="main" class="col-6" title="The mobster movie quiz.">
    <h2 id="question" aria-live="polite">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="choice" type="radio" name="option" checked></input>
          <span>${question.choice1}</span>
        </label>
  
        <label>
          <input class="choice" type="radio" name="option"></input>
          <span>${question.choice2}</span>
        </label>
  
        <label>
          <input class="choice" type="radio" name="option"></input>
          <span>${question.choice3}</span>
        </label>
  
        <label>
          <input class="choice" type="radio" name="option"></input>
          <span>${question.choice4}</span>
        </label>
      </fieldset>  
      <button id="submitButton">Submit</button>

    </form>

    <div id="progressBar" title="Your progress so far in the quiz.">
      <span id="progress" aria-live="polite">Question: ${question.number}/10</span>
      <span id="totalCorrect" aria-live="polite">Score: ${correctAnswers}/${questionAnswered}</span>
    </div>
  </section>`;
}

$(function(){
  $("label").click(function(){
    console.log('WORKS');
  })
})

$('#grid').hide();

function handleStartButton(){
  $('#startGame').click(function(){
  $('#startPage').hide();
  $('#grid').show();
  $('#grid').html(quizOutput(correctAnswers,question,questionsAnswered));
  nextQuestion();
});

}


function nextQuestion(){
  let question = QUIZ[questionNum-1];
  let questionAnswered = questionNum-1;
  $('#grid').html(quizOutput(correctAnswers,question,questionAnswered));

}


function handleSubmitButton(){
  $('#grid').on('click','button',function(){
     let answer = $('input:checked').siblings().text();
    
      if(answer === SOLUTIONS[questionNum-1]){
        correctResponse();
      } else {
          incorrectResponse();
      }
      
      
  })
}

function correctResponse(){
  correctAnswers++;

    $('#grid').html(`
    <section class="correct" class="row">
    <div class="col-6">
      <h2 id="response">You Got It!</h2>
      <div>
      <img src="https://media2.giphy.com/media/I4Jmrcjnr8Zfq/200w.webp" alt="Ray Liotta laughing hysterically in the movie Goodfellas.">
      </div>
      <button id="nextButton">Next</button>
      </div>
    </section>`);
    handleNextButton();
}

  function incorrectResponse() {
     $('#grid').html(`
    <section id="incorrect" class="row">
      <div class="col-6">
      <h2 id="response">Wrong! ${SOLUTIONS[questionNum - 1]} is right!</h2>
      <div>
      <img class="incorrect" src="https://media2.giphy.com/media/ZmJfep8XpqDmM/200w.webp" alt="Michael Corlene tellin Fredo he broke his heart.">
      </div>
      <button id="nextButton">Next</button>
      </div>
    </section>
`)
     handleNextButton();

}


function handleNextButton(){
  $('#nextButton').click(function(){
    if(questionNum ===10){
        showResultsPage(correctAnswers);
    } else {
      questionNum++;
      nextQuestion();
    }
});

}


function showResultsPage(correctAnswers){
    $('#grid').html(`
      <div id="finalPageContainer" class="col-6">
    <section id="final-page">
      <h2 id="showResult">Final Score: ${correctAnswers} out of 10</h2>
      <p id="thanks">Thanks for Playing!</p>
      <div>
      <img src="https://media2.giphy.com/media/ZMqjORZltsQh2/200w.webp" alt="Leonardo Dicarpo in the Great Gatsby, giving a celebratory toast.">
      </div>
      <button id="resetButton">Restart</button>
    </section>
    </div>
  `);
    handleResetButton();
}

function handleResetButton(){
  $('#resetButton').click(function(){
    questionNum = 1;
    correctAnswers = 0;
    nextQuestion();
  })
}


function handleAllButtons(){
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleResetButton();
}

handleAllButtons();
