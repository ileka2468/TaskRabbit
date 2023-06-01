let price = document.getElementById("serverPrice");;
let numberInput = document.getElementById("quantityInput");
let totalEl = document.getElementById('totalPrice');
let quantString = document.getElementById('quantString');
let checkBox = document.getElementById('inlineCheckbox99');

numberInput.addEventListener('change', () =>{
    console.log(numberInput.value);
    let numValue = parseInt(numberInput.value);
    let serverPrice = parseInt(price.value);
    console.log(numValue)
    console.log(serverPrice)
    let full = (numValue * serverPrice).toString()
    let finalstring = `$${full}.00`
    totalEl.innerText = finalstring;

    quantString.innerText = `Basic Package (X${numberInput.value})`

});

checkBox.addEventListener('change', ()=>{

    let dollarString = totalEl.innerText
    let numAmount = parseFloat(dollarString.replace(/\$/g, ''))
    console.log(numAmount)
    let answer;
    if(checkBox.checked === true){
        answer = numAmount + 5;
        totalEl.innerText = `$${answer}.00`;

    } else {
        answer = numAmount - 5;
        totalEl.innerText = `$${answer}.00`;
    }
})



console.log(price.value)