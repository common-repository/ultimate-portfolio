/*document.addEventListener("DOMContentLoaded", function () {
    // Find the "Save" button by its ID
    var saveButton = document.getElementById("saveButton");
    var photoSrcInput = document.getElementById("up_photo_src");


    // Add a click event listener to the "Save" button
    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default behavior of the link

        // Find the form by its ID or other means
        var form = document.querySelector("form");

        // Update the hidden input field with the current src value of the image
        var photoImage = document.getElementById("photo");
        photoSrcInput.value = photoImage.src;

        // Submit the form
        form.submit();
    });
});*/