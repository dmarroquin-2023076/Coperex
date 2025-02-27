import { Schema , model} from "mongoose";

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [5, 'Description must be at least 5 characters long'], 
            maxLength: [100, 'Description must be at most 100 characters long']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, 'Phone number must have at least 8 characters'],
            maxLength: [15, 'Phone number must not exceed 15 characters']
        },
        impactLevel: {
            type: String,
            enum: ['Grande','Mediano','Bajo'],
            required: [true, 'Impact level is required']
        },
        yearsOfExperience: {
            type: Number,
            required: [true, 'Years of experience is required'],
            min: [0, 'Years of experience cannot be negative']
        },
        businessCategory: {
            type: String,
            enum: ['Microempresa','Pequeña','Mediana','Grande'],
            required: [true, 'Business category is required']
        },
        subsidiary: {
            type: String,
            enum: ['Nacional', 'Internacional'],
            required: [true, 'Subsidiary type is required']
        },
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

//Modificar el toJSON -> toObject para excluir datos en la respuesta
companySchema.methods.toJSON = function(){
    const { __v, ...company } = this.toObject() //Sirve para convertir un documento de MongoDB a Objeto de JS
    return company
}

export default model('Company', companySchema)

