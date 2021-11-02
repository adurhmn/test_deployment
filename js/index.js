class findDaysBetweenDates {
  constructor (startDay, startMonth, startYear, endDay, endMonth, endYear) {
    this.startDay = startDay
    this.startMonth = startMonth
    this.startYear = startYear
    this.endDay = endDay
    this.endMonth = endMonth
    this.endYear = endYear
  }

  calculateDaysBetweenDates() {
    const nonLeapDays = 365
    const leapDays = 366
    let totalDays = 0
    if (this.startYear === this.endYear) {
      totalDays = (this.remainingDays(this.startDay, this.startMonth, this.startYear) - this.remainingDays(this.endDay, this.endMonth, this.endYear)) + 1
    } else {
        for (let year=this.startYear; year<=this.endYear; year++) {
          if (year === this.startYear) {
              totalDays += this.remainingDays(this.startDay, this.startMonth, this.startYear)
          } else if (year === this.endYear) {
              totalDays += this.remainingDays(this.endDay, this.endMonth, this.endYear, 'backward')
          } else {
              if (this.isLeap(year)) {totalDays += leapDays}
              else {totalDays += nonLeapDays}
          }
        }
    }

    return totalDays
  }

  remainingDays (day, month, year, countDirection='forward') {
    //Finds no.of.days present between the given date(d/m/y) and
    //the end(start if count_direction == "backward") of the year

    let days = 0
    if (countDirection === 'forward') {
      for (let currentMonth=month; currentMonth<=12; currentMonth++) {
        let currentMonthDays = this.getNoOfDaysOf(currentMonth, year)
        if (currentMonth === month) {
          days += (currentMonthDays - (day - 1)) //reduction of extra 1 is to include the starting day also!
        } else {
          days += currentMonthDays
        }
      }
    } else if (countDirection === 'backward') {
      for (let currentMonth=month; currentMonth>=1; currentMonth--) {
        let currentMonthDays = this.getNoOfDaysOf(currentMonth, year)
        if (currentMonth == month) {
          days += day
        } else {
          days += currentMonthDays
        }
      }
    }

    return days

  }

  isLeap (year) {
    if (year%4 === 0) {
      if (year%100 === 0) {
        if (year%400 === 0) {
          return true
        }
        return false
      }
      return true
    }
    return false
  }

  getNoOfDaysOf (month, year) {
    const daysMap = {
      1: 31, //january
      2: undefined, //february
      3: 31, //march
      4: 30, //april
      5: 31, //may
      6: 30, //june
      7: 31, //july
      8: 31, //august
      9: 30, //september
      10: 31, //october
      11: 30, //november
      12: 31, //december
    }

    if (this.isLeap(year)) {
      daysMap[2] = 29
    } else {
      daysMap[2] = 28
    }
    return daysMap[month]
  }

}

class findDatePastDays {
  constructor (day, month, year, daysToPass) {
    this.day =  day
    this.month = month
    this.year = year
    this.nonLeapDays = 365
    this.daysToPass = daysToPass
  }

  getNoOfDaysOf (month, year) {
    const daysMap = {
      1: 31, //january
      2: undefined, //february
      3: 31, //march
      4: 30, //april
      5: 31, //may
      6: 30, //june
      7: 31, //july
      8: 31, //august
      9: 30, //september
      10: 31, //october
      11: 30, //november
      12: 31, //december
    }

    if (this.isLeap(year)) {
      daysMap[2] = 29
    } else {
      daysMap[2] = 28
    }
    return daysMap[month]
  }

  isLeap (year) {
    if (year%4 === 0) {
      if (year%100 === 0) {
        if (year%400 === 0) {
          return true
        }
        return false
      }
      return true
    }
    return false
  }

  forwardOneYear () {
    this.year += 1
    this.daysToPass -= this.nonLeapDays
  }

  rewindOneYear () {
    this.year -= 1
    this.daysToPass += this.nonLeapDays
  }

  sortMonths({startMonth=undefined, order='forward'} = {}) {
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let startMonthInd = months.indexOf(startMonth)
    let sortedMonths = []
    if (order === 'forward') {
      sortedMonths = months.slice(startMonthInd,).concat(months.slice(0,startMonthInd))
    } else if (order === 'rewind') {
      sortedMonths = months.slice(0,startMonthInd+1).reverse().concat(months.slice(startMonthInd+1,).reverse())
    }
    return sortedMonths
  }

  setDate ({day=undefined, month=undefined, year=undefined} = {}) {
    if (day !== undefined) {this.day = day}
    if (month !== undefined) {this.month = month}
    if (year !== undefined) {this.year = year}
  }


  setYearIfChanges ({month=undefined, condition='forward'} = {}) {
    if (condition === 'forward') {
      let months = this.sortMonths({startMonth:month, order:'forward'})
      if (months[1] === 1) {
        this.setDate({year:this.year+1})
      }
    } else if (condition === 'rewind') {
      let months = this.sortMonths({startMonth:month, order:'rewind'})
      if (months[1] === 12) {
        this.setDate({year:this.year-1})
      }
    }
  }

  filterOutYears () {
    //This function reduces days to pass by filtering out years.
    //Only the years are filtered if they are whole. The remaining days/months will not be filtered here
    if (this.daysToPass >= this.nonLeapDays) {
      let totalYears = Math.floor(this.daysToPass/this.nonLeapDays)
      let leapYearInterruption = 0

      // Implementing principle for first year (checks if first year has any leap interruption; passes starting year) (starting year)1999>>>>>(middle years)>>>>>2010(last year)
      if (this.isLeap(this.year) && this.month <= 2) {
        leapYearInterruption += 1
      }
      this.forwardOneYear()
      totalYears -= 1

      // Implementing principles for middle years (checks if middle year has any leap interruption; passes one year per iteration) (this loop doesn't check if the final year is leap; it just gets to the final year; but it checks if years before final are leap)
      for (let i=0; i<totalYears; i++) {
        if (this.isLeap(this.year)) {
          leapYearInterruption += 1
        }
        this.forwardOneYear()
      }

      // Implementing principles for last year (checks if final year has any leap interruption)
      if (this.isLeap(this.year) && this.month >= 3) {
        leapYearInterruption += 1
      }

      this.daysToPass -= leapYearInterruption
    } else if (this.daysToPass <= -(this.nonLeapDays)) {
        let totalYears = Math.floor(Math.abs(this.daysToPass) / this.nonLeapDays)
        let leapYearInterruption = 0

        // Implementing principle for last year year (checks if last year has any leap interruption; passes last year)   (starting year)1999<<<<<<(middle years)<<<<<<2010(last year)
        if (this.isLeap(this.year) && this.month >= 3) {
          leapYearInterruption += 1
        }
        this.rewindOneYear()
        totalYears -= 1

        // Implementing principles for middle years (checks if middle year has any leap interruption; passes one year per iteration) (this loop doesn't check if the first(final) year is leap; it just gets to the first(final) year; but it checks if years before after are leap)
        for (let i=0; i<totalYears; i++) {
          if (this.isLeap(this.year)) {
            leapYearInterruption += 1
          }
          this.rewindOneYear()
        }

        // Implementing principles for first year (checks if first(final) year has any leap interruption)
        if (this.isLeap(this.year) && this.month <= 2) {
          leapYearInterruption += 1
        }

        this.daysToPass += leapYearInterruption

    }
  }

  calculateDate() {
    // # FILTER OUT YEARS----
    if (this.daysToPass >= this.nonLeapDays || this.daysToPass <= -(this.nonLeapDays)){
      this.filterOutYears()
    }

    if (this.daysToPass > 0) { // if positive, increase date with days_to_pass
      //  FILTER OUT MONTHS AND CALCULATE THE DATE----
      // the days_to_pass value is increased by the current day value since the algorithm considers that the first month starts from 0 and not the current day.
      this.daysToPass += this.day
      let sortedMonths = this.sortMonths({startMonth:this.month, order:'forward'})

      for (let i=0; i<12; i++) {
        let currentMonth = sortedMonths[i]
        let monthDays = this.getNoOfDaysOf(currentMonth, this.year)

        if (this.daysToPass - monthDays > 0) {
          // if days_to_pass is greater than month_days, then answer date not in this month, so moving to next month without any changes in the date(no real-time changes) except if the month goes to next year.
          this.daysToPass -= monthDays
          // if next month starts from next year, then change year.
          this.setYearIfChanges({month: currentMonth, condition: 'forward'})
        } else if (this.daysToPass - monthDays <= 0) {
          // if days_to_pass is lesser than(or equal to) the month_days, then current month is the answer month and days_to_pass is the answer day.
          this.setDate({day:this.daysToPass, month:currentMonth})
          break
        }
      }
    } else if (this.daysToPass < 0) {// if negative, decrease date with days_to_pass
      // FILTER OUT MONTHS AND CALCULATE THE DATE----
      // the days_to_pass value is increased by the remaining days of the month since the algorithm considers that the first month starts from its last day and not the current day.
      this.daysToPass = Math.abs(this.daysToPass)
      this.daysToPass += (this.getNoOfDaysOf(this.month, this.year) - this.day)
      let sortedMonths = this.sortMonths({startMonth:this.month, order:'rewind'})

      for (let i=0; i<12; i++) {
        let currentMonth = sortedMonths[i]
        let monthDays = this.getNoOfDaysOf(currentMonth, this.year)

        if (this.daysToPass - monthDays >= 0) {
          // if days_to_pass is greater than month_days, then answer date not in this month, so moving to next month without any changes in the date(no real-time changes) except if the month goes to next year.
          this.daysToPass -= monthDays
          // if next month starts from next year, then change year.
          this.setYearIfChanges({month: currentMonth, condition: 'rewind'})
        } else if (this.daysToPass - monthDays < 0) {
          // if days_to_pass is lesser than the month_days, then current month is the answer month and month_days - days_to_pass is the answer day.
          this.setDate({day:monthDays - this.daysToPass, month:currentMonth})
          break
        }
      }
    }
    return `${this.day}-${this.month}-${this.year}`
  }
}

// class validateInputDates () {
//   constructor ({startDay=undefined, startMonth=undefined, startYear=undefined, endDay=undefined, endMonth=undefined, endYear=undefined} = {}) {
//     this.startDay = startDay;
//     this.startMonth = startMonth;
//     this.startYear = startYear;
//     this.endDay = endDay;
//     this.endMonth = endMonth;
//     this.endYear = endYear;
//   }
//
//   validateCase1 () { //if both startdate and enddate is provided
//     if (this.startDay> this.getNoOfDaysOf(this.startMonth, this.startYear) || this.endDay > this.getNoOfDaysOf(this.endMonth, this.endYear)) {
//       console.log("Date is wrong! Day value doesn't correspond to the month value")
//     }
//
//     if (this.startYear >  this.endYear) {
//       console.log("Start date must be lower than end date")
//     } else if (this.startYear === this.endYear){
//         if (this.startMonth > this.endMonth) {
//           console.log("Start date must be lower than end date")
//         } else if (this.startMonth === this.endMonth) {
//           if (this.startDay > this.endDay) {
//             console.log("Start date must be lower than end date")
//           }
//         }
//     }
//   }
//
//   validateCase2 () { //if only the startdate is provided
//     if (this.startDay> this.getNoOfDaysOf(this.startMonth, this.startYear)) {
//       console.log("Date is wrong! Day value doesn't correspond to the month value")
//     }
//   }
//
//   getNoOfDaysOf (month, year) {
//     const daysMap = {
//       1: 31, //january
//       2: undefined, //february
//       3: 31, //march
//       4: 30, //april
//       5: 31, //may
//       6: 30, //june
//       7: 31, //july
//       8: 31, //august
//       9: 30, //september
//       10: 31, //october
//       11: 30, //november
//       12: 31, //december
//     }
//
//     if (this.isLeap(year)) {
//       daysMap[2] = 29
//     } else {
//       daysMap[2] = 28
//     }
//     return daysMap[month]
//   }
//
//   isLeap (year) {
//     if (year%4 === 0) {
//       if (year%100 === 0) {
//         if (year%400 === 0) {
//           return true
//         }
//         return false
//       }
//       return true
//     }
//     return false
//   }
//
// }
// //initiating default dates-----------------------------------------------------------------
// let today = new Date()
// let dd = String(today.getDate()).padStart(2, '0')
// let mm = String(today.getMonth() + 1).padStart(2, '0')
// let yyyy = String(today.getFullYear())
// $('#from-date-left, #to-date-left, #from-date-right').attr('value', `${yyyy}-${mm}-${dd}`)
//
// //listening to calculate buttons ----------------------------------------------------------
// //left-section
// // $('.calculate-btn.left').click(function () {
// //   let fromDateLeft = $('#from-date-left').val()
// //   let toDateLeft = $('#to-date-left').val()
// //   $('.result-container.left').addClass('changed')
// //   let daysCalc = new findDaysBetweenDates(fromDateLeft, toDateLeft)
// //   $('.result.left').text(`${daysCalc.calculateDaysBetweenDates()} Days`)
// //   setTimeout(function () {$('.result-container.left').removeClass('changed')}, 150)
// // })
// //
// // //right-section
// // $('.calculate-btn.right').click(function () {
// //   let fromDateRight = $('#from-date-right').val()
// //   let daysToPass = $('#days-to-pass').val()
// //   $('.result-container.right').addClass('changed')
// //   let daysCalc = new findDatePastDays(fromDateRight, daysToPass)
// //   $('.result.right').text(daysCalc.calculateDate())
// //   setTimeout(function () {$('.result-container.right').removeClass('changed')}, 150)
// // })
// $('.calculate-btn.left').click(function () {
//   let
// })
//
// //validating input values by adding event listeners-------------------------------------------------
// // let inputStates = {
// //   'from-date-left': true,
// //   'to-date-left': true,
// //   'from-date-right': true,
// //   'days-to-pass': true
// // }
//
// //left section validation
// // $('#from-date-left, #to-date-left').on('keyup focusout click', function (){
// //   const $warningElement = $(`.${$(this).attr('id')}-warning`)
// //   const $buttonLeft = $('.calculate-btn.left')
// //
// //   if (isNaN($(this)[0].valueAsNumber)) {
// //     //adding 'incorrect date' warning
// //     inputStates[$(this).attr('id')] = false;
// //     $warningElement.text('Date is incorrect!')
// //     $warningElement.addClass('warning')
// //   } else {
// //     //removing 'incorrect date' warning
// //     inputStates[$(this).attr('id')] = true;
// //     $warningElement.text('')
// //     $warningElement.removeClass('warning')
// //   }
// //
// //   if (inputStates['from-date-left'] && inputStates['to-date-left']) {
// //     if ($('#from-date-left')[0].valueAsNumber <= $('#to-date-left')[0].valueAsNumber) {
// //       //if both dates on left section are correct and also the startdate is lower than enddate,
// //           //then remove all previous warnings and reenable button
// //       //removing 'incorrect date' warning
// //       $warningElement.text('')
// //       $warningElement.removeClass('warning')
// //       //removing 'startdate greater than enddate' warning
// //       $('.from-date-left-warning').text('')
// //       $('.from-date-left-warning').removeClass('warning')
// //       //re-enabling button
// //       $buttonLeft.prop('disabled', false)
// //       $buttonLeft.removeClass('disabled')
// //     } else {
// //       //if both dates on left section are correct but the startdate is higher than enddate,
// //           //then remove all 'incorrect date' warning and add 'startdate higher than enddate' warning
// //       //adding 'startdate greater than enddate' warning
// //       $('.from-date-left-warning').text('(Start date cannot be higher than end date)')
// //       $('.from-date-left-warning').addClass('warning')
// //       //disabling button
// //       $buttonLeft.prop('disabled', true)
// //       $buttonLeft.addClass('disabled')
// //     }
// //   } else {
// //     //if any of the date in left section is incorrect,
// //         //add 'incorrect date' warning and disable button (warning added above)
// //     $buttonLeft.prop('disabled', true)
// //     $buttonLeft.addClass('disabled')
// //   }
// // })
//
// //right section validation
// $('#days-to-pass, #from-date-right').on('keyup click focusout', function () {
//   const $warningElement = $(`.${$(this).attr('id')}-warning`)
//   const $buttonRight = $('.calculate-btn.right')
//   const inputValue = ($(this)[0].valueAsNumber)
//   const clickedElementId = $(this).attr('id')
//
//   if (
//     (clickedElementId === 'from-date-right' && isNaN(inputValue))
//     || (clickedElementId === 'days-to-pass' && (inputValue > 5000 || inputValue < -5000))) {
//     inputStates[clickedElementId] = false
//     if (clickedElementId === 'from-date-right') {$warningElement.text('Date is incorrect!')}
//     else ($warningElement.text('(Range: -5000 to 5000)'))
//     $warningElement.addClass('warning')
//
//   } else if (
//     (clickedElementId === 'from-date-right' && !isNaN(inputValue))
//     || (clickedElementId === 'days-to-pass' && (inputValue <= 5000 || inputValue >= -5000))) {
//     inputStates[clickedElementId] = true
//     $warningElement.text('')
//     $warningElement.removeClass('warning')
//   }
//
//   if (inputStates['from-date-right'] && inputStates['days-to-pass']) {
//     $buttonRight.prop('disabled', false)
//     $buttonRight.removeClass('disabled')
//   } else {
//     $buttonRight.prop('disabled', true)
//     $buttonRight.addClass('disabled')
//   }
// })
//
// //listening to info butt
// $('.info-btn.left').click(function () {
//   $('.section-container.left *:not(:first-child)').toggleClass('hidden')
// })
//
// $('.info-btn.right').click(function () {
//   $('.section-container.right *:not(:first-child)').toggleClass('hidden')
// })


class validateInputDates {
  constructor ({startDay=undefined, startMonth=undefined, startYear=undefined, endDay=undefined, endMonth=undefined, endYear=undefined, validationCase=undefined} = {}) {
    this.startDay = startDay;
    this.startMonth = startMonth;
    this.startYear = startYear;
    this.endDay = endDay;
    this.endMonth = endMonth;
    this.endYear = endYear;
    this.validationCase = validationCase;
  }

  validateCase1 () { //if only the startdate is provided (for date after days)
    if (this.startDay> this.getNoOfDaysOf(this.startMonth, this.startYear)) {
      return [false, "Day value is wrong"]
    }
    return [true, '']
  }

  validateCase2 () { //if both startdate and enddate is provided (for days between dates)
    if (this.startDay > this.getNoOfDaysOf(this.startMonth, this.startYear) || this.endDay > this.getNoOfDaysOf(this.endMonth, this.endYear)) {
      return [false, "Day value is wrong"]
    }

    if (this.startYear >  this.endYear) {
      return [false, "Start date must be lower than end date"]
    } else if (this.startYear === this.endYear){
        if (this.startMonth > this.endMonth) {
          return [false, "Start date must be lower than end date"]
        } else if (this.startMonth === this.endMonth) {
          if (this.startDay > this.endDay) {
            return [false, "Start date must be lower than end date"]
          }
        }
    }
    console.log('level2 validation passed for case 2')
    return [true, '']
  }

  getNoOfDaysOf (month, year) {
    const daysMap = {
      1: 31, //january
      2: undefined, //february
      3: 31, //march
      4: 30, //april
      5: 31, //may
      6: 30, //june
      7: 31, //july
      8: 31, //august
      9: 30, //september
      10: 31, //october
      11: 30, //november
      12: 31, //december
    }

    if (this.isLeap(year)) {
      daysMap[2] = 29
    } else {
      daysMap[2] = 28
    }
    return daysMap[month]
  }

  isLeap (year) {
    if (year%4 === 0) {
      if (year%100 === 0) {
        if (year%400 === 0) {
          return true
        }
        return false
      }
      return true
    }
    return false
  }

}

$('.daysbetweendates .find-btn').on('click', function () {
  let startDay = Number($('.daysbetweendates .start-day').val())
  let startMonth = Number($('.daysbetweendates .start-month').val())
  let startYear = Number($('.daysbetweendates .start-year').val())
  let endDay = Number($('.end-day').val())
  let endMonth = Number($('.end-month').val())
  let endYear = Number($('.end-year').val())

  dateProvided = false

  if (((0 < startDay && startDay <= 31) && (0 < startMonth && startMonth <= 12) && (0 < startYear))
        && ((0 < endDay && endDay <= 31) && (0 < endMonth && endMonth <= 12) && (0 < endYear))) {

    if (startYear > 999999 || endYear > 999999) {
      $(".daysbetweendates .warning").text("Year must be lower than '999999'")
    } else {
      dateProvided = true
      $(".daysbetweendates .warning").text('')
    }
  } else {
    // display warning at start date
    $(".daysbetweendates .warning").text('Provide proper dates!')
  }



  if (dateProvided) {
    let validation = new validateInputDates({startDay: startDay, startMonth: startMonth, startYear: startYear, endDay: endDay, endMonth: endMonth, endYear: endYear, validationCase: '2'})
    validation = validation.validateCase2()
    if (validation[0]) {
      const dateCalc = new findDaysBetweenDates(startDay, startMonth, startYear, endDay, endMonth, endYear)
      $('.daysbetweendates .result').text(`${dateCalc.calculateDaysBetweenDates()} Days`)
    } else {
      $('.daysbetweendates .warning').text(validation[1])
    }
  }
})

$('.datepastdays .find-btn').on('click', function () {
  let startDay = Number($('.datepastdays .start-day').val())
  let startMonth = Number($('.datepastdays .start-month').val())
  let startYear = Number($('.datepastdays .start-year').val())
  let daysToPass = Number($('.datepastdays .days-to-pass').val())

  dateProvided = false

  if ((0 < startDay && startDay <= 31) && (0 < startMonth && startMonth <= 12) && (0 < startYear)) {

    if (startYear > 999999) {
      $(".datepastdays .warning").text("Year must be lower than '999999'")
    } else {
      if (daysToPass < -999999 || daysToPass > 999999) {
        $(".datepastdays .warning").text("Days To Pass Limit '-999999 to 999999'")
      } else {
        dateProvided = true
        $(".datepastdays .warning").text('')
      }
    }
  } else {
    // display warning at start date
    $(".datepastdays .warning").text('Provide proper date!')
  }

  if (dateProvided) {
    var validate = new validateInputDates({startDay: startDay, startMonth: startMonth, startYear: startYear, validationCase: '1'})
    validate = validate.validateCase1()
    if (validate[0]) {
      const dateCalc = new findDatePastDays(startDay, startMonth, startYear, daysToPass)
      $('.datepastdays .result').text(dateCalc.calculateDate())
    } else {
      $('.datepastdays .warning').text(validate[1])
    }
  }

})
