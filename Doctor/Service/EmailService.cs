using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Service
{
    public class EmailService
    {
        public void Send(string to, string subject, string html)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("Администрация сайта", "doc.online.kg@gmail.com"));
            email.To.Add(new MailboxAddress("", "doc.online.kg@gmail.com"));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("doc.online.kg@gmail.com", "qwe123doc");
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
