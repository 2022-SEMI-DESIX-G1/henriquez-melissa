//Controlar evento del formulario de contacto /Footer

const formcontacto = document.querySelector("#buy");

formcontacto.addEventListener("submit", (e) => {
    e.preventDefault();

});

//Enviar email en formulario de compra by EmailJS

function sendEmail() {

    var nombre = document.getElementById('name').value;
    var correo = document.getElementById('email').value;
    const mensaje = 'Gracias por realizar su compra en AMComic++, A continuación la url para su comic:';
    const comics = 'https://drive.google.com/drive/folders/17et9YX2JErXn89DHg7HVPOvLApT95E9V?usp=sharing';

    var templateParams = {
        to_name: nombre,
        from_name: correo,
        message: mensaje,
        url: comics,
        reply_to: "EmailJS",
    };

    emailjs.init("oEWslLtUEb0am27IP");

    const serviceID = 'service_0zjc0b9';
    const templateID = 'template_ne8cbtj';

    emailjs.send(serviceID, templateID, templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            formcontacto.reset();
            localStorage.clear();
            window.location = "http://localhost:3000";

        }, function (error) {
            console.log('FAILED...', error);
        });

}