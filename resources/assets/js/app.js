var lock = false;
var count = 0;
function pushWithoutStateChange(stateObject, title, url) {
    lock = true;
    History.pushState(stateObject, title, url);
}

function replaceWithoutStateChange(stateObject, title, url) {
    lock = true;
    History.replaceState(stateObject, title, url);
}

function backWithoutStateChange() {
    lock = true;
    History.back();
}

var voila = new Voila();

function verifyActiveSession() {
    voila.verifyActiveSession(function () {
        $hiButton.fadeOut();
        $loginRegisterButton.fadeIn();
    });
}

verifyActiveSession();


var user;

var $loginRegisterButton = $(".login-register-button"),
    $hiButton = $(".hi-button");
if(voila.isLoggedIn()) {
    user = voila.getUser();
    $loginRegisterButton.fadeOut();
    $hiButton.find(".name").text(user.name);
    $hiButton.fadeIn();
}

$(".login-form").bindLogin("/", function (user) {
    $loginRegisterButton.fadeOut();
    $hiButton.find(".name").text(user.name);
    $hiButton.fadeIn();
    $("#logreg").modal("hide");
});

$(".signup-form").bindRegister("/login", function () {
    $('.tab').trigger("click");
});

var $eventGroups = $("#event-groups");
var $workshopDepartments = $("#workshop-departments");

var $eventGrid = $("#event-grid");
var $workshopGrid = $("#workshop-grid");

var $eventModal = $("#event-modal");
var $workshopModal = $("#workshop-modal");

var $eventsListModel = $("#events");
var $workshopsListModel = $("#ws");

$eventModal.find(".tab-content").css("height", $(window).height() * 0.58 + "px");
$workshopModal.find(".tab-content").css("height", $(window).height() * 0.58 + "px");

$eventGrid.on( 'arrangeComplete', function( event, filteredItems ) {
    $eventGrid.attr("style", "position: relative; height:"+$(window).height() * 0.58 + "px !important"+";");
    $eventGrid.getNiceScroll().resize();
    $eventGrid.removeAttr("tabindex");
});

$workshopGrid.on( 'arrangeComplete', function( event, filteredItems ) {
    $workshopGrid.attr("style", "position: relative; height:"+$(window).height() * 0.58 + "px !important"+";");
    $workshopGrid.getNiceScroll().resize();
    $workshopGrid.removeAttr("tabindex");
});

$eventGrid.niceScroll({
    cursorwidth:"10px",
    cursorborderradius: "0px",
    cursoropacitymin: 0.5,
    horizrailenabled: false,
    cursorborder: "none"
});

$workshopGrid.niceScroll({
    cursorwidth:"10px",
    cursorborderradius: "0px",
    cursoropacitymin: 0.5,
    horizrailenabled: false,
    cursorborder: "none"
});

function getEventsListItemMarkup(event, typeClass) {
    var $item = $('<div class="square grid-item hvr-sweep-to-right '+typeClass+' event-identifier-'+event.id+'" data-category="' + typeClass + '">' +
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

function getEventsSortButtonMarkup(identifier, groupName, groupDesc, typeClass) {
    if(isUndefinedOrNull(groupDesc)) {
            return '<li class="hvr-sweep-to-right sorter '+identifier+'" data-sort-class="'+typeClass+'"><a>'+ groupName +'</a></li>';
    }
    return '<li class="hvr-sweep-to-right sorter '+identifier+'" data-sort-class="'+typeClass+'" data-toggle="tooltip" data-placement="bottom" title="'+ groupDesc +'"><a>'+ groupName +'</a></li>';
}

voila.listClassifications(function(groups){
    $eventGroups.append(getEventsSortButtonMarkup("event-sorter active", "All Events",null, "*"));
    $.each(groups, function( index, group ) {
        $eventGroups.append(getEventsSortButtonMarkup("event-sorter", group.name, group.description, "group-" + group.id));
    });
    
	$('[data-toggle="tooltip"]').tooltip();
}) ;

voila.listEvents(function (events) {
    $.each(events, function( index, event ) {
        $eventGrid.append(getEventsListItemMarkup(event, "group-" + event.group_id));
    });

    $eventGrid.isotope({
        itemSelector: '.grid-item',
        filter: '*',
        layoutMode: 'fitRows',
        fitRows: {
            gutter: 1
        },
        resizesContainer : false
    });
    count = count + 1;
    if(count == 2) {
        stateChangeHandler();
    }

}, "event");

voila.listDepartments(function(departments){
    $workshopDepartments.append(getEventsSortButtonMarkup("event-sorter active", "All Workshops", null, "*"));
    $.each(departments, function( index, department ) {
        $workshopDepartments.append(getEventsSortButtonMarkup("event-sorter", department.name, null, "department-" + department.id));
    });
}) ;


voila.listEvents(function (events) {
    $.each(events, function( index, event ) {
        $workshopGrid.append(getEventsListItemMarkup(event, "department-" + event.department_id));
    });

    $workshopGrid.isotope({
        itemSelector: '.grid-item',
        filter: '*',
        layoutMode: 'fitRows',
        fitRows: {
            gutter: 1
        },
        resizesContainer : false
    });

    count = count + 1;
    if(count == 2) {
        stateChangeHandler();
    }

}, "workshop");

$eventGroups.on('click', 'li', function(){

    $(this).siblings().removeClass("active");
    $(this).addClass("active");

    var sortClass = "."+$(this).data("sort-class");
    if(sortClass==".*") {
        sortClass = "*";
    }

    $eventGrid.isotope({ filter: sortClass });
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

$eventsListModel.on('shown.bs.modal', function (e) {
    $eventsListModel.find(".event-sorter[data-sort-class='*']").trigger("click");
    $eventGrid.isotope({ filter: "*" });
    pushWithoutStateChange(null, "Events - Anokha 2016", "/events");
    $eventGrid.getNiceScroll().resize();

}).on('hidden.bs.modal', function (e) {
    History.replaceState(null, "Anokha 2016", "/");
});

$workshopsListModel.on('shown.bs.modal', function (e) {
    $workshopsListModel.find(".event-sorter[data-sort-class='*']").trigger("click");
    $workshopGrid.isotope({ filter: "*" });
    pushWithoutStateChange(null, "Workshops - Anokha 2016", "/workshops");
    $workshopGrid.getNiceScroll().resize();

}).on('hidden.bs.modal', function (e) {
    History.replaceState(null, "Anokha 2016", "/");
});

var $eventDateHolder,$eventContactsHolder;
$(document).on('click', '.grid-item', function(){

    verifyActiveSession();

    var event = $(this).data("event");
    var $modal;

    pushWithoutStateChange(null, event.name, "/"+event.type+"/"+event.slug+"/"+event.id);

    if(event.type == "event") {
        $modal = $eventModal;
        $modal.find("#event-prize").text("Rs. "+event.prize);
        $modal.find("#event-rules").html(event.rules).linkify({
            target: "_blank"
        });
        $modal.find("#event-judge").html(event.judgement_criteria).linkify({
            target: "_blank"
        });

    } else {
        $modal = $workshopModal;
        $modal.find("#event-about").html(event.explanation).linkify({
            target: "_blank"
        });
    }

    $modal.find(".title").text(event.name);
    $modal.find("#event-desc").html(event.description).linkify({
        target: "_blank"
    });

    if(event.join_type == "individual") {
        $modal.find("#event-type").text("Individual");
    } else {
        if (event.group_info.max == event.group_info.min) {
            $modal.find("#event-type").text("Group (" + event.group_info.max + " members)");
        } else {
            $modal.find("#event-type").text("Group (" + event.group_info.min + " to " + event.group_info.max + " members)");
        }
    }

    $eventDateHolder = $modal.find("#event-date");
    $eventDateHolder.text("");
    if(Object.keys(event.dates_timing).length > 0) {
        $.each(event.dates_timing, function( index, date ) {
            if(date.from == "" || date.to == "") {
                $eventDateHolder.append(index + "<br>")
            } else {
                $eventDateHolder.append(index + " - " + date.from + " to " + date.to + "<br>")
            }
        });
    } else {
        $eventDateHolder.text("(to be updated)");
    }

    if(event.venue == "" || event.venue == " " || event.venue == null) {
        $modal.find("#event-location").text("(to be updated)");
    } else {
        $modal.find("#event-location").text(event.venue);
    }

    $modal.find("#event-fee").text(event.human_readable_fee);

    $eventContactsHolder  = $modal.find("#event-contacts");
    $eventContactsHolder.text("");

    if(Object.keys(event.contact).length > 0) {
        $.each(event.contact, function( index, contact ) {
            if(contact.name != "" && contact.number != "") {
                var $contactItem = $("<li>"+contact.name + " - " +  contact.number+"</li>");
                $eventContactsHolder.append($contactItem)
            }
        });
    } else {
        $eventContactsHolder.text("anokha@cb.amrita.edu");
    }

    $modal.find(".tab-content").niceScroll({
        cursorwidth:"10px",
        cursorborderradius: "0px",
        cursoropacitymin: 0.5,
        horizrailenabled: false,
        cursorborder: "none"
    });


    if(voila.isLoggedIn()) {
        $modal.find(".register-btn").data("event-id", event.id);
        $modal.find(".register-btn").show();
        $modal.find(".login-to-register-btn").hide();
    } else {
        $modal.find(".register-btn").hide();
        $modal.find(".login-to-register-btn").show();
    }

    $modal.modal("show");
});

$(".register-btn").click(function () {
    var eventId = $(this).data("event-id");
    voila.loadSpinner();
    voila.registerForEvent(eventId);
});

$eventModal.on('hidden.bs.modal', function (e) {
    History.replaceState(null, "Events - Anokha 2016", "/events");
});

$workshopModal.on('hidden.bs.modal', function (e) {
    History.replaceState(null, "Workshops - Anokha 2016", "/workshops");
});

var stateChangeHandler = function(){

    ga('set', 'location', window.location.href);
    ga('send', 'pageview');

    if(!lock) {
        var uri = new URI(window.location.href);
        var path = uri.pathname();

        if(uri.hasQuery("registration") === true) {
            if(uri.hasQuery("registration", "success") === true) {
                createSnackbar("The registration for the event/workshop was successful.", null, null, 6000)
            } else if(uri.hasQuery("registration", "failed") === true) {
                createSnackbar("The registration for the event/workshop has failed. You have not been charged.", null, null, 6000)
            }
        }
        var splitPath = path.split("/");
        if(path.startsWith("/event/")) {
            $(".event-identifier-"+splitPath[splitPath.length-1]).trigger("click");
            console.log(".event-identifier-"+splitPath[splitPath.length-1]);
        } else if(path.startsWith("/workshop/")) {
            $(".event-identifier-"+splitPath[splitPath.length-1]).trigger("click");
        } else if(path.startsWith("/events")) {
            $eventsListModel.modal("show");
            $eventModal.modal("hide");
            $workshopModal.modal("hide");
        } else if(path.startsWith("/workshops")) {
            $workshopsListModel.modal("show");
            $eventModal.modal("hide");
            $workshopModal.modal("hide");
        } else if(path == "/") {
            $eventModal.modal("hide");
            $workshopModal.modal("hide");
            $eventsListModel.modal("hide");
            $workshopsListModel.modal("hide");
        }
    } else {
        lock = false;
    }
};

History.Adapter.bind(window,'statechange', stateChangeHandler);


