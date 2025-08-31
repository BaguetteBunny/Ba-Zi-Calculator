function conversionGregorianSexagenary(year) { // https://en.wikipedia.org/wiki/Sexagenary_cycle#Conversion_between_cyclic_years_and_Western_years
    let modifiedYear = 0;
    let discardedFraction = 0;

    if (year > 4) {
        modifiedYear = year - 3;
        discardedFraction = Math.floor(modifiedYear/60);
        return modifiedYear - (60 * discardedFraction);
    } else if (year < 1) {
        year = Math.abs(year);
        modifiedYear = year + 2;
        discardedFraction = Math.floor(modifiedYear/60);
        return 60 - (modifiedYear - (60 * discardedFraction));
    } else if (year === 1) {
        return 58;
    } else if (year === 2) {
        return 59;
    } else if (year === 3) {
        return 60;
    } else {
        throw "Something went wrong with converting Gregorian years to Sexagenary years. (How the fuck does this even happen???)";
    }
}

function yearlyElement(year){
    let i = 0
    if (year%2==0){
        i = (year+6)%10
    } 
    else {
        i = ((year+6)%10)-1
    }
    return i/2
}
function yearlyAnimal(year){
    return (year+8)%12
}
function cycleYear(a,e){
    if (a%2 == 0){
        if (a<=2*e) {j= 1} else {j= 61}
    }
    else{
        if (a<=2*e+1) {j= 7} else {j= 67}
    }
    return (12*e - 5*a + j)
}
function currentCycle(){
    let index = 0
    while (60*index<=year+2756){
        index++
    }
    return index-1
}
function dailyPillar(day,month,year){
    return Math.floor(5*(lastDigits(year)+1)+(lastDigits(year)+1)/4+15+daySinceJan1(day,month))
} 
function checkLeap(year){
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}
function lastDigits(year){
    if (parseInt(year.toString().substring(2)) < 10){return year.toString().substring(2)+100} else {year.toString().substring(2)}
}
function daySinceJan1(day, month){
    let total_days = 0
    for (let i = 0; i+1 < month; i++) {
        total_days += monthDays[i]
      }
    if (checkLeap(year) == true && total_days>31+28){
        total_days+1
    }
    return total_days+day
}
function monthlyAnimal(year,day,month){
    let days = daySinceJan1(day,month)
    console.log(days)
    if (checkLeap(year) == true){leapFactor = 1} else {leapFactor = 0}
    if (6<days && days<34){
        return 1
    } else if (35<days && days<64+leapFactor){
        return 2
    } else if (65<days && days<94+leapFactor){
        return 3
    }  else if (95<days && days<125+leapFactor){
        return 4
    }  else if (126<days && days<156+leapFactor){
        return 5
    }  else if (157<days && days<187+leapFactor){
        return 6
    }  else if (188<days && days<219+leapFactor){
        return 7
    }  else if (220<days && days<250+leapFactor){
        return 8
    }  else if (251<days && days<280+leapFactor){
        return 9
    }  else if (281<days && days<310+leapFactor){
        return 10
    }  else if (311<days && days<340+leapFactor){
        return 11
    }  else {
        return 0
    }
}
function monthlyElement(year,month){
    return ((yearlyElement(year) + (month - 1))+6)% 10 
}

const prompt = require("prompt-sync")()
let birthday = prompt('Your birthday in DD/MM/YYYY format.')
let hourminute = prompt('The time of birth in 00:00 format.')

const dateArray = birthday.split('/')
const hourArray = hourminute.split(':')
const day = parseInt(dateArray[0])
const month = parseInt(dateArray[1])
let year = parseInt(dateArray[2])
const hour = parseInt(hourArray[0])
const epoch = -2696

if (year < epoch){year = epoch}

const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water']
const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Sheep', 'Monkey', 'Rooster', 'Dog', 'Pig']
const hourly_animals_index = [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,0]

const heavenly_stem = ['Yang Wood', 'Yin Wood', 'Yang Fire', 'Yin Fire', 'Yang Earth', 'Yin Earth', 'Yang Metal', 'Yin Metal', 'Yang Water', 'Yin Water']
const earthly_branch = ['Early Rat', 'Ox', 'Ox', 'Tiger', 'Tiger', 'Rabbit', 'Rabbit', 'Dragon', 'Dragon', 'Snake', 'Snake', 'Horse', 'Horse', 'Sheep', 'Sheep', 'Monkey', 'Monkey', 'Rooster', 'Rooster', 'Dog', 'Dog', 'Pig', 'Pig', 'Late Rat']
const monthDays = [31,28,31,30,31,30,31,31,30,31,30,31]
const hour_stem_table = [
    ["Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water"],  // Zi (Rat)
    ["Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water"],  // Chou (Ox)
    ["Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood"],  // Yin (Tiger)
    ["Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood"],   // Mao (Rabbit)
    ["Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire"], // Chen (Dragon)
    ["Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire"],  // Si (Snake)
    ["Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth"], // Wu (Horse)
    ["Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth"],  // Wei (Goat)
    ["Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal"], // Shen (Monkey)
    ["Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal"],  // You (Rooster)
    ["Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water", "Yang Wood", "Yang Fire", "Yang Earth", "Yang Metal", "Yang Water"], // Xu (Dog)
    ["Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water",  "Yin Wood",  "Yin Fire",  "Yin Earth",  "Yin Metal",  "Yin Water"],  // Hai (Pig)
]

// YEARLY PILLAR
let yearly_element = elements[yearlyElement(year)] // Element for Yearly Pillar
let yearly_animal = animals[yearlyAnimal(year)] // Animal for Yearly Pillar

// MONTHLY PILLAR
let monthly_element = heavenly_stem[monthlyElement(year,month)] // Element for Yearly Pillar
let monthly_animal = animals[monthlyAnimal(year,day,month)] // Animal for Yearly Pillar

// DAILY PILLAR
let daily_element = heavenly_stem[dailyPillar(day,month,year)%10] // Element for Daily Pillar
let daily_animal = animals[(dailyPillar(day,month,year)-8)%12]

// HOURLY PILLAR
let hourly_element = hour_stem_table[hourly_animals_index[hour]][dailyPillar(day,month,year)%10] // Element for Hourly Pillar
let hourly_animal = earthly_branch[hour] // Animal for Hourly Pillar

let cycle_year = cycleYear(yearlyAnimal(year),yearlyElement(year)) // Check Cycle Year
let cycle = currentCycle() // Current nth Cycle

console.log('You were born in the '+cycle_year+'th year of the '+cycle+'th sexagonary cycle.')
console.log('')
console.log('Your pillars are:')
console.log('')
console.log('Yearly Pillar: '+yearly_element+' '+yearly_animal)
console.log('Monthly Pillar: '+monthly_element+' '+monthly_animal)
console.log('Daily Pillar: '+daily_element+' '+daily_animal)
console.log('Hourly Pillar: '+hourly_element+' '+hourly_animal)

