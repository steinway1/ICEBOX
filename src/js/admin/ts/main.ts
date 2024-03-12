/**
 * 
 * BASIC 
 * Variables
 * Types of values
 * 
 */

type stumber = string | number
type nulified = null | undefined
type booNulified = boolean | nulified
type stringNull = string | null
type fiveOrSixOrSeven = 5 | 6 | 7

let str1: string = 'Hello'
let num1: number = 10
let boo1: boolean = true
let arr1: string[] = ['a', 'b', 'c']
let arr2: Array<boolean | number> = [true, false, true]
let arr3: number[] = [1, 2, 3, 4, 5]
let anyVar: any
let anyArr: any[]
let anyObj: any = {}
let numOrString: stumber
let booNullUndefined: booNulified
let fiveSixSeven: fiveOrSixOrSeven
let tuple: [string, number] = ['John', 30]
let readTuple: readonly [string, number] = ['Daniel', 24]
let flexTuple: [number, number?, boolean?] = [5, 5] //? means optional
let stringNumberArr: [string, ...number[]] // spread

let user1: [string, number] = ['Woodie', 10] // tuple
let [userName, userAge] = user1 // destructuring & get userName & userAge variables

numOrString = 5
numOrString = 'numOrString'

tuple = ['Alice', 18]

stringNumberArr = ['John', 5, 4, 3, 2, 1]

let user = {
  name: 'John',
  age: 30,
  is_active: false
}

let getDateFunc = {
  year: () => { return new Date().getFullYear() },
  get currentYear(): number | string {
    return this.year() + ' year'
  }
}

const funcNum = (num: number = 5, num2: number = 6) => {
  console.log(num + num2)
}

function funcNum2(num: number = 5, num2: number = 6): number {
  return num + num2
}

const funcNum3 = (num: number = 5, num2: number = 6): number => {
  return num + num2
}

const funcVoid = (): void => {
  console.log('Void function')
}


/**
 * 
 * Enumerations
 * 
 */

enum Seasons { Winter, Spring, Summer, Fall }
enum SeasonsFromOne { Summer = -1, Fall, Winter, Spring } // all the rest will be +1
enum SeasonsWithText { Summer = 'Summer', Fall = 'Fall', Winter = 'Winter', Spring = 'Spring' }
enum Weekdays { Monday, Tuesday, Wedsnsday }

let currentSeason: string = Seasons[0]
let currentSeasonNum: number = Seasons.Winter
let current: Seasons = 1
let current2: string = SeasonsFromOne[1]
let current3: string = SeasonsWithText.Winter


/**
 * 
 *  Different types
 * 
 */

let smpDate: Date = new Date(2025, 3, 25)
let smpRegExp: RegExp = /^[a-z]{2,3}$/
let smpElement: HTMLElement | null = document.querySelector('[data-evt="goCRM"]')
let smpCardElements: Array<HTMLElement> = Array.from(document.querySelectorAll('[data-evt="cardGoCRM"]'))
let smpArrNode: NodeList = document.querySelectorAll('[data-evt="cardGoCRM"]')



/**
 * 
 * Interfaces
 * 
 */

interface Client {
  name: string
  ageInterval?: number[]
  city: City
}

interface City {
  name: string,
  populartionInterval?: number[]
}

let client: Client = { name: 'David', ageInterval: [20, 30], city: { name: 'Berlin' } }

let clientArr: Client[] = []
clientArr.push(
  { name: 'John', ageInterval: [15, 30], city: { name: 'Paris' } },
  { name: 'John', ageInterval: [15, 30], city: { name: 'Paris' } }
)


/**
 * 
 * 
 * Functions
 * 
 */


const getClienFulltName = (name: string, surname: string) => {
  return `${name} ${surname}`
}

const getClientCity = (name: string, city?: string) => {
  return city ? `${name} lives in ${city}` : `${name} lives`
}

const getArrayOfNumber = (...num: number[]) => {
  return num
}

let numOrNull: number | null = 50

const repeat = (str: string, multiply: number = 2): string => {
  return str.repeat(multiply)
}

let cardNumber: string = '2200582799210129'

const getHiddenCard = (cardString: string, numOfStars: number = 4): string => {
  return `*`.repeat(numOfStars) + `${cardString.slice(-4)}`
}

const strArr: string[] = ['Sandy', 'Kate', 'Alice']
const numArr: number[] = [1, 7, 8, 2, 5, 4, 24, 58, 14, 9, 11]

const toUpper = (text: string): string => { return text.toUpperCase() }
const getEvenNumbers = (arr: number[]): number[] => {
  return arr.filter(num => num % 2 === 0)
}


const findAverage = (acc: number, item: number, index: number, arr: any[]): number => {
  const sum: number = acc + item
  if (index === arr.length - 1) return sum / arr.length
  return sum
}


numArr.reduce((acc, item, index, arr) => {
  const sum: number = acc + item
  if (index === arr.length - 1) return sum / arr.length
  return sum
}, 0)

const bankAccounts = [
  { id: "123", amount: 19 },
  { id: "345", amount: 33 },
  { id: "567", amount: 4 },
  { id: "789", amount: 20 },
]

const totalAmout = bankAccounts.reduce(function(sum, currentAmount) {
  return sum + currentAmount.amount
}, 0)