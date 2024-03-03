/**
 * Basic Type
 */
// String
let car="Toyota"
let bike:string
bike='Winner'


// Number
let num:Number=10


//boolean
let isLoading:boolean=false


// undefined
// let body=undefined


// null
let footer:null


// any
let person:any
person=10
person='something'
person=false

/**
 * Object
 */
let house: {
    address: string
    color?:string
} = {
    address:'',
    color:''
}
house.address="Long An"

let product: any[]=[]
product.push(1)
product.push('Nguyễn Trần Thanh Hằng')

// string[]
let address: string[]=[]
address.push("Long An ")
address.push("Buôn Mê Thuột")


// number[]
let number: number[]=[]
number.push(97)
number.push(27)

// obj[]
let people:{
    name:string
    class:string
}[]=[]
people.push({
    name:"Nguyễn Trần Thanh Hằng",
    class:"D22CQPT01-N"
})

/**
 * Fuction
 */


const sum=(num1:number,num2:number)=>{
    return num1+num2;
}
sum(1,2)

const sub=(num1:number, num2:number)=>{
    return num1-num2;
}
sub(1,2)
/**
 * Union
 */

let price : string | number
price='Vy'
price=97
// price=false -> lỗi 


let body:{ name: string | number} | { firstname: string }={
    name:100
}

/**
 * Enum
 */

enum Sizes{
    S='S',
    M='M',
    L='L',
    XL='XL'
}

let a=Sizes.S // a lúc này có giá trị bằng S

class Person{
    constructor(public name:string,public age:number){}
    
}