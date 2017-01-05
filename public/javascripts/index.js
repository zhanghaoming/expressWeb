/**
 * Created by Skye on 2016/12/29.
 */
$(document).ready(function () {

    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
        $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });

});

$(function () {
    getActivityInfo();
});

function getActivityInfo() {
    $.ajax({
        url: '/',
        type: 'GET',
        success: function (json) {
            var activityInfo = eval("(" + json + ")");
            for (var i = 0; i < activityInfo.length; i++) {
                var current = activityInfo[i];
                $('div#activity div.media-body span.media-meta').html(current.date);
                $('div#activity div.media-body h4.title').html(current.title);
                $('h4.title span').html(current.type);
                $('div.media-body p.summary').html(current.description);

            }
        }
    })
}

function turnActivity() {
    $.ajax({
        url: '/activitiy',
        /*?title=' + title + '&date' + date + '&type' + type + '&img' + img + '&description' + description,*/
        type:'get',
        data:{},
        success:function (data,status) {
            windows.location('/activitiy');
        },
        error:function () {
            windows.location('/activitiy');
        }
        parsererror:function () {
            windows.location('/activitiy');
        }
    })
    alert('ok');
}
