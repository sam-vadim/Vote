$("#filtering").keyup(function () {
    var search_str = this.value.toLowerCase();
    var conc = 0;

    if (($("#info_select").attr("disabled") === "disabled")) {
        $("#info_select option[value='-1']").remove();
        $("#info_select").attr("disabled", false);
    }

    $("#info_select option").each(function () {
        if ((this.text.toLowerCase().indexOf(search_str) > 0) || (this.text.toLowerCase().indexOf(search_str) === 0)
            || (this.value.indexOf(search_str) > 0) || (this.value.indexOf(search_str) === 0))
        {
            $(this).toggle(true);
        }
        else {
            $(this).toggle(false);
            conc++;
        }
    });

    if (conc === $("#info_select option").size()) {
        $("#info_select").append($('<option value="-1">Совпадений не найдено</option>'));
        $("#info_select").attr("disabled", true);
    }

    //здесь пытаюсь выделять первый элемент видимого списка
    $("#info_select :visible:first").attr("selected", "selected");
})