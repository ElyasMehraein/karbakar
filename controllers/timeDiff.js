// Define the two dates
const date1 = new Date('2022-01-01');
const date2 = new Date('2022-02-15');

// Calculate the time difference in milliseconds
function TimeDiff(date1, date2) {
    const timeDiff = Math.abs(date2 - date1);



    // Convert the time difference to the desired unit
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44); // Approximation
    const years = Math.floor(days / 365.25); // Approximation

    // Determine the appropriate unit based on the time difference
    let timeUnit;
    if (years > 0) {
        timeUnit = years === 1 ? 'year' : 'years';
    } else if (months > 0) {
        timeUnit = months === 1 ? 'month' : 'months';
    } else if (days > 0) {
        timeUnit = days === 1 ? 'day' : 'days';
    } else if (hours > 0) {
        timeUnit = hours === 1 ? 'hour' : 'hours';
    } else if (minutes > 0) {
        timeUnit = minutes === 1 ? 'minute' : 'minutes';
    } else {
        timeUnit = seconds === 1 ? 'second' : 'seconds';
    }

    // Output the time difference in the desired unit
    console.log(`The time difference is ${timeDiff} dd ${timeUnit}.`);
    return timeUnit

}



export default TimeDiff