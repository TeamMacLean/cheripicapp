'use strict';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config.json');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const email = {};


email.sendEmail = (to, subject, text, html, cb) => {
    const transporter = nodemailer.createTransport(smtpTransport({
        host: config.email.host,
        port: config.email.port
    }));

    const mailOptions = {
        from: config.email.fromAddress, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plaintext body
        html // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, cb);
};

email.success = job => {

    const to = job.email;
    const subject = `Your CheriPic job has finished`;
    const url = `${config.url}/job/${job.id}`;
    const message = `To view the job <a href="${url}"> click here</a> or visit ${url}`;
    const html = insertIntoTemplate(subject, message);
    const text = `${subject}\n\n${message}`;

    email.sendEmail(to, subject, text, html, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log('message sent!', info);
        }
    });

};
email.fail = job => {

    const to = job.email;
    const subject = `Your CheriPic job failed`;
    const url = `${config.url}/job/${job.id}`;
    const message = `To see why it failed <a href="${url}"> click here</a> or visit ${url}`;
    const html = insertIntoTemplate(subject, message);
    const text = `${subject}\n\n${message}`;

    email.sendEmail(to, subject, text, html, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log('message sent!', info);
        }
    });

};

function insertIntoTemplate(lead, message) {

    const file = fs.readFileSync(path.join(__dirname, '../views/email_templates/basic.ejs'), 'ascii');
    return ejs.render(file, {lead, message});
}

module.exports = email;