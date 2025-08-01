import mongoose from 'mongoose';
const subscriptionSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,'Subscription Name is required'],
    trim:true,
    minlength:2,
    maxlength:100,
},
price:{
    type:Number,
    required:[true,'Subscription Price is required'],
    min:[0,'Subscription Price must be greater than zero'],
   
},
currency:{
    type:String,
    required:[true,'Subscription Currency is required'],
    enum:['USD','EUR','INR'],
    default:'INR',
},
frequency:{
    type:String,
    required:[true,'Subscription Frequency is required'],
    enum:['daily','weekly','monthly','yearly'],
},
category:{
    type:String,
    enum:['sports','news','entertainment','lifestyle','technology','financial','politics','others'],
    required:true,
},
paymentMethod:{
    type:String,
    enum:['paypal','stripe','amazon','google pay','paytm','phonepay'],
    required:true,
    trim:true,
},
status:{
    type:String,
    enum:['active','cancelled','expired'],
    default:'active',
},
startDate:{
    type:Date,
    required:[true,'Subscription Start Date is required'],
    validate:{
        validator: (value)=> value <= new Date(),
        message: 'Subscription Start Date must be in the past'
    }
},
renewalDate:{
    type:Date,
    required:false,
    validate:{ 
        validator: function (value){ 
            return value > this.startDate;
    },message: 'Renewal Date must be after the start date',
}
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true,
}

},{timestamps:true});
// functin auto calculate the renewal date based on the start date 
subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate)
    {
        const renewalPeriod ={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.startDate.getDate() + renewalPeriod[this.frequency]);
    }
    if(this.renewalDate<new Date())
    {
        this.status = 'expired';
    }
    next();

});
const Subscription = mongoose.model('Subscription',subscriptionSchema);
export default Subscription;