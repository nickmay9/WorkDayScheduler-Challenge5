var currentDate = new Date();

var dateEl = $("#currentDay").text(currentDate.toDateString());

var currentHour = currentDate.getHours();

var scheduleArrObj = JSON.parse(localStorage.getItem("text")) || [];


//loop through all content elements to check hour and set background color accordingly
$(".content").each(function(){
    var timeCheck = parseInt($(this).attr("hour"));
    if(timeCheck === currentHour){
        $(this).addClass("present");
    }
    else if (timeCheck < currentHour){
        $(this).addClass("past");
    }
    else {
        $(this).addClass("future");
    }

    var scheduleHour = $(this).attr("hour");

    if (scheduleArrObj){
        for (var i=0;i<scheduleArrObj.length; i++) {
            if (scheduleArrObj[i].hour === scheduleHour) {
                $(this).text(scheduleArrObj[i].task);
            }
        }
    }
    
});

//content area on click, 
$(".row").on("click", ".content", function(){
    var text = $(this)
        .text()
        .trim();

    var classes = $(this).attr("class");
    var hourAttr = $(this).attr("hour");
    
    var textInput = $("<textarea>")
        .addClass(classes)
        .val(text)
        .attr("hour", hourAttr);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$(".row").on("blur","textarea", function(){
    //get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    var classes = $(this).attr("class");
    var hourAttr = $(this).attr("hour");

    var divEl = $("<div>")
        .addClass(classes)
        .attr("hour", hourAttr)
        .text(text);

    //replace textarea with div element
    $(this).replaceWith(divEl);

});

$(".saveBtn").on("click", function(){
    var hourAttr = $(this).attr("hour");

    var text = $(".content[hour='"+hourAttr+"']")
        .text()
        .trim();

    saveText(text, hourAttr);
    
});

function saveText(text, hourAttr) {

    if (text === ""){
        for (var i=0; i<scheduleArrObj.length; i++){
            if (scheduleArrObj[i].hour === hourAttr){
                scheduleArrObj.splice(i, 1);
            }
        }
    }
    else {
        scheduleArrObj.push({task: text, hour: hourAttr});
    }
    
    localStorage.setItem("text", JSON.stringify(scheduleArrObj));
}