export function Home() {

    const handleInsert = async () => {
        await window.electron?.ipcRenderer.invoke('add-transaccion', {
            tipo: 'Ingreso',
            categoria: 'Prueba',
            monto: 999,
            descripcion: 'Transacción de prueba',
            fecha: new Date().toISOString().slice(0, 10),
        });

        const data = await window.electron?.ipcRenderer.invoke('get-transacciones');
        console.log(data);
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleInsert} className="bg-green-500 text-white px-4 py-2 rounded">
                Probar BD
            </button>        </div>
    )
}