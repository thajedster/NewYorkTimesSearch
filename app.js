var endpoint = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

var key = "pM4ODPL9rFxJu2YdLoCkiKWcbpieVtZB";
var startDate, endDate, query, records;


function search(url) {
    $.ajax({
        url: url
    }).then(function (data) {
        /*console.log(data);
        console.log(data.response.docs[0].web_url); //Link
        console.log(data.response.docs[0].snippet); //Summary
        console.log(data.response.docs[0].headline.main); //Headline
        console.log(data.response.docs[0].pub_date); //Date*/
        $("#articles").empty();

        for (var i = 0; i < records; i++) {
            var div = $("<div>").addClass("row");
            var subDiv1 = $("<div>").addClass("column col-2");
            var subDiv2 = $("<div>").addClass("column col-8");
            var subDiv3 = $("<div>").addClass("column col-2");

            var headline = $("<h4>").text(data.response.docs[i].headline.main);
            var summary = $("<p>").text(data.response.docs[i].snippet);
            var date = $("<span>").html(moment(data.response.docs[i].pub_date).format('MMMM Do YYYY, h:mm:ss a'));
            var linkBtn = $("<button>");
            var link = $("<a>")
                .attr("href", data.response.docs[i].web_url)
                .attr("target", "_blank")
                .text("Article");

            $(subDiv2).append(headline);
            $(subDiv2).append(summary);
            $(subDiv2).append(date);
            $(linkBtn).append(link);
            $(subDiv2).append(linkBtn);

            $(div).append(subDiv1);
            $(div).append(subDiv2);
            $(div).append(subDiv3);

            $("#articles").append(div);
        }
    });
}

$(document).ready(function () {

    $("#btn-search").on("click", function () {
        startDate = $("#startYear").val();
        endDate = $("#endYear").val();
        query = $("#search-term").val();
        records = $("#numRecords").val();

        var queryUrl =
            endpoint +
            "?api-key=" +
            key +
            "&begin_date=" +
            startDate +
            "&end_date=" +
            endDate +
            "&q=" +
            query +
            "&sort=newest";

        $("<div>").addClass("spinner-grow m-5");
        //
        $("#articles").empty();
        search(queryUrl);

    });

    $("#btn-clear").on("click", function () {
        $("#articles").empty();
        $("form")[0].reset();
    })
});

