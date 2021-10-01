import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { fileProps } from "../../App";

import { Container, FileInfo, Preview } from "./style";

interface fileListProps {
    onDelete: Function;
    file: fileProps;
}

const FileList: React.FC<fileListProps> = ({ file, onDelete }) => (
    <Container>
        {file.preview &&
            <li >
                <FileInfo>
                    <Preview src={file.preview} />
                    <div>
                        <strong>{file.name}</strong>
                        <span>
                            {file.readableSize}{" "}
                            {!!file.url && (
                                <button onClick={() => onDelete(file.id)}>
                                    Excluir
                                </button>
                            )}
                        </span>
                    </div>
                </FileInfo>

                <div>
                    {!file.uploaded &&
                        !file.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: "#7159c1" }
                                }}
                                strokeWidth={10}
                                value={file.progress}
                            />
                        )}

                    {file.url && (
                        <a
                            href={`${process.env.REACT_APP_API}/files/${file.url}`}
                            target="_blank"
                        >
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}

                    {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                    {file.error && <MdError size={24} color="#e57878" />}
                </div>
            </li>}
    </Container>
);

export default FileList;