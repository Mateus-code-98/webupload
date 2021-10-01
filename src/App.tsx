import React, { useCallback, useState } from 'react';
import { Upload } from './components/Upload';
import { Container, Content } from './style';
import { uniqueId } from "lodash";
import filesize from "filesize";
import api from './services/api';
import FileList from './components/FileList';

export interface fileProps {
  file: any;
  id: any;
  name: any;
  readableSize: any;
  preview: any;
  progress: any;
  uploaded: boolean;
  error: boolean;
  url: any;
}

const App: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<fileProps>({} as fileProps)
  const [link, setLink] = useState("")

  const updateFile = useCallback((id: any, data: any, oldUploadedFiles: fileProps) => {
    let newUploadFiles = oldUploadedFiles
    newUploadFiles = { ...newUploadFiles, ...data }
    setUploadedFiles(newUploadFiles)
  }, [])

  const processUpload = useCallback((uploadedFile: fileProps) => {
    const data = new FormData();
    data.append("file", uploadedFile.file, uploadedFile.name);
    api.patch("/file", data)
      .then((response: any) => {
        console.log(response)
        updateFile(uploadedFile.id, {
          uploaded: true,
          url: response.data.filename
        }, uploadedFile);
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true
        }, uploadedFile);
      });

  }, [])

  const handleUpload = useCallback((files: any) => {

    const newUploadedFiles = {
      file: files[0],
      id: uniqueId(),
      name: files[0].name,
      readableSize: filesize(files[0].size),
      preview: URL.createObjectURL(files[0]),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }

    setUploadedFiles(newUploadedFiles)

    processUpload(newUploadedFiles)

  }, [uploadedFiles])

  const gerarPdf = useCallback(async () => {
    const resu = await api.get("/pdf")
    setLink(`${process.env.REACT_APP_API}\\files\\${resu.data.filename}`)
  }, [])

  return (
    <Container >
      <Content>
        <Upload onUpload={handleUpload} file={uploadedFiles} />
        <FileList file={uploadedFiles} onDelete={() => setUploadedFiles({} as fileProps)} />
        <div onClick={gerarPdf} style={{ display: "flex", cursor: "pointer", justifyContent: "center", alignItems: "center", background: "red", color: "#FFF", padding: 10, borderRadius: 5 }}>
          Gerar PDF
        </div>
        {link !== "" &&
          <iframe src={link}>

          </iframe>
        }
      </Content>
    </Container>
  );
}

export default App;
