// models/exampleModel.js
// import mongoose from 'mongoose';

// Define the schema for the example model
const exampleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Adding a unique field
        },
        description: String,
    },
    {
        timestamps: true, // Adding timestamps
    },
);

// Create the example model from the schema
const ExampleModel = mongoose.model('Example', exampleSchema);

// Export the example model
export default ExampleModel;
