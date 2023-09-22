import Validator from 'fastest-validator';


const v = new Validator()

const schema = {
    phone: { type: "string" , length:11},
    smsCode:{ type: "string" , length:6},
    $$strict: true
}
const check = v.compile(schema)

export default check