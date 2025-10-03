export class Key {
  constructor(date, mood) {
    this.date = date;
    this.mood = mood;
  }
}
//builds default HashMap for 2025
export class HashMap {
  constructor(yearNum) {
    this.array = [];
    const year = {
      year: yearNum, // Name des Arrays
      date: [], // Das eigentliche Array
    };
    this.array.push(year);
    for (let i = 0; i < 12; i++) {
      let months = [];
      year.date.push(months);
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
    localStorage.setItem("hashMap", this.toJSON());
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
    console.log(todayString);
    const dayAlreadyThere = yearArray.date[checkMonth - 1].find(
      (obj) => obj.date === todayString,
    );
    console.log(dayAlreadyThere);
    if (dayAlreadyThere != undefined) {
      console.log("yo");
      dayAlreadyThere.mood = mood;
    } else {
      yearArray.date[checkMonth - 1].push(key);
    }
  }
  //generates a variable that contains today's date
  dateGenerator() {
    const todayString = new Date().toLocaleDateString();
    return todayString;
  }
  toJSON() {
    return JSON.stringify(this.array);
  }
  static fromJSON(jsonStr) {
    const parsed = JSON.parse(jsonStr);
    const newHash = new HashMap();
    newHash.array = parsed;
    return newHash;
  }
}
