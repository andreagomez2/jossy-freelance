//pasos para consumir api desde el frontend 
//1 construir o declarar la direccion del servidor 
// el cliente o forntend debe comunicarse con el servidor o backend
// construir la conexion con el api que llamamos peticion 
// implementar la conexion 
 
export async function consumirApi(datos){
    let url="localhost:8080/registros"
    let peticion={
        method:"POST",
        body:JSON.stringify
    }//JSON
    let respuesta=await fetch(url,peticion)
}

