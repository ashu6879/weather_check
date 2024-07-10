document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("whatsapp-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const mobileNumber = document.getElementById("mobile-number").value;
        const message = document.getElementById("message").value;
        const url = `https://api.whatsapp.com/send?phone=91+${mobileNumber}&text=${message}`;
        window.open(url, '_blank');
    });
});

