module.exports = class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {

        const queryObj = { ...this.queryString };
        const excludedFileds = ["fields", "limit", "sort", "paginate"]
        excludedFileds.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj).replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`,
        ); 
        
        this.query = this.query.find(JSON.parse(queryStr))
        return this

    }
}