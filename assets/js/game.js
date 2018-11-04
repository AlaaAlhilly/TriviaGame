
$(document).ready(function(){
    //hide the result div
    $(".result").hide();
    //hide the image div
    $('.displayimage').hide();
    //hide play again button
    $('.playagain').hide();
    //show the start time
    $('#timeremains').text("00:00");
    //variable to fill the questions from the array
    var questions_counter =0;
    //timeout variable
    var timeout;
    //variable to hold image name
    var imgname="";
    //counters for the correct and wrong answers
    var correct_answers = 0,wrong_answers = 0, intervalId, unAnswered=0, clockRunning = false;
    var Questions = (function(question,correct_answer,answers,time_required){
        this.question = question,
        this.correct_answer = correct_answer,
        this.answers = answers,
        this.time_required = time_required;
        this.time = time_required/1000;
        //create object for the timing    
        });
        $.extend(Questions.prototype,{

            show_question:function(){
                
            },

            defend_power:function(){
                
            }
        });
        var Timing = {
            time:0,
            fill:function(time){
                Timing.time = time;
            },
            reset: function() {

                Timing.time = 0;
                $('#timeremains').text("00:00");
            },
            
            start: function() {        
                if (!clockRunning) {
                    intervalId = setInterval(Timing.count,1000);
                    clockRunning = true;
                }
            
            },
            stop: function() {
                    clearInterval(intervalId);
                    clockRunning = false;
            },
            count: function() {
                Timing.time--;
                var converted_time = Timing.timeConverter(Timing.time);
                $('#timeremains').text(converted_time);
            },
            
            
            timeConverter: function(t) {
            
                var minutes = Math.floor(t / 60);
                var seconds = t - (minutes * 60);
            
                if (seconds < 10) {
                seconds = "0" + seconds;
                }
            
                if (minutes === 0) {
                minutes = "00";
                }
            
                else if (minutes < 10) {
                minutes = "0" + minutes;
                }
            
                return minutes + ":" + seconds;
            }
        }
    //array of questions and answers
    var questionsArr =[
        new Questions("Who is bigger: Mr. Bigger, Mrs. Bigger, or their baby?","The Baby",["Mr.Bigger","Mrs.Bigger","The Baby","None of them"],8000),
        new Questions("Mike is a butcher. He is 5’10” tall. What does he weigh?","Meat",["70lb","120lb","200lb","Meat"],60000),
        new Questions("In a year, there are 12 months. Seven months have 31 days. How many months have 28 days?","All of them",["Five months","Six months","Two months","All of them"],90000),
        new Questions("What are the next three letters in the following sequence?J, F, M, A, M, J, J, A, __, __, __?","S,O,N",["D,B,K","C,X,Y","G,N,M","S,O,N"],150000)
    ];
    //show the question and the answers
    function fill() {
        Timing.fill(questionsArr[questions_counter].time);
        Timing.start();
        $('.options').css('background','#ffffff');
        $('#question').text(questionsArr[questions_counter].question);
        for(var i=0;i<questionsArr.length;i++){
            $('#'+i).text(questionsArr[questions_counter].answers[i]);
        }
     timeout =setTimeout(noAnswerReset,questionsArr[questions_counter].time_required);
    }
    function noAnswerReset(){
        Timing.stop();
        unAnswered++;
        imgname = "noanswer.gif";
        clearTimeout(timeout);
        timeout = setTimeout(showImg,500);
    }
    function reset(){
        $('.displayimage').hide();
        $('.answerdiv').show(500);
        $('#correctanswers').text(correct_answers);
        $('#wronganswers').text(wrong_answers);
        $('#unanswered').text(unAnswered);
        if(questions_counter < questionsArr.length-1){
            questions_counter++;
            fill();
        }else{
            $('.answerdiv').hide();
            $('.questiondiv').hide();
            $('.result').show(500);
            $('.playagain').show(500);
            $('#timeremains').text("00:00");
        }
    }
    fill();
    $('.options').on('click',function(){
        //get the text from the div has been clicked
        var ans = $(this).find('h3').text();
        if(ans == questionsArr[questions_counter].correct_answer){
            correct_answers++;
            Timing.stop();
            $(this).css('background','green');
            imgname = "correct.gif";
            clearTimeout(timeout);
            timeout = setTimeout(showImg,500);
        }else{
            $(this).css('background','red');
            wrongAnswer();
        }
    });
    //wrong answer function
    function wrongAnswer(){
        Timing.stop();
        wrong_answers++;
        imgname = "wrong.gif";
        clearTimeout(timeout);
        timeout = setTimeout(showImg,500);
    }
    //show image function
    function showImg(){
        $('.answerdiv').hide();
        $('.displayimage').show(500);
        $('#rightanswer').text("Correct Answer: "+questionsArr[questions_counter].correct_answer);
        $('#imgcontainer').attr('src','./assets/images/'+imgname);
        clearTimeout(timeout);
        timeout = setTimeout(reset,4000);
    }
    //play again function 
    $('.button').click(function(){
        questions_counter = 0;
        correct_answers = 0;
        wrong_answers = 0;
        $('.result').hide();
        $('.playagain').hide();
        $('.questiondiv').show(500);
        $('.answerdiv').show(500);
        fill();
    });

});
