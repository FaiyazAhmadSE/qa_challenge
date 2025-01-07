//API e2e test cases

import { expect, test } from '@playwright/test'
import axios from 'axios'

test.describe('PokeAPI Tests', () => {

    const BASE_URL = 'https://pokeapi.co/api/v2'

    test('Test id and name with valid/invalid inputs', async () => {
        const validId = 1
        const invalidId = 11111
        const validName = 'chesto'
        const invalidName = 'nonexistentberry'

        // Test valid ID
        let response = await axios.get(`${BASE_URL}/berry/${validId}`)
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('name')

        // Test invalid ID
        try {
            response = await axios.get(`${BASE_URL}/berry/${invalidId}`)
        } catch (error) {
            expect(error.response.status).toBe(404)
        }

        // Test valid name
        response = await axios.get(`${BASE_URL}/berry/${validName}`)
        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty('id')

        // Test invalid name
        try {
            response = await axios.get(`${BASE_URL}/berry/${invalidName}`)
        } catch (error) {
            expect(error.response.status).toBe(404)
        }
    })

    test('Test berry which has more potency', async () => {
        const flavorName = 'spicy'

        // Test valid flavor name
        const flavorResponse = await axios.get(`${BASE_URL}/berry-flavor/${flavorName}`)
        expect(flavorResponse.status).toBe(200)
        const berries = flavorResponse.data.berries

        // Find berry with the highest potency
        const mostPotentBerry = berries.reduce((max, berry) =>
            berry.potency > max.potency ? berry : max, berries[0])

        expect(mostPotentBerry).toBeDefined()

        // Call with the most potent berry's name
        const berryName = mostPotentBerry.berry.name
        const berryResponse = await axios.get(`${BASE_URL}/berry/${berryName}`)
        expect(berryResponse.status).toBe(200)
        expect(berryResponse.data).toHaveProperty('name', berryName)
    })
})

