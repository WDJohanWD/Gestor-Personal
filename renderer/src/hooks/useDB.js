
window.electron?.ipcRenderer.invoke('add-transaccion', {
  tipo: 'Ingreso',
  categoria: 'Salario',
  monto: 1200,
  descripcion: 'Pago de abril',
  fecha: '2025-04-20',
}).then(id => {
  console.log('Transacción insertada con ID:', id);
}).catch(error => {
  console.error('Error al insertar transacción:', error);
});
