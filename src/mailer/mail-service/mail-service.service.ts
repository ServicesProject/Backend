import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailServiceService {
    constructor(private readonly mailerService: MailerService){}

    public sendEmailToConfirmAccounht(email:string): void {
        this.mailerService
          .sendMail({
            to: email,
            subject: 'Verificacion del email',
            template: 'mail.template.hbs', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
            context: {
              url: `https://serviceproject-33041.web.app/confirmarEmail?email=${email.toString()}`
            },
          })
          .catch((error) => {
            console.log(error);
          });
      }
}
