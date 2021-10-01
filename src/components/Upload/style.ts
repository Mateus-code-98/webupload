import styled, { css } from "styled-components";

interface dropContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

interface uploadMessageProps {
  type?: string;
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
}) <dropContainerProps>`
  border: 1px dashed #ddd;
  height:100px;
  display:flex;
  width:100px;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  align-items:center;
  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors: any = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5"
};

export const UploadMessage = styled.p<uploadMessageProps>`
  display: flex;
  color: ${props => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  :hover{
    opacity:0.8;
  }
`;