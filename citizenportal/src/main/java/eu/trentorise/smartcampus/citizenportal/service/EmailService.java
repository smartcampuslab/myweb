/*
 * =============================================================================
 * 
 *   Copyright (c) 2011-2012, The THYMELEAF team (http://www.thymeleaf.org)
 * 
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 * 
 *       http://www.apache.org/licenses/LICENSE-2.0
 * 
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * 
 * =============================================================================
 */
package eu.trentorise.smartcampus.citizenportal.service;

import java.util.Arrays;
import java.util.Date;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IWebContext;

import eu.trentorise.smartcampus.citizenportal.models.MailImage;

@Service
public class EmailService {

    @Autowired 
    private JavaMailSender mailSender;
    
    @Autowired 
    private TemplateEngine templateEngine;

    

    /* 
     * Send HTML mail (simple) 
     */
    public String sendSimpleMail(
            final String recipientName, final String recipientEmail, final String subject, final Locale locale) 
            throws MessagingException {
        
        // Prepare the evaluation context
        final Context ctx = new Context(locale);
        ctx.setVariable("name", recipientName);
        ctx.setVariable("subscriptionDate", new Date());
        //ctx.setVariable("hobbies", Arrays.asList("Cinema", "Sports", "Music"));
        ctx.setVariable("text", subject);
        
        // Prepare message using a Spring helper
        final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
        final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
        message.setSubject("Graduatoria Edilizia Abitativa");
        //message.setFrom("thymeleaf@example.com");
        message.setFrom("myweb.edilizia@comunitadellavallagarina.tn.it");
        message.setTo(recipientEmail);

        // Create the HTML body using Thymeleaf
        final String htmlContent = this.templateEngine.process("email-simple.html", ctx);
        message.setText(htmlContent, true /* isHtml */);
        
        // Send email
        this.mailSender.send(mimeMessage);

        return recipientName;
    }

    
    
    
    /* 
     * Send HTML mail with attachment. 
     */
    public String sendMailWithAttachment(
            final String recipientName, final String recipientEmail, 
            final String practice_id, final String position, final String score,
            final String phase, final String ef_period, final String ef_category, final String ef_tool,
            final String subject, final String attachmentFileName, 
            final byte[] attachmentBytes, final String attachmentContentType, final Locale locale) 
            throws MessagingException {
        
        // Prepare the evaluation context
        final Context ctx = new Context(locale);
        ctx.setVariable("name", recipientName);
        ctx.setVariable("practice_id", practice_id);
        ctx.setVariable("position", position);
        ctx.setVariable("score", score);
        ctx.setVariable("phase", phase);
        ctx.setVariable("ef_period", ef_period);
        ctx.setVariable("ef_category", ef_category);
        ctx.setVariable("ef_tool", ef_tool);
        ctx.setVariable("subscriptionDate", new Date());
        //ctx.setVariable("hobbies", Arrays.asList("Cinema", "Sports", "Music"));
        ctx.setVariable("text", subject);
        
        // Prepare message using a Spring helper
        final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
        final MimeMessageHelper message = 
                new MimeMessageHelper(mimeMessage, true /* multipart */, "UTF-8");
        message.setSubject("Graduatoria Edilizia Abitativa");
        //message.setFrom("thymeleaf@example.com");
        message.setFrom("myweb.edilizia@comunitadellavallagarina.tn.it");
        message.setTo(recipientEmail);

        // Create the HTML body using Thymeleaf
        final String htmlContent = this.templateEngine.process("email-withattachment.html", ctx);
        message.setText(htmlContent, true /* isHtml */);
        
        // Add the attachment
        final InputStreamSource attachmentSource = new ByteArrayResource(attachmentBytes);
        message.addAttachment(
                attachmentFileName, attachmentSource, attachmentContentType);
        
        // Send mail
        this.mailSender.send(mimeMessage);
        
        return recipientName + "OK";
    }
    
    // Send mail for ValLagarina Classification
    public String sendMailVLClassification(
    		final String period, final String mailDate, final String protocolCode, final String recipientName, final String recipientAddress, final String recipientCity, final String recipientPhone,
            final String recipientEmail, final String practice_id, final String position, final String score,
            final String determinationCode, final String determinationDate, final String alboDate, final String expirationDate,
            final String phase, final String ef_period, final String ef_category, final String ef_tool, final String classificationUrl,
            final String respName, final String subject, final Locale locale, final MailImage logoImage, final MailImage footerImage, final int type) 
            throws MessagingException {
        
        // Prepare the evaluation context
        final Context ctx = new Context(locale);
        ctx.setVariable("imagelogoMyweb", logoImage.getImageName());
        ctx.setVariable("mailDate", mailDate);
        ctx.setVariable("period", period);
        ctx.setVariable("protCode", protocolCode);
        ctx.setVariable("name", recipientName);
        ctx.setVariable("address", recipientAddress);
        ctx.setVariable("city", recipientCity);
        ctx.setVariable("phone", recipientPhone);
        ctx.setVariable("detCode", determinationCode);
        ctx.setVariable("detDate", determinationDate);
        ctx.setVariable("alboDate", alboDate);
        ctx.setVariable("expDate", expirationDate);
        ctx.setVariable("practice_id", practice_id);
        ctx.setVariable("position", position);
        ctx.setVariable("score", score);
        ctx.setVariable("phase", phase);
        ctx.setVariable("ef_period", ef_period);
        ctx.setVariable("ef_category", ef_category);
        ctx.setVariable("ef_tool", ef_tool);
        ctx.setVariable("classification_url", classificationUrl);
        ctx.setVariable("respName", respName);
        ctx.setVariable("subscriptionDate", new Date());
        //ctx.setVariable("hobbies", Arrays.asList("Cinema", "Sports", "Music"));
        ctx.setVariable("text", subject);
        ctx.setVariable("imagefooterVallag", footerImage.getImageName());
        
        // Prepare message using a Spring helper
        final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
        final MimeMessageHelper message = 
                new MimeMessageHelper(mimeMessage, true /* multipart */, "UTF-8");
        message.setSubject("Graduatoria Edilizia Abitativa");
        //message.setFrom("thymeleaf@example.com");
        message.setFrom("myweb.edilizia@comunitadellavallagarina.tn.it");
        //message.setFrom("myweb-graduatoria@smartcommunitylab.it");
        message.setTo(recipientEmail);

        // Create the HTML body using Thymeleaf
        if(type == 1){
        	final String htmlContent = this.templateEngine.process("email-vallagarina.html", ctx);
        	message.setText(htmlContent, true /* isHtml */);
        } else {
        	final String htmlContent = this.templateEngine.process("email-vallagarina-final.html", ctx);
        	message.setText(htmlContent, true /* isHtml */);
        }
        
        
        // Add the inline titles image, referenced from the HTML code as "cid:${imageResourceName}"
        final InputStreamSource imageLogo = new ByteArrayResource(logoImage.getImageByte());
        message.addInline(logoImage.getImageName(), imageLogo, logoImage.getImageType());
        
        // Add the inline footer image, referenced from the HTML code as "cid:${imageResourceName}"
        final InputStreamSource imageFooter = new ByteArrayResource(footerImage.getImageByte());
        message.addInline(footerImage.getImageName(), imageFooter, footerImage.getImageType());
        
        // Add the attachment
        //final InputStreamSource attachmentSource = new ByteArrayResource(attachmentBytes);
        //message.addAttachment(
        //        attachmentFileName, attachmentSource, attachmentContentType);
        
        // Send mail
        this.mailSender.send(mimeMessage);
        
        return recipientName + "OK";
    }

    
    
    /* 
     * Send HTML mail with inline image
     */
    public void sendMailWithInline(
            final String recipientName, final String recipientEmail, final String imageResourceName, 
            final byte[] imageBytes, final String imageContentType, final Locale locale)
            throws MessagingException {
        
        // Prepare the evaluation context
        final Context ctx = new Context(locale);
        ctx.setVariable("name", recipientName);
        ctx.setVariable("subscriptionDate", new Date());
        ctx.setVariable("hobbies", Arrays.asList("Cinema", "Sports", "Music"));
        ctx.setVariable("imageResourceName", imageResourceName); // so that we can reference it from HTML
        
        // Prepare message using a Spring helper
        final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
        final MimeMessageHelper message = 
                new MimeMessageHelper(mimeMessage, true /* multipart */, "UTF-8");
        message.setSubject("Example HTML email with inline image");
        message.setFrom("thymeleaf@example.com");
        message.setTo(recipientEmail);

        // Create the HTML body using Thymeleaf
        final String htmlContent = this.templateEngine.process("email-inlineimage.html", ctx);
        message.setText(htmlContent, true /* isHtml */);
        
        // Add the inline image, referenced from the HTML code as "cid:${imageResourceName}"
        final InputStreamSource imageSource = new ByteArrayResource(imageBytes);
        message.addInline(imageResourceName, imageSource, imageContentType);
        
        // Send mail
        this.mailSender.send(mimeMessage);

    }


}
