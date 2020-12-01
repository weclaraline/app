const expensesLimitsModel = require("../../model/ExpensesLimits").ExpensesLimits;
const expensesLimitEntity = require("../../entity/ExpensesLimitsSchema");
const invoinceEntity = require("../../entity/InvoiceSchema");

const { getManager } = require("typeorm");

async function addExpenseLimit(concept, amount) {
    let expenseLimit = new expensesLimitsModel(concept, amount);
    return await getManager().getRepository(expensesLimitEntity).save(expenseLimit);
}

async function getExpensesLimits(id) {
    if(id) {
        return await getManager().getRepository(expensesLimitEntity).find({
            where: {
                id: id
            }
        });
    } else {
        return await getManager().getRepository(expensesLimitEntity).find();
    }
}

async function getExpensesLimitByConcept(concept) {
    return await getManager().getRepository(expensesLimitEntity).find({
        where: {
            concept: concept
        }
    });
}

async function getCurrentExpense(ownerId, concept) {
    return await getManager()
        .getRepository(invoinceEntity)
        .createQueryBuilder("invoice")
        .select("SUM(invoice.total)", "total")
        .where("invoice.ownerId = :ownerId", { ownerId })
        .andWhere("invoice.concept = :concept", { concept })
        .getRawOne(); 
}

module.exports = {
    addExpenseLimit,
    getExpensesLimits,
    getExpensesLimitByConcept, 
    getCurrentExpense
}