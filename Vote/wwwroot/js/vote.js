$(function () {
   //делаем обработчик для ввода только цифр в поле № паспорта
    valid_num('#pas_num');
    valid_num_exit('#pas_num');

    //Очищаем информационное сообщение 
    $('input').click(function () { $("#massage").hide(); });

    $("#filtering").keyup(function (e) {

        var value = $(this).val().toLowerCase();
        $("#info_select option").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    //при вводе города 3 символа открываем выпадающий список

        if($("#filtering").val().length > 1) {

            $("#info_select").show();

        } else {

            $("#info_select").hide();
        }

        var len = $("#info_select option:visible").length;
        $("#info_select").attr('size', 10);
        if (len<10) {
            $("#info_select").attr('size', len);  
            if (len < 2) {
                $("#info_select").attr('size', 2);  
            }
        }

        if ($("#filtering").val() == $("#info_select option:selected").text()) {

            $("#info_select").hide();
        }
    });
    //клик на выбраном городе из выпадающего списка
    $("#info_select").click(function (e) {
        
        //alert($("#info_select option:visible").length);
        if ($("#info_select option:visible").length == 1) {
            $("#filtering").val($("#info_select option:visible:first").text());
            $("#filtering").data("id", $("#info_select option:visible:first").val());
            $("#info_select").hide();
        } else {
            if ($("#info_select option:visible").length == 0) {
                $("#filtering").val('');
                // $("#filtering").data("id", '0');
                $("#info_select").hide();
            } else {
                //переносим название улицы в поле edit
                $("#filtering").val($("#info_select option:selected").text());
                //в это же поле в пользовательский элемент добавляем ID улицы
                $("#filtering").data("id", $("#info_select option:selected").val());
                //скрываем выпадающий список
                $("#info_select").hide();
            }
        }

      
    });

    //Вводим только заглавные и 2 символа 
    $("#pas_ser").keyup(function (e) {

        $("#pas_ser").val($("#pas_ser").val().trim().toUpperCase());

        if ($("#pas_ser").val().length > 2) {
            $("#pas_ser").val($("#pas_ser").val().trim().substring(0, 2));
        }
    });

    //Вводим только заглавные и 6 символа 
    $("#pas_num").keyup(function (e) {

        $("#pas_num").val($("#pas_num").val().trim());

        if ($("#pas_num").val().length > 6) {
            $("#pas_num").val($("#pas_num").val().trim().substring(0, 6));
        }
    });
//Закрытие модального окна
    $(".modal_close_button").click(function (e) {
        $(this).parent().parent().hide();
    });

  // Кнопка отправить
    $("#BtnAdd").click(function (e) {

        //проверка на заполненость полей
        if ($('#fam').val() == '') {
            massage('#fam', 'Заполните фамилию');
            return;
        }
        if ($('#im').val() == '') {
            massage('#im', 'Заполните имя');
            return;
        }
        if ($('#ot').val() == '') {
            massage('#ot', 'Заполните отчество');
            return;
        }
        if ($('#pas_ser').val() == '') {
            massage('#pas_ser', 'Заполните серию паспорта');
            return;
        }
        if ($('#pas_num').val() == '') {
            massage('#pas_num', 'Заполните номер паспорта');
            return;
        }
        if ($('#filtering').val() == '') {
            massage('#filtering', 'Выберите улицу');
            return;
        }
        if ($('#home').val() == '') {
            massage('#home', 'Заполните номер дома');
            return;
        }
        if ($("textarea").val() == ' ') {
            massage("#bigtext", 'Заполните своё предложение');
            return;
        }

        var review = {
            Fam: $("#fam").val(),
            Im: $("#im").val(),
            Ot: $("#ot").val(),
            Street_id: $("#filtering").data("id"),
            Home_num: $("#home").val(),
            Flat_num: ($("#flat").val() != '' ? $("#flat").val() : ''),
            Passport: $("#pas_ser").val().trim().toUpperCase() + $("#pas_num").val().trim(),
            Content: $("#bigtext").val()              
        };

        $.ajax({
            url: '/Home/Add',
            type: 'POST',
            data: JSON.stringify(review),
            contentType: "application/json;charset=utf-8",
            statusCode: {
                200: function () {
                    var str =
                        '<h3>Спасибо за Ваше не равнодушие и за Ваше предложение.</h3>'+
                        '<div class="button">'+
                            '<button id="BtnExit">Вернуться</button>'+
                        '</div>';
                    $('#content').html(str);
                    $(function () {
                        $("#BtnExit").click(function () {
                            document.location.href = "/home/Index";
                        });
                    });
                },
                400: function () {
                    $('#shadow_employee_search').show();
                    var str = "<br><br><h3>Данные не добавлены, человек с такими паспортными данными уже вносил предложение.<h3><br>";
                    $('#employee_search_table').html(str);                 
                },
                404: function () {
                    $('#shadow_employee_search').show();
                    var str = "<br><br><h3>Данные не добавлены, ошибка работы с базой данных.<h3><br>";
                    $('#employee_search_table').html(str);
                }
            }
        });
    });  
});


//валидация данных вводим только цифры
function valid_num(str) {
    $(str).keypress(function (e) {
        e = e || event;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        var chr = getChar(e);
        // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
        // на всякий случай лучше вынести проверку chr == null отдельно
        if (chr == null) return;
        if (chr < '0' || chr > '9') {
            return false;
        }
    })
    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode) // IE
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which) // остальные
        }
        return null; // специальная клавиша
    }
}
//валидация данных не даём покинуть поле пока там не число
function valid_num_exit(selector_str, default_str) {
    if (default_str === undefined) {
        default_str = '';
    }

    $(selector_str).change(function (e) {
        if ($(selector_str).val() != '') {
            if (!isNumeric($(selector_str).val())) {//проверка корректности ввода табельного могли вставить значенияиз буфера
                alert('В поле должно быть число');
                $(selector_str).val(default_str);
                $(selector_str).focus();
                return;
            }
        }
    })

    function isNumeric(n) {//проверка является ли значение числом
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
//валидация диапазона дат: true-не пройдена, false- пройдена
function valid_date_s_po(str_name,selector_date_s, selector_date_po, min_date_s, max_date_po) {

    var date_s = document.getElementById(selector_date_s);
    var date_po = document.getElementById(selector_date_po);

    if (date_s.value == '') {
        alert(str_name + ' с не задано');
        date_s.focus()
        return true;
    }

    if (date_po.value == '') {
        alert(str_name + ' по не задано');
        date_po.focus()
        return true;
    }

    if (date_s.value >= date_po.value) {
        alert(str_name +' "с" не может быть больше "по"');
        return true;
    }
    if (min_date_s !== undefined) {
        if (date_s.value < min_date_s) {
            alert(str_name +' "с" не может быть меньше ' + min_date_s);
            return true;
        }
    }
    if (max_date_po !== undefined) {
        if (date_po.value > max_date_po) {
            alert(str_name +' "по" не может быть больше ' + max_date_po);
            return true;
        }
    }
    return false;
}

function massage(selector,text) {
    $('#massage').show();
    $('#massageText').html(text);
    $(selector).focus();
}