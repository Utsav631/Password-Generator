const inputSlider = document.querySelector("[datalenSlider]");
const lenDisplay = document.querySelector("[datalenNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copying]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector('#checkbox1');
const lowercaseCheck = document.querySelector('#checkbox2');
const numCheck = document.querySelector('#checkbox3');
const symbCheck = document.querySelector('#checkbox4');

const indicator = document.querySelector("[data-indicator]");
const genbtn = document.querySelector("[generateBtn]");

const allCheck = document.querySelectorAll("input[type=checkbox]"); //to select all the checkboxes in our webpage at the same time

const symbols = '~`!@#$%^&*()_-+={[]}:;"<,>.?/';


let password = "";
let passwordLength = 5;

let checkcount = 0;
handleSlider();





//set strength circle color to grey
setIndicator("#E5E4E2");


//sets the color for indicator
function setIndicator(color)
{
    indicator.style.backgroundColor = color;

    //shadow

    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`

    console.log("Color setted !!")
}

//sets the length of password
function handleSlider()
{
    inputSlider.value = passwordLength;
    lenDisplay.innerHTML = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

    console.log("Handling happened !!")
}


//random number generator
function getRandom(min,max)
{
    return Math.floor(Math.random()*(max - min + 1) + min);
}

function generateRandomNumber()
{
    return getRandom(0,9);
}

//generates random lower case
function generateLowercase()
{
    return String.fromCharCode(getRandom(97,122));
}

//generates random upper case
function generateUppercase()

{
    return String.fromCharCode(getRandom(65,90));
}

//generates random symbols
function generateSymbols()
{
    index = getRandom(0,symbols.length-1);
    return symbols[index];
}

// Calculates strength and show it with color through setIndicator
function calStrength()
{
    let hasUpper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked){hasUpper = true;}

    if(lowercaseCheck.checked){haslower = true;}

    if(numCheck.checked){hasnum = true;}

    if(symbCheck.checked){hasSym = true;}

    if(passwordLength >= 6 && (hasNum || hasSym) && hasUpper && haslower)
    {
        setIndicator("#0f0");
    }
    else if((hasUpper || haslower) && (hasnum || hasSym) && passwordLength >= 4)
    {
        setIndicator("#ff0");
    }
    else
    {
        setIndicator("#f00");
    }
}

//Copy to clipboard
async function copy()
{
    try
    {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e)
    {
        copyMsg.innerText = "Failed !!";
    }


    //to make copy wala span visible
    // copyMsg.classList.add("active");

    // setTimeout(() =>{
    //     copyMsg.classList.remove("active");
    // },2000);

    // console.log("Copied happened !!")
}
//event listner on all of the checkboxes through for each loop
allCheck.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

//count for checked boxes
function handleCheckBoxChange()
{
    checkcount = 0;
    allCheck.forEach((checkbox) => {
        if(checkbox.checked)
        {
            checkcount++;
        }
    })

    //corner condition
    if(passwordLength < checkcount)
    {
        passwordLength = checkcount;
        handleSlider();
    }
}

//updates the length of password length inputed through slider
inputSlider.addEventListener("input",(e) => {
    passwordLength = e.target.value;
    handleSlider();

    console.log("Sliding Happened !!");
})

//copy
copyBtn.addEventListener('click',() => {
    if(passwordDisplay)
    {
        console.log("Working !!")
        copy();
    }
})

function shufflePassword(array)
{
    //fisher Yates Method
    for(let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random()*(i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    for(let i = 0; i < array.length; i++)
    {
        str += array[i];
    }
    return str;
}

genbtn.addEventListener('click',() => {

    console.log("Generate Button Pressed !!");
    if(checkcount == 0)
    {
        console.log("Please check at least one of checkbox !!");
        return
    }

    if(passwordLength < checkcount)
    {
        passwordLength = checkcount;
        handleSlider();
    }

        //Starting to generate a new password

        //first let's remove the old password

        password = "";

        //let's find

        //let's first add what is checked by the checkboxes

        // if(hasNum.checked)
        // {
        //     password += generateRandomNumber();
        // }
        // if(hasUpper.checked)
        // {
        //     password += generateUppercase();
        // }
        // if(haslower.checked)
        // {
        //     password += generateLowercase();
        // }
        // if(hasSym.checked)
        // {
        //     password += generateSymbols();
        // }


        //corner condition
        if(passwordLength < checkcount)
        {
            passwordLength = checkcount;
            handleSlider();
        }
        

        let funArr = [];

        if(uppercaseCheck.checked)
        {
            funArr.push(generateUppercase);
        }
        if(numCheck.checked)
        {
            funArr.push(generateRandomNumber);
        }
        if(lowercaseCheck.checked)
        {
            funArr.push(generateLowercase);
        }
        if(symbCheck.checked)
        {
            funArr.push(generateSymbols);
        }

        //compulsory addition
        for(let i = 0; i < funArr.length; i++)
        {
            password += funArr[i]();
        }
        console.log("Compulsory Addition Done !!")

        //remaining addition
        if(passwordLength != checkcount)
        {
            for(let i = 0; i < passwordLength-checkcount; i++)
            {
                let ranIndex = getRandom(0,funArr.length-1);

                console.log("Random Index " + ranIndex);

                password += funArr[ranIndex]();
                
            }
        }
        console.log("Remaining Addition happened !!")


        //let's shuffle the password
        password = shufflePassword(Array.from(password));
        


        passwordDisplay.value = password;

        // now calculate the strength
        calStrength();


        return
    
})