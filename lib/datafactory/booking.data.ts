//The data were provided in the official documentation.

// Create Initial Booking:  'Content-Type: application/json' \
export const createBooking = {
    "firstname": "Macur",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
};

// Update the Initial/Existing Booking:
// // -H 'Content-Type: application/json' \
// -H 'Accept: application/json' \
// -H 'Cookie: token=abc123' \

export const updateBooking = {
    "firstname": "James",
    "lastname": "Clip",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
}