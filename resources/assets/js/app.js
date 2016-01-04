var voila = new Voila();

$(".login-form").bindLogin("/");
$(".signup-form").bindRegister("/");

var $eventGroups = $("#event-groups");
var $workshopDepartments = $("#workshop-departments");

var $eventGrid = $("#event-grid");
var $workshopGrid = $("#workshop-grid");

var $eventModal = $("#event-modal");
var $workshopModal = $("#workshop-modal");

$eventModal.find(".tab-content").css("height", $(window).height() * 0.58 + "px");
$workshopModal.find(".tab-content").css("height", $(window).height() * 0.58 + "px");


function getEventsListItemMarkup(event, typeClass) {
    var $item = $('<div class="square grid-item hvr-sweep-to-right '+typeClass+'" data-category="' + typeClass + '">' +
    '<div class="sqcontent">'+
    '<div class="sqtable">'+
    '<div class="sqtable-cell">'+
    event.name +
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>');
    $item.data("event", event);
    return $item
}

function getEventsSortButtonMarkup(identifier, groupName, typeClass) {
    return '<li class="hvr-sweep-to-right sorter '+identifier+'" data-sort-class="'+typeClass+'"><a>'+ groupName +'</a></li>';
}

voila.listClassifications(function(groups){
    $eventGroups.append(getEventsSortButtonMarkup("event-sorter active", "All Events", "*"));
    $.each(groups, function( index, group ) {
        $eventGroups.append(getEventsSortButtonMarkup("event-sorter", group.name, "group-" + group.id));
    });
}) ;

voila.listEvents(function (events) {
    $.each(events, function( index, event ) {
        $eventGrid.append(getEventsListItemMarkup(event, "group-" + event.group_id));
    });

    $eventGrid.isotope({
        itemSelector: '.grid-item',
        filter: '*'
    });

}, "event");

voila.listEvents(function (events) {

    $.each(events, function( index, event ) {
        $workshopGrid.append(getEventsListItemMarkup(event, "department-" + event.department_id));
    });

    $workshopGrid.isotope({
        itemSelector: '.grid-item',
        filter: '*'
    });

}, "workshop");

$eventGroups.on('click', 'li', function(){

    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    var sortClass = "."+$(this).data("sort-class");
    if(sortClass==".*") {
        sortClass = "*";
    }
    $eventGrid.isotope({ filter: sortClass })
});

$workshopDepartments.on('click', 'li', function(){

    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    var sortClass = "."+$(this).data("sort-class");
    if(sortClass==".*") {
        sortClass = "*";
    }
    $workshopGrid.isotope({ filter: sortClass })
});

$('#events').on('shown.bs.modal', function (e) {
    $eventGrid.isotope({ filter: "*" })
});

$(document).on('click', '.grid-item', function(){
    var event = $(this).data("event");
    var $modal;
    if(event.type == "event") {
        $modal = $eventModal;
        $modal.find(".title").text(event.name);
        $modal.find("#event-desc").html(event.description);

        if(event.join_type == "individual") {
            $modal.find("#event-type").text("Individual");
        } else {
            if(event.group_info.max == event.group_info.min) {
                $modal.find("#event-type").text("Group ("+ event.group_info.max + " members)");
            } else {
                $modal.find("#event-type").text("Group ("+ event.group_info.min + " to "+ event.group_info.max + " members)");
            }

            $modal.find("#event-prize").text("Rs. "+event.prize);

            var $eventDateHolder = $modal.find("#event-date");
            $eventDateHolder.text("");

            $.each(event.dates_timing, function( index, date ) {
                if(date.from == "" || date.to == "") {
                    $eventDateHolder.append(index + "<br>")
                } else {
                    $eventDateHolder.append(index + " - " + date.from + " to " + date.to + "<br>")
                }
            });

            $modal.find("#event-location").text(event.venue);

            $modal.find("#event-fee").text(event.human_readable_fee);
            $modal.find("#event-rules").html(event.rules);
            $modal.find("#event-judge").html(event.judgement_criteria);
            var $eventContactsHolder  = $modal.find("#event-contacts");

            $.each(event.contact, function( index, contact ) {
                if(contact.name != "" && contact.number != "") {
                    var $contactItem = $("<li>"+contact.name + " - " +  contact.number+"</li>");
                    $eventContactsHolder.append($contactItem)
                }
            });
        }
    } else {
        $modal = $workshopModal;
    }

    if(voila.isLoggedIn()) {
        $modal.find(".register-btn").data("event-id", event.id);
        $modal.find(".register-btn").show();
    } else {
        $modal.find(".register-btn").hide();
    }

    $modal.modal("show");
});

$(".register-btn").click(function () {
    var eventId = $(this).data("event-id");
    voila.registerForEvent(eventId);
});