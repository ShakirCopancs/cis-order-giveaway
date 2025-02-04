// Tabs
const tabs = document.querySelectorAll('.trial-navtab');
const contents = document.querySelectorAll('.trial-content');
const underline = document.querySelector('.trial-underline');

function updateUnderline() {
  const activeTab = document.querySelector('.trial-navtab.active');
  underline.style.width = `${activeTab.offsetWidth}px`;
  underline.style.left = `${activeTab.offsetLeft}px`;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-target');
    contents.forEach(content => {
      if (content.id === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
    updateUnderline();
  });
});

window.addEventListener('resize', updateUnderline);
updateUnderline();
// Tabs


function toggleHighlight(stepId) {
    const element = document.getElementById(stepId);
    element.classList.toggle("submitForm");
  }

  function downChevrons(stepId) {
    const element = document.getElementById(stepId);
    element.classList.toggle("accountDetails");
  }

  function toggleActive() {
    const activeElement = document.querySelector(".show-more-details");
    const hideText = document.querySelector(".hide");
    const showText = document.querySelector(".show");
  
    activeElement.classList.toggle("hide-more-details");
  
    if (activeElement.classList.contains("hide-more-details")) {
      hideText.style.display = "inline";
      showText.style.display = "none";
    } else {
      hideText.style.display = "none";
      showText.style.display = "inline";
    }
  }

$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});

function dropdownonClick() {
  var x = document.getElementById("drop-down-list");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// $(function() { 
//   $( "#my_date_picker" ).datepicker({ 
//       dateFormat: 'MM d, yy', 
//       defaultDate:"Jun 10, 2024"
//   }); 
// }); 

$(function() { 
  $( ".datepicker" ).datepicker({ 
      dateFormat: 'M d, yy', 
      defaultDate:"Jun 12, 2024",
      // showButtonPanel: true,
      changeMonth: true,
      changeYear: true
  }); 
}); 

$(document).ready(function () {
  function updateButtonState() {
    if ($('input[type="checkbox"]:checked').length > 0) {
      $("#continueButton")
        .removeClass("btn-disable")
        .addClass("btn-primary");
    } else {
      $("#continueButton")
        .removeClass("btn-primary")
        .addClass("btn-disable");
    }
  }

  $(".parent").click(function () {
    $(this).nextUntil(".parent").toggle();
    
    // Toggle the icon classes
    $(this).find(".toggle").toggleClass("cs-icon-expand cs-icon-collapse");
  });

  $(".child-checkbox").change(function () {
    updateButtonState();
  });

  updateButtonState();
});


// .cs-icon-expand
// .cs-icon-collapse


$(document).ready(function () {
  $("#search-input").on("click", function () {
    if ($("#search-result").hasClass("show-result")) {
      $("#search-result").removeClass("show-result");
    } else {
      $("#search-result").addClass("show-result");
    }
  });
});

// Tooltip 
$(function () {
  $('[data-toggle="tooltip"]').tooltip({delay: { "show": 500, "hide": 100 }})
})


$( function() {
  $( "#datepicker" ).datepicker({
    changeMonth: true,
    changeYear: true
  });
} );
