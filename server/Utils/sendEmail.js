const nodemailer = require('nodemailer')
const sendEmail = async(mailData)=>{
    const {subject,receiverMail} = mailData
    // console.log(process.env.ADMIN1_EMAIL,
    //     process.env.ADMIN1_PASS )
    const transporter = nodemailer.createTransport({
        host: "0.0.0.0",
        port: 1025,
        secure: false,
        // requireTLS: true,
        // auth: {
        //   user: process.env.ADMIN1_EMAIL,
        //   pass: process.env.APP_PASS,
        // },
        // tls:{
        //     rejectUnauthorized:false
        // }
    });
    console.log(receiverMail)
    var mailOptions;
    if(mailData.html){
        mailOptions = {
            from:"test@gmail.com",
            to:receiverMail,
            subject:subject,
            html:mailData.html
        }
    }else{
        mailOptions = {
            from:"test@gmail.com",
            to:receiverMail,
            subject:subject,
            text:mailData.body
        }
    }
    

    
    try{
        await transporter.sendMail(mailOptions);
        console.log('Mail sent')
    }catch(err){
        console.log(err)
    }
}
module.exports = sendEmail