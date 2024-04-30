import express from 'express';
import fs from "fs";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());



const LeerDatos = () => {
    try
    { const dato = fs.readFileSync("./db.json");
        return JSON.parse(dato);
    } catch (error) 
    { 
        console.log(error);

    }
    
}

const EscribirDatos = (dato) => 
{
    try
    {
        fs.writeFileSync("./db.json", JSON.stringify(dato));
    } catch (error)
    {
        console.log(error);
    }

}

app.get('/',(req,res) =>{
    res.send("Bienvenido a mi primera API con Node")
})

app.get("/Libros",(req,res) => {
    const dato = LeerDatos();
    res.json(dato.Libros);
})

app.get("/Libros/:id", (req,res)=>
{
    const dato = LeerDatos();
    const id = parseInt(req.params.id);
    const libro = dato.Libros.find((libro) => libro.id == id);
    res.json(libro);
})

app.post("/Libros",(req,res) =>{
    const dato = LeerDatos();
    const body = req.body;
    const NuevoLibro = {
        id: dato.Libros.length + 1,
        ...body,
    }

    dato.Libros.push(NuevoLibro);
    EscribirDatos(dato);
    res.json(NuevoLibro);
})
app.put("/Libros/:id", (req,res) => {
    const dato = LeerDatos();
    const body = req.body;
    const id = parseInt(req.params.id);
    const indexLibro = dato.Libros.findIndex((libro) => libro.id == id);
    dato.Libros[indexLibro] = {
        ...dato.Libros[indexLibro], 
        ...body,
    };

    
    EscribirDatos(dato);
    console.log(dato.Libros[indexLibro]);
    res.json({message: "Libro actualizado exitosamente"});
})

app.delete("/Libros/:id", (req, res) => {
    const data = LeerDatos();
    const id = parseInt(req.params.id);
    const LibrosIndex = data.Libros.findIndex((book) => book.id === id);
    data.Libros.splice(LibrosIndex, 1 )
    EscribirDatos(data);
    res.json({message: "eliminado"});
   console.log(data.Libros);
  });


app.listen(3000,() => {
    console.log('Servidor a la espera de conexion');
});

