import { EmailModel } from "../models/email.model";

export {sendEmail}

async function sendEmail(email: Partial<EmailModel>){
     
  console.log(email);
      try {
            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'inventorywarehouse64@gmail.com',
                pass: 'Test2020*'
              }
            });
            
            var mailOptions = {
              from: 'inventorywarehouse64@gmail.com',
              to: email.emailTo,
              subject: 'Sending Email using Node.js',
              text: email.message
            };
            
            transporter.sendMail(mailOptions, function(error: any, info: any){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
        
      } catch (ex) {
            if (ex instanceof Error)
                  console.log("ERROR!");
      }

    }