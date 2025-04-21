document.addEventListener("DOMContentLoaded", ()=>{
    let questionform = document.getElementById("question-form")
    let questions = fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
    questions
    .then(result => result.json())
    .then(e => displayquestions(e))
    .catch(error => {console.log(error)})
    
    let div = document.createElement("div");
    let list = document.createElement("ol");
    let totalscore = document.querySelector("#total");
    let finalscoretext=document.getElementById("finalscoretext");
    let button = document.getElementById("button");
    let restart = document.getElementById("restart");

    button.addEventListener("click", function(){
        questionform.classList.remove("hidden");
    })
    
    restart.addEventListener("click", function(){
        location.reload();
    })

    let submit = document.createElement("input");
    submit.type="submit"
    submit.classList.add("submit")

    function displayquestions(x){
        let calc = 0;    
        for(let i of x.results) {
            let feedback=document.createElement("span")
            feedback.classList.add("feedback");
            let score = document.createElement("span");
            score.classList.add("score");
            score.textContent="0"; 

            let query = document.createElement("li");  
            query.innerHTML=i.question
            let choices=document.createElement("span");
            let myarray = [i.incorrect_answers[0], i.incorrect_answers[1], i.incorrect_answers[2], i.correct_answer]


                for(let j = 0; j<4; j++){
                let random = Math.floor(Math.random()*myarray.length);
                let value = myarray.splice(random, 1)[0];
                var options = document.createElement("span");
                options.classList.add("options")
                options.innerHTML=value;
                                
                options.addEventListener('click', function handleanswers(){
                    // score.classList.add("hidden")
                    if(value===i.correct_answer){
                        score.textContent="1"
                        feedback.textContent=`Correct answer!`;
                        feedback.style.color="green"
                        // feedback.classList.add("hidden")
                        choices.append(feedback)
                        console.log("correct!")
                        calc+=1;
                        // choices.append(document.createElement("br"))
                        // choices.append(score)
                    }
                    
                    else{
                        feedback.textContent = `Incorrect answer. Correct answer is ${i.correct_answer}`
                        feedback.style.color="red"
                        // feedback.classList.add("hidden")
                        choices.append(feedback)
                        console.log("Incorrect!")
                        // choices.append(document.createElement("br"))
                        score.textContent="0"
                        // choices.append(score);
                        calc-=1
                        // score.classList.add("hidden")
                    }

                })

                
                choices.append(options);
                choices.append(document.createElement("br"))
                choices.append(document.createElement("br"))
            }
            
            totalscore.textContent=calc          
            list.append(query);
            list.append(choices);
            list.append(document.createElement("br"), score);
            div.append(list);
        }
    }
    submit.addEventListener('click', function submitted() {
        let total = 0;
        let scores = document.querySelectorAll(".score");
        scores.forEach((score) => {
            total += parseInt(score.textContent);
        });
        console.log("Final score : " + total)
        totalscore.textContent = total;
    })
    questionform.append(div)
    questionform.append(submit);
    questionform.append(document.createElement("br"));
    questionform.append(finalscoretext);
    questionform.append(totalscore);
    questionform.append(document.createElement("br")); 
    questionform.append(restart);
}) 