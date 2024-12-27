const verifyCaptcha = async (captchaToken) => {
    const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
  
    try {
      const response = await axios.post(
        https://www.google.com/recaptcha/api/siteverify,
        null,
        {
          params: {
            secret: CAPTCHA_SECRET,
            response: captchaToken,
          },
        }
      );
  
      return response.data.success;
    } catch (error) {
      console.error('CAPTCHA Verification Error:', error);
      return false;
    }
  };
  
  module.exports = { verifyCaptcha };