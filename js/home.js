$(function () {

    $(window).bind("beforeunload", function () {
        return confirm("Reload là mất đấy nhé Nguyên gà");
    });

    $('.default > label').text($('input[name="row-start"]').val());

    $('.row-number:visible').each(function (i, l) {
        $(this).text(i + 1);
    })

    $('.add').click(function () {
        var currentRowCount = parseInt($('input[name="row-start"]').val());
        var newRowNumber = currentRowCount + 1;
        $('input[name="row-start"]').val(newRowNumber);

        var newQuestion = $('.question-row > div:first').clone();
        newQuestion.removeClass('hide');
        newQuestion.find('label.row-number').text(newRowNumber);
        newQuestion.find('textarea').addClass('horizontal-question');

        $('.question-row').append(newQuestion);
    });


    $(document).on('click', '.question-up', function () {

    });
    $(document).on('click', '.question-down', function () {

    });

    $(document).on('click', '.question-remove', function () {
        $(this).closest('div.col-xs-12').remove();
        var currentRowCount = parseInt($('input[name="row-start"]').val()) - 1;
        $('input[name="row-start"]').val(currentRowCount);

        $('.row-number:visible').each(function (i, l) {
            $(this).text(i + 1);
        })

    });


    $('.play').click(function () {

        var verticalAnswer = $('input[name="vertical-answer"]').val()
        var currentRowCount = parseInt($('input[name="row-start"]').val());


        if (currentRowCount != verticalAnswer.length) {
            alert("Số câu hàng ngang với số từ hàng dọc không bằng nhau rồi, check lại đi iem :D");
        } else {

            keyWordPosition = 10;
            $('.game-cell').html('');

            $('.horizontal-answer:visible').each(function (i, l) {
                var rowCellNumber = i + 1;
                var currentHorizontal = $(this).val().trim();

                // Add row
                $('.game-cell').append('<div no="' + i + '" class="row-cell current"></div>')


                // Search key
                var key = verticalAnswer[i];
                var keyPosition;
                var keyFound = false;


                for (var i = 0; i < currentHorizontal.length; i++) {

                    if (key.toUpperCase() == currentHorizontal[i].toUpperCase() && !keyFound) {
                        keyPosition = i;
                        keyFound = true;
                        $('.current').append('<div class="cell key-cell"><label>' + currentHorizontal[i] + '</label></div>')

                    } else {
                        $('.current').append('<div class="cell un-answer-cell"><label>' + currentHorizontal[i] + '</label></div>')
                    }
                }

                var numberOfPrependCell = keyWordPosition - keyPosition;

                for (var i = 0; i < numberOfPrependCell; i++) {
                    $('.current').prepend('<div class="empty-cell"></div>');
                }

                $('.current').prepend('<div class="row-cell-number">' + rowCellNumber + '</div>');

                $('.current').removeClass('current');
                $('.config-body').hide("blind", { times: 10, distance: 100 }, 500);

                $('#menu-area').show();

                $('#config').addClass('not-show');
            })
        }


    });

    $('#config').click(function () {

        if ($(this).hasClass('not-show')) {
            $(".config-body").show("blind", { times: 10, distance: 100 }, 500);
            $(this).removeClass('not-show');
        } else {
            $(".config-body").hide("blind", { times: 10, distance: 100 }, 500);
            $(this).addClass('not-show');
        }

    });

    $(document).on('mouseover', '.row-cell-number', function () {

        // Remove old popup
        $('.row-cell-number-popup:visible').remove();
        $('.row-cell-number').removeClass('background-color-lightblue');
        var popup = $('.row-cell-number-popup').clone();
        popup.css('display', 'block');
        $(this).closest('div.row-cell').find('.row-cell-number').addClass('background-color-lightblue');
        $(this).parent().append(popup);
    });

    $(document).on('click', '.show-question', function () {

        $('.question > h1').fadeOut();
        $('.question-content span').fadeOut();
        var value = $(this).closest('div.row-cell').attr('no');

        $('#play-area .question .teacher-image').css('background', 'url(img/notgood.png) center');
        $('#play-area .question .teacher-image').css('background-size', 'cover');

        var questionNo = parseInt(value);
        var displayQuestionNo = questionNo + 1;

        //console.log(questionNo)
        //console.log($('.horizontal-question:eq( ' + questionNo + ' )').text());

        var question = $('.horizontal-question:eq( ' + questionNo + ' )').val();
        setTimeout(function () { $('.question-content span').text(displayQuestionNo + '. ' + question).fadeIn(); }, 500);

        $(this).closest('div.row-cell').find('.row-cell-number').addClass('background-color-lightblue');


    });

    $(document).on('click', '.show-answer', function () {
        $(this).closest('div.row-cell').find('.cell').removeClass('un-answer-cell');

        $(this).closest('div.row-cell').find('.cell label').fadeIn();

        $(this).closest('div.row-cell').find('.row-cell-number').css('background-color', 'coral');

        $('#play-area .question .teacher-image').css('background', 'url(img/ok.png) center')
        $('#play-area .question .teacher-image').css('background-size', 'cover');

    });

    //$(document).on('mouseover', '.row-cell-number-popup', function () {


    //});

    //$(document).on('mouseout', '.row-cell-number-popup', function () {

    //    $(this).closest('div.row-cell').find('.row-cell-number').removeClass('background-color-lightblue');
    //});

    $(document).on('click', '.show-vertical-answer', function () {

        if ($(this).hasClass('not-show-all')) {
            $('.key-cell label').fadeIn();
            $(this).removeClass('not-show-all');
        } else {
            $('.key-cell label').fadeOut();
            $(this).addClass('not-show-all');
        }


    });
    $(document).on('click', '.show-all', function () {

        if ($(this).hasClass('not-show-all')) {
            $('.key-cell label').fadeIn();

            $('.cell label').fadeIn();
            $('.cell').removeClass('un-answer-cell');
            $('.key-cell label').fadeIn();

            $(this).removeClass('not-show-all');
        } else {
            $('.key-cell label').fadeOut();

            $('.cell label').fadeOut();
            $('.cell').addClass('un-answer-cell');

            $('.key-cell').removeClass('un-answer-cell');
            $('.key-cell label').fadeOut();

            $(this).addClass('not-show-all');
        }

    });



    // Close popup when click out
    $(document).click(function (event) {
        if (!$(event.target).hasClass('row-cell-number-popup')) {
            $('.row-cell-number-popup:visible').remove();

            $('.row-cell-number').removeClass('background-color-lightblue');
        }
    });
})