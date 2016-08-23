(function($) {
  $(function() {

    var Questions = function() {

      return [
        {
          question: 'Who is the fastest of these video game characters?',
          choices: ['Mario', 'Sonic', 'Donkey Kong', 'The Paperboy'],
          answer: 'Sonic',
          answerPic: 'sonic.jpg'
        },
        {
          question: 'In the game HALO, what is the name of Master Chief\'s AI sidekick?',
          choices: ['Cortana', 'Arbiter', '343 Guilty Spark', 'HAL'],
          answer: 'Cortana',
          answerPic: 'cortana.jpg',
        },
        {
          question: 'Which bad guy was introduced in Super Mario Brothers 2?',
          choices: ['Koopa troopa', 'Lakitu', 'Shy Guy', 'Goomba'],
          answer: 'Shy Guy',
          answerPic: 'shyguy.jpg',
        },
        {
          question: 'What video game console has the highest number of video game console sales of all time?',
          choices: ['Xbox 360', 'Nintendo 64', 'Wii', 'Playstation 2'],
          answer: 'Playstation 2',
          answerPic: 'playstation2.jpg',
        },
        {
          question: 'Which is one of the main characters in Earthbound?',
          choices: ['Pico', 'Lucas', 'Poo', 'Travis'],
          answer: 'Poo',
          answerPic: 'poo.jpg',
        },
        {
          question: 'Which Final Fantasy had the villain Kefka? (JP)',
          choices: ['Final Fantasy III', 'Final Fantasy IV', 'Final Fantasy VI', 'Final Fantasy VII'],
          answer: 'Final Fantasy VI',
          answerPic: 'ff6.jpg',
        },
        // {
        //   question: '',
        //   choices: [],
        //   answer: '',
        //   answerPic: '',
        // },
        // {
        //   question: '',
        //   choices: [],
        //   answer: '',
        //   answerPic: '',
        // },
        // {
        //   question: '',
        //   choices: [],
        //   answer: '',
        //   answerPic: '',
        // },
        // {
        //   question: '',
        //   choices: [],
        //   answer: '',
        //   answerPic: '',
        // },
      ];
    };

    var trivia = {
      init: function() {

        this.questions = new Questions();
        this.query = '';
        this.imgPath = 'assets/images/';
        this.questionTimer = '30';  // in seconds
        this.transitionTimer = '1'; // in seconds
        this.score = {
          right: 0,
          wrong: 0,
          unanswered: 0
        };

        this.reset();
        this.loadNewQuestion();

      },
      reset: function() {

        $('#trivia-answers').hide();
        $('#trivia-end').hide();
        $('#trivia-choices').off();

      },
      unloadEvents: function() {

        $('#trivia-choices').off();

      },
      loadNewQuestion: function() {

        if(this.questions.length > 0) {

          this.query = this.getQuestion();

          this.loadQuestion();
          this.loadAnswers();
          this.loadEvents();

          $('#trivia-answers').hide();
          $('#trivia-questions').fadeIn();

        } else {

          this.endGame();

        }

      },
      endGame: function() {

        $('#trivia-questions').hide();
        $('#trivia-answers').hide();
        $('#trivia-end').fadeIn();
        $('#trivia-end-right').html(this.score.right);
        $('#trivia-end-wrong').html(this.score.wrong);
        $('#trivia-end-unanswered').html(this.score.unanswered);

      },
      getQuestion: function() {

        var rand = Math.floor(Math.random()*this.questions.length);

        var q = this.questions[rand];

        this.questions.splice(rand, 1);

        return q;

      },
      loadQuestion: function() {

        $('#trivia-question').html(this.query.question);

      },
      loadAnswers: function() {

        $('#trivia-choices').empty();

        for(var i=0; i < this.query.choices.length; i++) {
          $('#trivia-choices').append('<li id="'+i+'">'+this.query.choices[i]+'</li>');
        }

      },
      loadCorrectAnswer: function(userAnswer) {

        this.unloadEvents();

        var answerCheck;

        setTimeout(function() { trivia.loadNewQuestion(); }, this.transitionTimer*1000);

        if(userAnswer === this.query.answer) {

          answerCheck = 'correctly';
          this.score.right++;

        } else if(userAnswer === undefined) {

          answerCheck = 'with no response';
          this.score.unanswered++;

        } else {

          answerCheck = 'incorrectly';
          this.score.wrong++;

        }

        $('#trivia-answer-guess').html(answerCheck+'.');

        $('#trivia-answer').html(this.query.answer);

        $('#trivia-answer-image').html('<img src="'+this.imgPath+this.query.answerPic+'" />');

        $('#trivia-questions').hide();
        $('#trivia-answers').fadeIn();

      },
      loadEvents: function() {

        var self = this;

        $('#trivia-choices').on('click', 'li', function(event) {

          var userAnswer = event.target.textContent;

          self.loadCorrectAnswer(userAnswer);

        });
      }
    };

    // Event Listeners
    $('.trivia-newgame').on('click', function() {
      trivia.init();
    });

    trivia.init();

  });
})(jQuery);
