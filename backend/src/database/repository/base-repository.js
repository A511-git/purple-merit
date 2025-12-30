import { MapMongoError } from "../../backend/src/utils/map-mongo-error.js";

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(userInputs) {
        try {
            return await this.model.create(userInputs);
        } catch (err) {
            throw MapMongoError(err);
        }
    }

    async update(id, userInputs) {
        try {
            return await this.model.findByIdAndUpdate(id, userInputs);
        } catch (err) {
            throw MapMongoError(err);
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (err) {
            throw MapMongoError(err);
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (err) {
            throw MapMongoError(err);
        }
    }

    async findOne(filter) {
        try {
            return await this.model.findOne(filter);
        } catch (err) {
            throw MapMongoError(err);
        }
    }

    async find(filter) {
        try {
            return await this.model.find(filter);
        } catch (err) {
            throw MapMongoError(err);
        }
    }

    async getAll() {
        try {
            return await this.model.find();
        } catch (err) {
            throw MapMongoError(err);
        }
    }

}

export { BaseRepository };
