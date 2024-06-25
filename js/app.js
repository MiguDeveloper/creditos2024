$(document).ready(function () {
  initWelcomeMessages();
  initAllowReject();
  initSurvey();
  initDatePicker();
  initNivelAcademico();

  $.validator.addMethod(
    'emailfull',
    function (value, element) {
      return (
        this.optional(element) ||
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
      );
    },
    'Formato correo no valido'
  );

  $('#frmRegistro').validate({
    ignore: '',
    rules: initRules(),
    messages: initMessages(),
    submitHandler: function (form, event) {
      event.preventDefault();
      var _vNumDoc = $('#dni').val();
      var _vTipoColaborador = $('#nivelAcademico').val();
      var _vNombres = $('#nombres').val();
      var _vApellidos = $('#apellidos').val();
      var _vEmail = $('#email').val();
      var _vCarrera = $('#carrera').val();
      var _vUniversidad = $('#institucionEducativa').val();
      var _vSurvey = $('#comoSeEntero').val();
      var _dFechaNacimiento = $('#fNacimiento').val();
      var _vUltimoSemestre = $('#cicloAContinuar').val();
      var _nIdeEmpresa = $('#nIdeEmpresa').val();
      var _celular = $('#celular').val();
      if (_vSurvey == 'otros') {
        _vSurvey = '[O]' + $('#otros').val();
      }

      console.log('envio');

      Swal.fire({
        icon: 'success',
        title: '¡Te registraste con éxito!',
        text: 'Dentro de las próximas 24 horas uno de nuestros asesores te contactará para brindarte toda la información que necesitas.',
        confirmButtonText: 'LISTO!',
        customClass: {
          confirmButton: 'btn-submit btn-submit--modales',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });

      //$.ajax({
      //    url: '/PreRegistro/RegisterForm',
      //    data: {
      //        vNumDoc 		:_vNumDoc,
      //        vTipoColaborador:_vTipoColaborador,
      //        vNombres 		:_vNombres,
      //        vApellidos     :_vApellidos,
      //        vEmail 			:_vEmail,
      //        vCarrera 		:_vCarrera,
      //        vUniversidad 	:_vUniversidad,
      //        vSurvey 		:_vSurvey,
      //        dFechaNacimiento:_dFechaNacimiento,
      //        bTerminos 		:true,
      //        nIdeEmpresa 	:_nIdeEmpresa,
      //        nIdeConvo       :0,
      //        vUltimoSemestre :_vUltimoSemestre,
      //        vTelefono        :_celular,
      //        hijoArray       :''
      //    },
      //    type:'POST',
      //    success: function(data){
      //        if (data.ok) {
      //            Swal.fire({
      //                icon: 'success',
      //                title: '¡Te registraste con éxito!',
      //                text: 'En un plazo de 48 horas te enviaremos un correo de confirmación con los requisitos del programa.',
      //                confirmButtonText: 'Listo!',
      //                customClass: {
      //                    confirmButton: 'btn-submit btn-submit--confirm',
      //                },
      //                buttonsStyling: false,
      //                isConfirmed: function(value){
      //                    alert('presiono' + value );
      //                }
      //            }).then((result) => {
      //                if (result.isConfirmed) {
      //                     location.reload();
      //        }
      //    });
      //        }
      //    else{
      //                        Swal.fire({
      //        icon: "error",
      //    title: "¡Algo salió mal!",
      //    text: data.message,
      //    confirmButtonText: "Ok!",
      //    customClass: {
      //        confirmButton: "btn-submit btn-submit--confirm",
      //        },
      //    buttonsStyling: false,
      //    });
      //}
      //}
      //});
    },
    invalidHandler: function (event, validator) {
      console.log('fomulario invalido: campos requeridos');
      event.preventDefault();
    },
  });

  $('.showmodalTerms').click(function (evt) {
    Swal.fire({
      title: TITULO_TERMINOS,
      html: TERMINOSCONDICIONES,
      confirmButtonText: 'ACEPTAR',
      customClass: {
        title: 'title--color-secondary',
        confirmButton: 'btn-submit btn-submit--modales',
      },
      buttonsStyling: false,
    });
  });

  $('.showModalPolitics').click(function (evt) {
    Swal.fire({
      title: TITULO_POLITICAS,
      html: POLITICASDATOS,
      confirmButtonText: 'ACEPTAR',
      customClass: {
        title: 'title--color-secondary',
        confirmButton: 'btn-submit btn-submit--modales',
      },
      buttonsStyling: false,
    });
  });
});

const initSurvey = () => {
  $('#showOtro').hide();
  $('#comoSeEntero').change(function () {
    const MEDIO = this.value;
    if ('otros' === MEDIO) {
      $('#showOtro').show('slow');
    } else {
      $('#otros').val('');
      $('#showOtro').hide('slow');
    }
  });
};
const initAllowReject = () => {
  $('#show-allow').hide();
  $('#reject').hide();
};
const initWelcomeMessages = () => {
  Swal.fire({
    title: '¡Bienvenido Estudiante!',
    icon: 'info',
    focusConfirm: false,
    text: 'Nos alegra que estes aquí. Esperamos el registro de tus datos y continues con el proceso de postulación',
    confirmButtonText: 'ACEPTAR',
    customClass: {
      title: 'title--color-secondary',
      confirmButton: 'btn-submit btn-submit--modales',
    },
    buttonsStyling: false,
  });
};
const initDatePicker = () => {
  $('#fNacimiento').datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    yearRange: '-45:+0',
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ],
    dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    firstDay: 1,
    gotoCurrent: true,
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Deciembre',
    ],
    onSelect: function () {
      let date = $(this).datepicker('getDate');
      const dateFormatISO = new Date(date).toISOString();
      const arrayDate = dateFormatISO.split('T')[0].split('-');
      const currentDate = new Date();
      let edad = currentDate.getFullYear() - +arrayDate[0];
      const month = currentDate.getMonth() + 1 - arrayDate[1];

      if (month < 0 || (month === 0 && currentDate.getDate() < arrayDate[2])) {
        --edad;
      }
      console.log(edad);

      if (edad < 18 || edad > 35) {
        $('#show-allow').hide();
        $('#reject').show('slow');
        return;
      }
      console.log('paso el IF');
      $('#reject').hide('slow');
      $('#show-allow').show('slow');
    },
  });
};

const initRules = () => {
  const RULES = {
    nombres: {
      required: true,
    },
    apellidos: {
      required: true,
    },
    dni: {
      required: true,
      number: true,
      minlength: 8,
      maxlength: 8,
    },
    fNacimiento: {
      required: true,
    },
    celular: {
      number: true,
      minlength: 9,
      required: true,
    },
    email: {
      required: true,
      emailfull: true,
    },
    tieneCreditoAnterior: {
      required: true,
    },
    nivelAcademico: {
      required: true,
    },
    institucionEducativa: {
      required: true,
    },
    carrera: {
      required: true,
    },
    cicloAContinuar: {
      required: true,
    },
    comoSeEntero: {
      required: true,
    },
    otros: {
      required: {
        depends: function () {
          if ($('#comoSeEntero').val() === 'otros') {
            return true;
          }
          return false;
        },
      },
    },
    terminos: {
      required: true,
    },
  };

  return RULES;
};

const initMessages = () => {
  const CAMPO_REQUERIDO = 'Campo requerido';
  const MESSAGES = {
    nombres: {
      required: CAMPO_REQUERIDO,
    },
    apellidos: {
      required: CAMPO_REQUERIDO,
    },
    dni: {
      required: CAMPO_REQUERIDO,
      number: 'Solo digitos númericos',
      minlength: 'Mínimo 8 digitos',
      maxlength: 'Máximo 8 digitos',
    },
    fNacimiento: {
      required: CAMPO_REQUERIDO,
    },
    celular: {
      required: CAMPO_REQUERIDO,
      number: 'Solo digitos númericos',
      minlength: 'Mínimo 9 digitos',
    },
    email: {
      required: CAMPO_REQUERIDO,
      email: 'Formato correo invalido',
    },
    tieneCreditoAnterior: {
      required: CAMPO_REQUERIDO,
    },
    nivelAcademico: {
      required: CAMPO_REQUERIDO,
    },
    institucionEducativa: {
      required: CAMPO_REQUERIDO,
    },
    carrera: {
      required: CAMPO_REQUERIDO,
    },
    cicloAContinuar: {
      required: CAMPO_REQUERIDO,
    },
    comoSeEntero: {
      required: CAMPO_REQUERIDO,
    },
    otros: {
      required: CAMPO_REQUERIDO,
    },
    terminos: {
      required: 'Requerido',
    },
  };

  return MESSAGES;
};

const initNivelAcademico = () => {
  listNivelAcademico.forEach((nivel) => {
    $('#nivelAcademico').append(
      `<option value="${nivel.value}">${nivel.value}</option>`
    );
  });
};
