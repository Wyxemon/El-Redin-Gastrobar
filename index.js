// Obtener la fecha actual
const hoy = new Date();
const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const fechaFormateada = hoy.toLocaleDateString('es-ES', opciones);

// Mostrar la fecha en el elemento con id "fecha"
document.getElementById('fecha').textContent = fechaFormateada;

const horarios = {
    viernes: { apertura: "07:00", cierre: "01:00" },
    sábado: { apertura: "09:00", cierre: "01:00" },
    domingo: { apertura: "11:00", cierre: "23:00" },
    lunes: { apertura: "07:00", cierre: "17:00" },
    martes: { apertura: "07:00", cierre: "02:00" },
    miércoles: { apertura: "07:00", cierre: "20:00" },
    jueves: { apertura: "07:00", cierre: "23:00" },
};

function estaAbierto() {
    const ahora = new Date();
    const diaSemana = ahora.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
    const horaActual = ahora.toTimeString().slice(0, 5);

    const horario = horarios[diaSemana];
    if (!horario) return false;

    const [horaApertura, minutoApertura] = horario.apertura.split(":").map(Number);
    const [horaCierre, minutoCierre] = horario.cierre.split(":").map(Number);

    const apertura = new Date(ahora);
    apertura.setHours(horaApertura, minutoApertura, 0);

    const cierre = new Date(ahora);
    cierre.setHours(horaCierre, minutoCierre, 0);

    // Handle cases where closing time is past midnight
    if (cierre < apertura) {
        cierre.setDate(cierre.getDate() + 1);
    }

    return ahora >= apertura && ahora <= cierre;
}

const statusElement = document.getElementById('status');
if (estaAbierto()) {
    statusElement.textContent = "Abierto";
    statusElement.style.color = "#6fe410";
} else {
    statusElement.textContent = "Cerrado";
    statusElement.style.color = "#f34040";
}