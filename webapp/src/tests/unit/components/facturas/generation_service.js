import faker from "faker";

export const generateRecommendations = (quantity) => {
    let recommendations = []
    for( let i = 0; i < quantity; i++) {
        recommendations.push({
            description: faker.lorem.words(4),
        })
    }
    return recommendations;
}

export const generateDeductibleTypesAndRecommendations = (quantity) => {
    let deductibleTypes= [];
    for( let i = 0; i < quantity; i++){
        deductibleTypes.push({
            key: faker.random.uuid,
            tipo_deduccion: faker.lorem.words(2),
            recomendaciones: generateRecommendations(Math.floor(Math.random * 5) + 1 ),
        })
    }
    return deductibleTypes;
};

export const generateFAQS = () => {
    return [1,2,3].map(id => ({
        id,
        question: 'a',
        answer: 'b'
    }));
}
export const generateEnlaces = () => {
    return [1,2,3].map(id => ({
        id,
        link: 'a',
        description: 'b'
    }));
}