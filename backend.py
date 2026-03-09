# Codigo para comprobar que el archivo subido es un CSV o Excel, y para procesarlo posteriormente.

from fastapi import FastAPI, UploadFile, File, HTTPException

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    allowed_types = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Tipo de archivo no permitido")

    # aquí guardas el archivo o procesas
    content = await file.read()
    # procesar CSV o Excel...
    return {"filename": file.filename, "type": file.content_type}