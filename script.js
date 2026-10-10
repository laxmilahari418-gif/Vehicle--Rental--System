// Filter vehicles

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
            const matches =
                selectedFilter === "all" ||
                card.dataset.type === selectedFilter;

            card.style.display = matches ? "" : "none";
        });
    });
});


// Booking form

const bookingDialog = document.getElementById("booking-dialog");
const bookingForm = document.getElementById("booking-form");
const selectedVehicle = document.getElementById("selected-vehicle");

const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const customerEmail = document.getElementById("customer-email");

const rentalDate = document.getElementById("rental-date");
const rentalDays = document.getElementById("rental-days");
const totalCost = document.getElementById("total-cost");

let currentVehicle = "";
let currentPrice = 0;


// Set today's date as the earliest rental date

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

rentalDate.min = localToday;
rentalDate.value = localToday;


// Open booking dialog

document.querySelectorAll(".book-button[data-name]").forEach(button => {
    button.addEventListener("click", () => {
        currentVehicle = button.dataset.name;
        currentPrice = Number(button.dataset.price);

        selectedVehicle.textContent =
            currentVehicle + " — ₹" +
            currentPrice.toLocaleString("en-IN") + " per day";

        rentalDays.value = 1;
        totalCost.textContent =
            currentPrice.toLocaleString("en-IN");

        bookingDialog.showModal();
    });
});


// Calculate rental cost

function updateTotal() {
    const days = Number(rentalDays.value);

    if (Number.isInteger(days) && days >= 1 && days <= 30) {
        totalCost.textContent =
            (currentPrice * days).toLocaleString("en-IN");
    } else {
        totalCost.textContent = "—";
    }
}

rentalDays.addEventListener("input", updateTotal);


// Close dialog

document.getElementById("close-dialog").addEventListener("click", () => {
    bookingDialog.close();
});


// Confirm demo booking

bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const days = Number(rentalDays.value);
    const date = rentalDate.value;

    if (!Number.isInteger(days) || days < 1 || days > 30) {
        alert("Please select between 1 and 30 rental days.");
        return;
    }

    if (!date || date < localToday) {
        alert("Please select today or a future rental date.");
        return;
    }

    const total = currentPrice * days;

    alert(
        "Demo Booking Successful!\n\n" +
        "Customer: " + customerName.value.trim() + "\n" +
        "Phone: " + customerPhone.value + "\n" +
        "Email: " + customerEmail.value.trim() + "\n" +
        "Vehicle: " + currentVehicle + "\n" +
        "Start Date: " + date + "\n" +
        "Rental Days: " + days + "\n" +
        "Estimated Total: ₹" + total.toLocaleString("en-IN") +
        "\n\nThis is a demonstration. No real reservation was created."
    );

    bookingDialog.close();
});