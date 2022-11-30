$(document).ready(function () {
  initSurvey();
  initDatePicker();

  $.validator.addMethod(
    "emailfull",
    function (value, element) {
      return (
        this.optional(element) ||
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
      );
    },
    "Formato correo no valido"
  );

  $("#frmRegistro").validate({
    ignore: "",
    rules: initRules(),
    messages: initMessages(),
    submitHandler: function (form, event) {
      event.preventDefault();
      console.log("...enviando formulario ok");
      const data = $("#frmRegistro").serializeArray();
      console.log(data);
      Swal.fire({
        icon: "success",
        text: "Se envió con éxito la información, gracias",
        confirmButtonText: "Listo!",
        customClass: {
          confirmButton: "btn-submit btn-submit--confirm",
        },
        buttonsStyling: false,
      });
    },
    invalidHandler: function (event, validator) {
      console.log("fomulario invalido: campos requeridos");
      event.preventDefault();
    },
  });
});

const initSurvey = () => {
  $("#showOtro").hide();
  $("#comoSeEntero").change(function () {
    const MEDIO = this.value;
    if ("otros" === MEDIO) {
      $("#showOtro").show("slow");
    } else {
      $("#otros").val("");
      $("#showOtro").hide("slow");
    }
  });
};

const initDatePicker = () => {
  $("#fNacimiento").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-45:+0",
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ],
    dayNamesMin: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    firstDay: 1,
    gotoCurrent: true,
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Deciembre",
    ],
  });
};

const initRules = () => {
  const RULES = {
    nombres: {
      required: true,
    },
    edad: {
      required: true,
    },
    fNacimiento: {
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
    monto: {
      required: true,
      number: true,
    },
    comoSeEntero: {
      required: true,
    },
    otros: {
      required: {
        depends: function () {
          if ($("#comoSeEntero").val() === "otros") {
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
  const MESSAGES = {
    nombres: {
      required: "Campo requerido",
    },
    edad: {
      required: "Campo requerido",
    },
    fNacimiento: {
      required: "Campo requerido",
    },
    email: {
      required: "Campo requerido",
      email: "Formato correo invalido",
    },
    tieneCreditoAnterior: {
      required: "Campo requerido",
    },
    nivelAcademico: {
      required: "Campo requerido",
    },
    institucionEducativa: {
      required: "Campo requerido",
    },
    carrera: {
      required: "Campo requerido",
    },
    cicloAContinuar: {
      required: "Campo requerido",
    },
    monto: {
      required: "Campo requerido",
      number: "solo números",
    },
    comoSeEntero: {
      required: "Campo requerido",
    },
    otros: {
      required: "Campo requerido",
    },
    terminos: {
      required: "Requerido",
    },
  };

  return MESSAGES;
};
