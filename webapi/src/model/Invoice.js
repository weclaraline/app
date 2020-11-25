class Invoice {
    constructor(id, ownerId, date, concept, description, total, UUID, xml, analysisResult, commited) {
        this.id = id;
        this.ownerId = ownerId;
        this.date = date;
        this.concept = concept;
        this.description = description;
        this.total = total;
        this.UUID = UUID;
        this.xml = xml;
        this.analysisResult = analysisResult;
        this.commited = commited;
    }
}

module.exports = {
    Invoice: Invoice
};
