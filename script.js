document.addEventListener('DOMContentLoaded', function () {

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
    input.id = 'star' + (maxStars - i + 1);
    input.name = 'rating';
    input.value = (maxStars - i + 1);

    var label = document.createElement('label');
    label.htmlFor = 'star' + (maxStars - i + 1);
    label.title = (maxStars - i + 1) + ' stars';

    // Append the input and label to the rating container
    ratingContainer.appendChild(input);
    ratingContainer.appendChild(label);
  }

  document.querySelectorAll('.rating input[name="rating"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      rating = document.querySelector('.rating input[name="rating"]:checked').value;
      percent = rating * 20;

      if (percent >= 80) {
        valueField.innerHTML = "Thanks for " + rating + " stars rating!";
      } else {
        valueField.innerHTML = "Thanks for your feedback of " + rating + " stars. We'll try to do better!";
      }

      // Fetch to send the rating to the server-side endpoint
      fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Sent-By': 'JS',
        },
        body: new URLSearchParams({
          sentBy: 'js',
          question: "How satisfied are you?",
          rating: rating,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Error sending rating:', error);
        });
    });
  });

  var submitButton = document.getElementById('submitButton');
  if (submitButton) {
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();

      // Hide the rating widget and display the thank-you message
      document.querySelector('.rating-container').style.display = 'none';
      valueField.style.display = 'block'; // Display the thanks message

      // Fetch to send the rating to the server-side endpoint
      fetch('https://httpbin.org/post', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Sent-By': 'JS',
        },
        body: new URLSearchParams({
          sentBy: 'js',
          rating: rating,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Error sending rating:', error);
        });
    });
  }
});
