const nextBillingDate = async (req, res) => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    return oneMonthFromNow;
}

module.exports = {nextBillingDate};