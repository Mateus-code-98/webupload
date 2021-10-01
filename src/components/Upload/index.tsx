import React from "react";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "./style";
import { FaUser, FaUserSlash } from 'react-icons/fa';
import { fileProps } from "../../App";

interface UploadProps {
    onUpload: any;
    file: fileProps;
}

export const Upload: React.FC<UploadProps> = ({ onUpload, file }) => {
    const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
        if (!isDragActive) {
            if (!file.preview) {
                return (
                    <UploadMessage>
                        <FaUser size={50} />
                    </UploadMessage>
                )
            }
            else {
                return (
                    <UploadMessage color="#000">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxHeight: 90, minHeight: 90, maxWidth: 90, minWidth: 90, borderRadius: "50%", overflow: "hidden" }}>
                            <img style={{ height: 90 }} src={file.preview} />
                        </div>
                    </UploadMessage>
                )
            }
        }


        if (isDragReject) {
            return (
                <UploadMessage type="error">
                    <FaUserSlash size={63} />
                </UploadMessage>
            )
        }

        return <UploadMessage type="success">Solte</UploadMessage>;
    };
    return (
        <Dropzone accept="image/png,image/jpeg" onDropAccepted={onUpload} maxFiles={1}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                </div>
            )}
        </Dropzone>
    )
}