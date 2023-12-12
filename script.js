document.addEventListener('DOMContentLoaded', function() {
    
//////////////////////////////////////////////////////////////////////////

    //   // Check if JavaScript is enabled
    // var isJavaScriptEnabled = document.querySelector('.rating-container');

    // if (isJavaScriptEnabled) {
    //     // JavaScript is enabled, hide the noscript version
    //     var noscriptVersion = document.querySelector('noscript');
    //     if (noscriptVersion) {
    //     noscriptVersion.style.display = 'none';
    //     }
    // } else {
    //     // JavaScript is disabled, hide the JavaScript version
    //     var javascriptVersion = document.querySelector('.rating-container');
    //     if (javascriptVersion) {
    //     javascriptVersion.style.display = 'none';
    //     }
    // }

//////////////////////////////////////////////////////////////////////////
    
    var rating = 0;
    var percent = 0;
    var valueField = document.querySelector('.star-value');
    var ratingForm = document.getElementById('ratingForm');
    var ratingTitle = document.getElementById('ratingTitle');
    var minStars = parseInt(ratingForm.getAttribute('data-min')) || 3;
    var maxStars = parseInt(ratingForm.getAttribute('data-max')) || 5;

    // Clear existing content inside the rating container
    var ratingContainer = document.querySelector('.rating');
    ratingContainer.innerHTML = '';
  
    // Create stars dynamically based on the max attribute
    for (var i = 1; i <= maxStars; i++) {
        var input = document.createElement('input');
        input.type = 'radio';
        input.id = 'star' + (maxStars - i + 1);  // Make sure the id is set appropriately
        input.name = 'rating';
        input.value = (maxStars - i + 1);
    
        var label = document.createElement('label');
        label.htmlFor = 'star' + (maxStars - i + 1);  // Match the 'for' attribute with the input id
        label.title = (maxStars - i + 1) + ' stars';
    
        // Append the input and label to the rating container
        ratingContainer.appendChild(input);
        ratingContainer.appendChild(label);
    }
  

    document.querySelectorAll('.rating input[name="rating"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        rating = document.querySelector('.rating input[name="rating"]:checked').value;
        percent = rating * 20;
  
        if (percent >= 80) {
          valueField.innerHTML = "Thanks for " + rating + " stars rating!";
        } else {
          valueField.innerHTML = "Thanks for your feedback of " + rating + " stars. We'll try to do better!";
        }

        //Fetch 
      });
    });
  
    var submitButton = document.getElementById('submitButton');
    if (submitButton) {
      submitButton.addEventListener('click', function(event) {
        event.preventDefault();
  
        // Hide the rating widget and display the thank-you message
        document.querySelector('.rating-container').style.display = 'none';
        valueField.style.display = 'block'; // Display the thanks message
      });
    }
  });
  