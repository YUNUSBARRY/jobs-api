import mongoose, { Schema } from "mongoose";

// 1. Define the schema
const animalSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    age: { type: Number, default: 0 },
    isPredator: { type: Boolean, default: false },
  },
  {
    // 2. Instance methods (document methods)
    methods: {
      findSimilarTypes() {
        return mongoose.model("Animal").find({ type: this.type });
      },

      isOld() {
        return this.age > 10;
      },
    },

    // 3. Static methods (model methods)
    statics: {
      findByType(type) {
        return this.find({ type });
      },

      countPredators() {
        return this.countDocuments({ isPredator: true });
      },
    },

    // 4. Query helpers
    query: {
      byType(type) {
        return this.where({ type });
      },

      predators() {
        return this.where({ isPredator: true });
      },
    },
  },
);

// 5. Create the model
const Animal = mongoose.model("Animal", animalSchema);

export default Animal;
