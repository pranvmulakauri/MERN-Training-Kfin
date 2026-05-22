const request = require('supertest')
const app = require('../server')

describe('Get Investor API',()=> {

    test('Valid API call',async ()=> {
        const result = await request(app).get('/api/investor/INV001');
        //console.log(`Body of the response ${JSON.stringify(result.body)}`)
        expect(result.statusCode).toBe(200)
        expect(result.body.investor_id).not.toBeNull()
        
    })

     test('Invalid Valid API call',async ()=> {
        const result = await request(app).get('/api/investor/INV00111');
        console.log(`Body of the response ${JSON.stringify(result.body)}`)
        expect(result.statusCode).toBe(404)
       // expect(result.body.investor_id).not.toBeNull()
        
    })
})