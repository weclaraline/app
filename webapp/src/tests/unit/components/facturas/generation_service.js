import faker from "faker";

const generateRecommendations = (quantity) => {
    let recommendations = []
    for( let i = 0; i < quantity; i++) {
        recommendations.push({
            description: faker.lorem.words(4),
        })
    }
    return recommendations;
}
export const generateDeductibleTypesAndRecommendations = (quantity) => {
    let deductionTypes= [];
    for( let i = 0; i < quantity; i++){
        deductionTypes.push({
            key: faker.random.uuid,
            tipo_deduccion: faker.lorem.words(2),
            recomendaciones: generateRecommendations(Math.floor(Math.random * 5) + 1 ),
        })
    }
    return deductionTypes;
};
