export const moneyFormat = money => {
    const intl = new Intl.NumberFormat("en-US", {
        currency: "IDR",
        style: "currency",
        minimumFractionDigits: 0

    })
    return intl.format(money)
}