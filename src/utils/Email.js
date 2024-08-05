const enviarEmail = async (code, email, nombre) => {
    try {
      const response = await fetch('https://formspree.io/f/xkgwrdbk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _cc: email, // Enviar una copia al destinatario
          message: `Hola ${nombre}, tu código de verificación es: ${code}`
        })
      });
  
      if (response.ok) {
        console.log('Correo enviado exitosamente');
        return true;
      } else {
        console.error('Error al enviar el correo', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error al enviar el correo', error);
      return false;
    }
  };
  
  export default enviarEmail;
  