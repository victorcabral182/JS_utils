import { saveAs } from "file-saver"  

const base64toBlob = (base64: string): Blob => {
    const byteString = atob(base64)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const int8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i)
    }
    return new Blob([int8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
  }

  const downloadExcel = ({ fileName, data }: ExcelFile): void => {
    const blob = base64toBlob(data)
    saveAs(blob, fileName)
  }
