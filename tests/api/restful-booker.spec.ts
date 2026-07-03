import { test, expect, type APIRequestContext } from '@playwright/test';
import { createBooking, updateBooking } from '../../lib/datafactory/booking.data';

const baseURL = process.env.RESTFUL_BOOKER_BASE_URL;
const username = process.env.RESTFUL_BOOKER_USERNAME;
const password = process.env.RESTFUL_BOOKER_PASSWORD;

//Create helper function for the bookingid.
async function createTestBooking(request: APIRequestContext): Promise<number> {
    const response = await request.post(baseURL + '/booking', { headers: { 'Content-Type': 'application/json' }, data: createBooking });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.bookingid).toBeDefined();
    expect(typeof responseBody.bookingid).toBe('number');
    return responseBody.bookingid;
}

//Create helper function for the generating token.
async function createAuthToken(request: APIRequestContext): Promise<string> {
    const response = await request.post(baseURL + '/auth', { headers: { 'Content-Type': 'application/json' }, data: { username, password } });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeDefined();
    expect(typeof responseBody.token).toBe('string');
    return responseBody.token;
}

test.describe('Restful-Booker API', () => {

    //GET Method - Ping, checking the connection.
    test('should confirm that the API is available', async ({ request }) => {
        const response = await request.get(baseURL + '/ping');
        expect(response.status()).toBe(201);
    });

    // POST Method - create booking.
    test('should create a booking successfully', async ({ request }) => {
        const response = await request.post(baseURL + '/booking', { headers: { 'Content-Type': 'application/json' }, data: createBooking });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody.bookingid).toBeDefined();
        expect(typeof responseBody.bookingid).toBe('number');
        expect(responseBody.booking.firstname).toBe(createBooking.firstname);
        expect(responseBody.booking.lastname).toBe(createBooking.lastname);
        expect(responseBody.booking.totalprice).toBe(createBooking.totalprice);
        expect(responseBody.booking.depositpaid).toBe(createBooking.depositpaid);
        expect(responseBody.booking.bookingdates.checkin).toBe(createBooking.bookingdates.checkin);
        expect(responseBody.booking.bookingdates.checkout).toBe(createBooking.bookingdates.checkout);
        expect(responseBody.booking.additionalneeds).toBe(createBooking.additionalneeds);
    });


    // Get Method - fetch the created booking.
    test('should retrieve a created booking', async ({ request }) => {
        const bookingId = await createTestBooking(request);
        const response = await request.get(baseURL + '/booking/' + bookingId);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody.firstname).toBe(createBooking.firstname);
        expect(responseBody.lastname).toBe(createBooking.lastname);
        expect(responseBody.totalprice).toBe(createBooking.totalprice);
        expect(responseBody.depositpaid).toBe(createBooking.depositpaid);
        expect(responseBody.bookingdates.checkin).toBe(createBooking.bookingdates.checkin);
        expect(responseBody.bookingdates.checkout).toBe(createBooking.bookingdates.checkout);
        expect(responseBody.additionalneeds).toBe(createBooking.additionalneeds);
    });

    //PUT Method - update the created booking.
    test('should update a booking with a valid token', async ({ request }) => {
        const bookingId = await createTestBooking(request);
        const token = await createAuthToken(request);
        const response = await request.put(baseURL + '/booking/' + bookingId, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cookie': 'token=' + token }, data: updateBooking });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody.firstname).toBe(updateBooking.firstname);
        expect(responseBody.lastname).toBe(updateBooking.lastname);
        expect(responseBody.totalprice).toBe(updateBooking.totalprice);
        expect(responseBody.depositpaid).toBe(updateBooking.depositpaid);
        expect(responseBody.bookingdates.checkin).toBe(updateBooking.bookingdates.checkin);
        expect(responseBody.bookingdates.checkout).toBe(updateBooking.bookingdates.checkout);
        expect(responseBody.additionalneeds).toBe(updateBooking.additionalneeds);
    });

    //NEGATIVE: PUT Method - Update booking using invalid token.
    test('should reject a booking update with an invalid token', async ({ request }) => {
        const bookingId = await createTestBooking(request);
        const response = await request.put(baseURL + '/booking/' + bookingId, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Cookie': 'token=invalid-token' }, data: updateBooking });
        expect(response.status()).toBe(403);
    });

    //DELETE Method - Delete the created booking.
    test('should delete a booking with a valid token', async ({ request }) => {
        const bookingId = await createTestBooking(request);
        const token = await createAuthToken(request);
        const deleteResponse = await request.delete(baseURL + '/booking/' + bookingId, { headers: { 'Cookie': 'token=' + token } });
        expect(deleteResponse.status()).toBe(201);
        const getResponse = await request.get(baseURL + '/booking/' + bookingId);
        expect(getResponse.status()).toBe(404);
    });
});