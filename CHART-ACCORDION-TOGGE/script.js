$(document).ready(function () {
  // Accordion
  $(".accordion-body").first().show();
  $(".accordion-header").click(function () {
    $(this).next(".accordion-body").slideToggle();
    $(".accordion-body").not($(this).next()).slideUp();
  });

  // Dynanamic List
  $("#addItem").click(function () {
    var itemText = $("#itemInput").val().trim();
    if (itemText !== "") {
      $("#itemList").append(
        "<li>" + itemText + ' <button class="remove-btn">Remove</button></li>'
      );
      $("#itemInput").val("");
    }
  });

  $("#itemList").on("click", ".remove-btn", function () {
    $(this).parent().remove();
  });

  // Bg color
  $("#changeBg").click(function () {
    let colors = ["#f8d7da", "#d4edda", "#cce5ff", "#fff3cd"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    $("body").css("background-color", randomColor);
  });

  // Sidebar toggle
  $("#toggleSidebar").click(function () {
    $("#sidebar").addClass("active");
    $("#content").addClass("shifted");
  });

  $("#closeSidebar").click(function () {
    $("#sidebar").removeClass("active");
    $("#content").removeClass("shifted");
  });

  // Close sidebar when clicking outside
  $(document).click(function (event) {
    if (!$(event.target).closest("#sidebar, #toggleSidebar").length) {
      $("#sidebar").removeClass("active");
      $("#content").removeClass("shifted");
    }
  });
});

// Chart
const ctx = document.getElementById('myChart');
let myCharts;
let jsonData;

fetch('data.json')
.then(function(response) {
  if (response.ok == true) {
    return response.json();
  }
})

.then(function (data) {
  jsonData = data;
  createChart(data, 'pie')
});

function setChartType(chartType) {
  myCharts.destroy();
  createChart(jsonData, chartType)
}

function createChart(data, type) {

  myCharts = new Chart(ctx, {
    type: type,
    data: {
      labels: data.map(row => row.studant_name),
      datasets: [{
        label: '# of Votes',
        data: data.map(row => row.mark),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    }
  });
}