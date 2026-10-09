import java.util.ArrayList;
import java.util.Scanner;

public class VehicleRentalSystem {

    private static ArrayList<Vehicle> vehicles = new ArrayList<>();
    private static ArrayList<Rental> rentals = new ArrayList<>();

    private static Scanner sc = new Scanner(System.in);

    // Add sample vehicles
    public static void initializeVehicles() {

        vehicles.add(new Car("KA01AB1234", "Hyundai", 1500));
        vehicles.add(new Car("KA01CD5678", "Toyota", 2000));

        vehicles.add(new Bike("KA02EF1234", "Honda", 500));
        vehicles.add(new Bike("KA02GH5678", "Royal Enfield", 800));
    }

    // Display available vehicles
    public static void displayVehicles() {

        System.out.println("\n========== VEHICLE LIST ==========");

        boolean found = false;

        for (Vehicle vehicle : vehicles) {

            if (vehicle.isAvailable()) {
                System.out.println();
                vehicle.displayDetails();
                System.out.println("---------------------------------");
                found = true;
            }
        }

        if (!found) {
            System.out.println("No vehicles are currently available.");
        }
    }

    // Rent a vehicle
    public static void rentVehicle() {

        System.out.print("\nEnter your Customer ID: ");
        String customerId = sc.nextLine().trim();

        System.out.print("Enter your Name: ");
        String name = sc.nextLine().trim();

        System.out.print("Enter your Phone Number: ");
        String phone = sc.nextLine().trim();

        if (customerId.isEmpty() || name.isEmpty() || phone.isEmpty()) {
            System.out.println("All customer details are required.");
            return;
        }

        displayVehicles();

        System.out.print("\nEnter Vehicle Number to rent: ");
        String vehicleNumber = sc.nextLine().trim();

        Vehicle selectedVehicle = null;

        for (Vehicle vehicle : vehicles) {

            if (vehicle.getVehicleNumber().equalsIgnoreCase(vehicleNumber)
                    && vehicle.isAvailable()) {

                selectedVehicle = vehicle;
                break;
            }
        }

        if (selectedVehicle == null) {
            System.out.println("Vehicle not found or already rented.");
            return;
        }

        System.out.print("Enter number of rental days: ");

        if (!sc.hasNextInt()) {
            System.out.println("Please enter a valid whole number.");
            sc.nextLine();
            return;
        }

        int days = sc.nextInt();
        sc.nextLine();

        if (days <= 0) {
            System.out.println("Rental days must be greater than zero.");
            return;
        }

        Customer customer = new Customer(customerId, name, phone);

        Rental rental = new Rental(customer, selectedVehicle, days);

        selectedVehicle.setAvailable(false);

        rentals.add(rental);

        System.out.println("\nVehicle rented successfully!");
        rental.displayRentalDetails();
    }

    // Return a vehicle
    public static void returnVehicle() {

        System.out.print("\nEnter Vehicle Number to return: ");
        String vehicleNumber = sc.nextLine().trim();

        for (Rental rental : rentals) {

            Vehicle vehicle = getRentedVehicle(rental);

            if (vehicle.getVehicleNumber().equalsIgnoreCase(vehicleNumber)
                    && !vehicle.isAvailable()) {

                vehicle.setAvailable(true);

                System.out.println("Vehicle returned successfully!");
                System.out.println("Vehicle Number: "
                        + vehicle.getVehicleNumber());

                return;
            }
        }

        System.out.println(
                "No active rental found for this vehicle number."
        );
    }

    // Get the vehicle associated with a rental
    private static Vehicle getRentedVehicle(Rental rental) {

        try {
            java.lang.reflect.Field field =
                    Rental.class.getDeclaredField("vehicle");

            field.setAccessible(true);

            return (Vehicle) field.get(rental);

        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException(
                    "Unable to retrieve rental vehicle.", e
            );
        }
    }

    // Display all rental records
    public static void displayRentals() {

        System.out.println("\n========== RENTAL RECORDS ==========");

        if (rentals.isEmpty()) {
            System.out.println("No rental records available.");
            return;
        }

        for (Rental rental : rentals) {
            rental.displayRentalDetails();
        }
    }

    // Main method
    public static void main(String[] args) {

        initializeVehicles();

        int choice;

        do {

            System.out.println("\n==================================");
            System.out.println("       VEHICLE RENTAL SYSTEM");
            System.out.println("==================================");

            System.out.println("1. View Available Vehicles");
            System.out.println("2. Rent a Vehicle");
            System.out.println("3. Return a Vehicle");
            System.out.println("4. View Rental Records");
            System.out.println("5. Exit");

            System.out.print("Enter your choice: ");

            if (!sc.hasNextInt()) {
                System.out.println("Please enter a valid menu number.");
                sc.nextLine();
                continue;
            }

            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    displayVehicles();
                    break;

                case 2:
                    rentVehicle();
                    break;

                case 3:
                    returnVehicle();
                    break;

                case 4:
                    displayRentals();
                    break;

                case 5:
                    System.out.println(
                            "Thank you for using Vehicle Rental System!"
                    );
                    break;

                default:
                    System.out.println(
                            "Invalid choice. Please try again."
                    );
            }

        } while (choice != 5);

        sc.close();
    }
}