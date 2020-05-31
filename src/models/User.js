const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({
    username: {
        type: String,
        require: true,
        trim: true,// es para eliminar los espacios 
        unique: true,// es apra que no se repita el nombre del usuario
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// fn para encriptar, recibe la clave y manejandola con bcrypt se encripta, el metodo hash es el que se encarga de convertir el string
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);

