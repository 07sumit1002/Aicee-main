// helper/email.ts
import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  serviceId: 'service_jbq4vh1',      
  templateId: 'template_xmrxioj',    
  publicKey: 'rB3kkhRzBuHwpWVlN',    
};

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    
    emailjs.init(EMAILJS_CONFIG.publicKey);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Message sent successfully! We'll get back to you soon.",
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly.',
    };
  }
};
