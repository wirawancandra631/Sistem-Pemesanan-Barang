export const getDateNow = () => {
    const DateClass = new Date();
    const Year = DateClass.getFullYear()
    const Month = (DateClass.getMonth() + 1 < 10) ? `0${DateClass.getMonth() + 1}` : DateClass.getMonth() + 1
    const Day = DateClass.getDate()
    return `${Year}-${Month}-${Day}`
}