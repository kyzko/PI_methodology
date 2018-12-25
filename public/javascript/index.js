$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/comment",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (let i = data.length - 1; i > 0; --i) {
                $('#result').append(`<textarea  readonly class="z" rows="1" cols="20" >Автор: ${data[i].author} </textarea><br/>`);
                $('#result').append(`<textarea readonly class="z" rows="5" cols="50" >Комментарий: ${data[i].text} </textarea><br/>`);
                $('#result').append(`<textarea readonly class="z" rows="1" cols="50"> Time: ${moment(data[i].data).fromNow()} </textarea></br>`);
            }
        }
    });
    $("#comment").submit(function (e) {
        e.preventDefault();
        let author = $('#author').val(),
            text = $('#text').val(),
            data = moment();
        $("#form").trigger('reset');
        moment.lang('ru');
        $.ajax({
            type: "POST",
            url: "/api/comment",
            data: JSON.stringify({
                author: author,
                text: text,
                data: data
            }),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $.ajax({
                    type: "GET",
                    url: "/api/comment",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        $('#result').empty();
                        for (let i = data.length - 1; i > 0; --i) {
                            let end = moment();
                            $('#result').append(`<textarea readonly rows="1" cols="20"> ${data[i].author} </textarea><br/>`);
                            $('#result').append(`<textarea readonly rows="5" cols="50"> ${data[i].text} </textarea><br/>`);
                            $('#result').append(`<textarea readonly rows="1" cols="50"> ${moment(data[i].data).fromNow()} </textarea></br>`);
                        }
                    }
                })
            }
        });
    });

    $("#search").submit(function (e) {
        e.preventDefault();
        let textSearch = $('#textSearch').val();
        let sortByData = $('form select[id=sortByData] option:selected').val();
        alert(sortByData);
        $.ajax({
            type: "GET",
            url: "/api/comment",
            data: {
                textSearch: textSearch
            },
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $('#result').empty();
                for (let i = data.length - 1; i > 0; --i) {
                    $('#result').append(`<textarea readonly rows="1" cols="20"> ${data[i].author} </textarea><br/>`);
                    $('#result').append(`<textarea readonly rows="5" cols="50"> ${data[i].text} </textarea><br/>`);
                    $('#result').append(`<textarea readonly rows="1" cols="50"> ${moment(data[i].data).fromNow()} </textarea></br>`);
                }
            }
        });
    });
})
