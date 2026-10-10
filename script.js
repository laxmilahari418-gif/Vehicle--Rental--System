// Filter vehicles by category

const filterButtons = document.querySelectorAll(".filter-button");
const vehicleCards = document.querySelectorAll(".vehicle-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        vehicleCards.forEach(card => {

            const vehicleType = card.dataset.type;

            if (selectedFilter === "all" ||
                selectedFilter === vehicleType) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }
        });
    });
});


// Booking dialog

const bookingDialog = document.getElementById("booking-dialog");
const bookingForm = document.getElementById("booking-form");
const selectedVehicle = document.getElementById("selected-vehicle");
const rentalDays = document.getElementById("rental-days");
const totalCost = document.getElementById("total-cost");

let currentVehicle = "";
let currentPrice = 0;


// Open booking dialog

document.querySelectorAll(".book-button[data-name]").forEach(button => {

    button.addEventListener("click", () => {

        currentVehicle = button.dataset.name;
        currentPrice = Number(button.dataset.price);

        selectedVehicle.textContent =
            currentVehicle + " — ₹" + currentPrice + " per day";

        rentalDays.value = 1;
        totalCost.textContent = currentPrice.toLocaleString("en-IN");

        bookingDialog.showModal();

    });

});


// Calculate rental price

rentalDays.addEventListener("input", () => {

    const days = Number(rentalDays.value);

    if (days >= 1 && days <= 30) {

        const total = currentPrice * days;

        totalCost.textContent = total.toLocaleString("en-IN");

    } else {

        totalCost.textContent = "—";

    }

});


// Close booking dialog

document.getElementById("close-dialog").addEventListener("click", () => {

    bookingDialog.close();

});


// Demo booking confirmation

bookingForm.addEventListener("submit", event => {

    event.preventDefault();

    const days = Number(rentalDays.value);

    if (!Number.isInteger(days) || days < 1 || days > 30) {

        alert("Please enter a rental duration from 1 to 30 days.");

        return;

    }

    const total = currentPrice * days;

    alert(
        "Demo Booking Successful!\n\n" +
        "Vehicle: " + currentVehicle + "\n" +
        "Rental Days: " + days + "\n" +
        "Estimated Total: ₹" + total.toLocaleString("en-IN") +
        "\n\nThis is a demonstration only. No actual reservation was made."
    );

    bookingDialog.close();

});