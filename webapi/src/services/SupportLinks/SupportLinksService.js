const supportLinksModel = require("../../model/SupportLinks").SupportLinks;
const supportLinksEntity = require("../../entity/SupportLinksSchema");
const { getManager } = require("typeorm");

async function addSupportLink(link, description) {
    let new_link = new supportLinksModel(link, description);
    return await getManager().getRepository(supportLinksEntity).save(new_link);
}

async function getSupportLinks(id) {
    if(id) {
        return await getManager().getRepository(supportLinksEntity).find({
            where: {
                id: id
            }
        });
    } else {
        return await getManager().getRepository(supportLinksEntity).find();
    }
}

module.exports = {
    addSupportLink,
    getSupportLinks
}