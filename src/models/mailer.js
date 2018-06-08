'use strict';

const nodemailer = require('nodemailer');
const config = require('../config');

class mailer {
    /**
     * @constructor
     *
     * @param  {String} content
     */
    constructor(content, opt_settings) {
        this.content = content;

        this.transporter = nodemailer.createTransport(opt_settings || {
            service: config.get('mailer:service'),
            auth: {
                user: config.get('mailer:email'),
                pass: config.get('mailer:pass')
            }
        });

        this.options = {
            from: config.get('mail:from'),
            to: config.get('mail:to'),
            //subject: 'About your meeting today',
            //TODO: colocar a da ta de hoje se possível
            subject: 'Relatório da daily de hoje',
            //text: content || 'No body.'
            text: content || 'Sem corpo.'
        };
    }

    /**
     * send - Sends an email with pre-set settings.
     */
    send() {
        this.transporter.sendMail(this.options);
    }

    static mailify(answers, channelName){
        //TODO: passar por parâmetro está sentença
        //let mailContent = 'Hello, \nToday\'s meeting results for #'+ channelName + ' are shown below.\n';
        let mailContent = 'Olá, \nResultado da daily pelo canal #'+ channelName + ' são mostrados abaixos.\n';
        answers.forEach((answer) => {
            mailContent += "\n" + answer.participant.real_name + " responded:\n\n";
            answer.answer.forEach((entry, index) => {
                mailContent += entry.question + "\n" + entry.answer + "\n";
            });
        });

        return mailContent;
    }
}

module.exports = mailer;
