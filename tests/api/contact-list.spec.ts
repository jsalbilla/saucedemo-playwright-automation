import { test, expect } from '@playwright/test'
import { create } from 'node:domain';

//If the BASEURL is missing ??, use the following URL. 
const baseURL = process.env.CONTACT_LIST_BASE_URL ?? 'https://thinking-tester-contact-list.herokuapp.com';


test.describe('Contact List API testing', () => {
    test('should confirm that the API is available', async ({ request }) => {
        const response = await request.get(`${baseURL}/`);
        expect(response.status()).toBe(200);
    })
})

//Get , Create , Get Created , Update and Delete 

test('Create, Update and Delete Article', async ({ request }) => {
    //Create/Get Token.
    const createToken = await request.post(`${baseURL}/users/login`, {
        data: { email: 'mark@test.com', password: 'Lanaya-12' }
    })
    expect(createToken.status()).toBe(200)
    const createTokenJSON = await createToken.json()
    // console.log(createTokenJSON)
    const createdToken = createTokenJSON.token


    //Get All Contact List. 
    const getContactList = await request.get(`${baseURL}/contacts`, {
        headers: {
            Authorization: `Bearer ${createdToken}`,
        }
    })
    expect(getContactList.status()).toBe(200)
    const getContactListJSON = await getContactList.json()
    // console.log(getContactListJSON)


    //Create New Contact
    const createContact = await request.post(`${baseURL}/contacts`, {
        headers: { Authorization: `Bearer ${createdToken}` },
        data: {
            firstName: "Katakuri",
            lastName: "Guo",
            birthdate: "1970-01-01",
            email: "megumi@test.com",
            phone: "8005555555",
            street1: "1 Main St.",
            street2: "Apartment A",
            city: "Anytown",
            stateProvince: "KS",
            postalCode: "12345",
            country: "USA"
        }
    })

    expect(createContact.status()).toBe(201)
    const createContactJSON = await createContact.json()
    // console.log(createContactJSON)
    expect(createContactJSON.firstName).toEqual('Katakuri')
    expect(createContactJSON.lastName).toEqual('Guo')
    const uniqueId = createContactJSON._id


    //Update Created Contact List
    const updateCreatedContact = await request.put(`${baseURL}/contacts/${uniqueId}`, {
        headers: {
            Authorization: `Bearer ${createdToken}`
        },
        data: {
            firstName: "Nepo",
            lastName: "Guo",
            birthdate: "1970-01-01",
            email: "megumi@test.com",
            phone: "8005555555",
            street1: "Tanay, Rizal",
            street2: "M.L Quezon",
            city: "Anytown",
            stateProvince: "KS",
            postalCode: "12345",
            country: "USA"
        }
    })

    expect(updateCreatedContact.status()).toBe(200)
    const updateCreatedContactJSON = updateCreatedContact.json()
    // console.log(updateCreatedContactJSON)




    //GET Method - Check if the created Contact is created. 
    const verifyCreatedContact = await request.get(`${baseURL}/contacts/${uniqueId}`, {
        headers: {
            Authorization: `Bearer ${createdToken}`
        }
    })
    expect(verifyCreatedContact.status()).toBe(200)
    const getCreatedContact = await verifyCreatedContact.json()
    console.log(getCreatedContact)
    expect(getCreatedContact.firstName).toEqual('Nepo')
    expect(getCreatedContact.lastName).toEqual('Guo')


    //DELETE Method
    const deleteCreatedContact = await request.delete(`${baseURL}/contacts/${uniqueId}`, {
        headers: {
            Authorization: `Bearer ${createdToken}`
        }
    })
    expect(deleteCreatedContact.status()).toBe(200)

})

