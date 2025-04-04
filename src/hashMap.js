export class Key {
  constructor(date, mood) {
    this.date = date;
    this.mood = mood;
  }
}
//builds default HashMap for 2025
export class HashMap {
  constructor() {
    this.array = [];
    this.year = {
      year: "2025", // Name des Arrays
      date: [], // Das eigentliche Array
    };
    this.array.push(this.year);
    for (let i = 0; i < 12; i++) {
      let months = [];
      this.year.date.push(months);
    }
  }
  //turns date into a (easy)hashCode
  hash(date) {
    let yearStr = date.slice(-4);
    let firstLastCommaIndex = date.lastIndexOf("."); //
    let secondLastCommaIndex = date.lastIndexOf(".", firstLastCommaIndex - 1);
    let month = date.slice(secondLastCommaIndex + 1, firstLastCommaIndex);
    this.hashCode = yearStr + month;
    return this.hashCode;
  }
  //implements new day
  set(mood) {
    let todayString = this.dateGenerator();
    const newKey = new Key(todayString, mood);
    this.hash(todayString);
    this.manageCapacity(this.hashCode);
    this.pushKey(this.hashCode, newKey, todayString, mood);
    return this.hashCode;
  }
  //checks if the current year is present - and if not, creates it
  manageCapacity(hash) {
    const checkYear = hash.slice(0, 4);
    const yearArray = this.array.find((obj) => obj.year === checkYear);
    if (yearArray === undefined) {
      const newYear = {
        year: checkYear,
        date: [],
      };
      for (let i = 0; i < 12; i++) {
        const months = [];
        newYear.date.push(months);
      }
      this.array.push(newYear);
    }
  }
  //pushes the new key into the destinyArray
  pushKey(hash, key, todayString, mood) {
    const checkYear = hash.slice(0, 4);
    const checkMonth = hash.slice(4);
    const yearArray = this.array.find((obj) => obj.year === checkYear);
    const dayAlreadyThere = yearArray.date[checkMonth-1].find((obj) => obj.date === todayString);
    if(dayAlreadyThere!=undefined) {
      dayAlreadyThere.mood = mood;
    } else {
      yearArray.date[checkMonth-1].push(key);
    }
  }
  //generates a variable that contains today's date
  dateGenerator() {
    const todayString = new Date().toLocaleDateString();
    return todayString;
  }
}
