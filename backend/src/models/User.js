import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const useSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    bio:{
          type: String,
          default:''
    },
    profilePic:{
          type: String,
          default:''
    },
    nativeLanguage:{
        type: String,
        default:''
    },
     learningLanguage:{
        type: String,
        default:''
    },
     location:{
        type: String,
        default:''
    },
     isOnboarded:{
        type: String,
        default:false
    },
     friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
     ],
},
{
    timestamps: true
})

const User = mongoose.model('User', useSchema);
//pre hook
useSchema.pre('save', async function (next) {
  
  if(!this.isModified(this.password)) return next()

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next()
  } catch (error) {
    console.log('Error in hashing password')
  }  
})

export default User