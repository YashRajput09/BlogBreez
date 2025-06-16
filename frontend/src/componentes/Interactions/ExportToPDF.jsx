// @ts-ignore
import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";

const ExportToPDF = ({blog, descriptionState, hide}) =>{
 const handleDownloadPDF = () =>{
    descriptionState(true);
    hide(true);
    const element = document.getElementById("pdf-content");

    const opt ={
        margin: 0.1,
        filename: `${blog.title}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
    setTimeout(()=>{
        hide(false);    
    },0)
    
 };
    return(
       <div className="">
        <button
        onClick={handleDownloadPDF}
        >
             <Download size={18} />
        </button>
       </div>
    );
};

export default ExportToPDF;