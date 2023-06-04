import { jsPDF } from "jspdf";



export function pdfExports(props) {
    console.log(props)
    const doc = new jsPDF();
    let obj = {
        Title: props.title,
        body: props.content
    }
    doc.text(obj.Title, 80, 10, { align: 'left', maxWidth: 190 });
    if (obj.body.length > 3001) {
        let start = 0;
        let count = 1;
        for (let i = 3000; i <= obj.body.length;) {
            let str = "";
            if (start + 3000 > obj.body.length) {

                str = obj.body.substring(start, obj.body.length);
            }
            else {
                str = obj.body.substring(start, start + 3000);
            }
            doc.setPage(count)
            doc.text(str, 10, 20, { align: 'left', maxWidth: 190 });

            count++;
            start = i;
            i = i + i;
            if (i > obj.body.length && start < obj.body.length) {
                i = obj.body.length;
            }
            if (i <= obj.body.length) {
                doc.addPage()
            }

        }
    }
    else {
        doc.text(obj.body, 10, 20, { align: 'left', maxWidth: 190 });
    }

    doc.save("check.pdf");
    return alert("Book has been seved in your system as pdf")
}





