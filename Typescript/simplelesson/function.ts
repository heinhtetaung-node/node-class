function add(num1 : number, num2 : number) : number {
    const total : number = num1 + num2
    return total
}
const rettotal = add(1, 2)
console.log(rettotal)

const stringAdd = (str1 : string, str2 : string) => {
    const strs : string = str1 + str2
    return strs
}
const strVal = stringAdd('a', 'b')
console.log(strVal)