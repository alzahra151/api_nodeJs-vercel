const supertest = require("supertest");
const app = require("../index")

var request=supertest(app)
describe("test todo rotes" , function(){
    it('should get products' , function(){
     request.get('/products')
   .then((res)=>{
        expect(res.body).toEqual(jasmine.any(Array))
           console.log(res.body.length);
           expect(res.body.length).toEqual(9)
       })
    
    })
})